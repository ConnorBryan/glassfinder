const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const uuid = require("uuid/v4");

const constants = require("../config/constants");
const { transporter } = require("../util");
const { User } = require("../models");

module.exports = {
  localSignupStrategy: new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const emailExists = await checkForExistingEmail(email);

        if (emailExists)
          return done(new Error(`A user already exists with email ${email}`));

        const verificationCode = uuid();

        const newUser = await User.create({
          email: email.trim(),
          password: await createSafePassword(password),
          verificationCode,
          verified: false,
          linked: false,
          type: null
        });

        const { id } = newUser;

        const mailOptions = {
          from: constants.TRANSPORTER_EMAIL_ADDRESS,
          to: email.trim(),
          subject: "Please verify your new Glassfinder account",
          html: composeMessage(id, verificationCode)
        };

        return transporter.sendMail(
          mailOptions,
          err => (err ? done(err) : done(null, id))
        );
      } catch (e) {
        return done(e);
      }
    }
  ),
  localLoginStrategy: new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const existingUser = await User.findOne({ where: { email } });

        if (!existingUser)
          return done(new Error("Incorrect email or password"));

        if (!existingUser.verified)
          return done(
            new Error(
              "An unverified account cannot sign in. Please check your inbox for the verification code."
            )
          );

        const passwordsMatch = await confirmPassword(
          password,
          existingUser.password
        );

        if (!passwordsMatch)
          return done(new Error("Incorrect email or password"));

        const link = existingUser.linked
          ? await existingUser.fetchLink()
          : null;
        const payload = { sub: existingUser.id };
        const token = jwt.sign(payload, constants.JWT_SECRET, {
          expiresIn: constants.TOKEN_EXPIRATION
        });
        const data = {
          id: existingUser.id,
          email: existingUser.email,
          type: existingUser.type,
          linked: existingUser.linked,
          link
        };

        return done(null, token, data);
      } catch (e) {
        return done(e);
      }
    }
  ),
  createSafePassword,
  confirmPassword
};

/* === */

async function checkForExistingEmail(email) {
  return !!await User.findOne({ where: { email } });
}

async function createSafePassword(password) {
  return new Promise((resolve, reject) => {
    return bcrypt.genSalt(constants.SALT_ROUNDS, (err, salt) => {
      if (err) return reject(err);

      return bcrypt.hash(password, salt, null, (err, hash) => {
        return err ? reject(err) : resolve(hash);
      });
    });
  });
}

async function confirmPassword(incomingPassword, correctPassword) {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(incomingPassword, correctPassword, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function composeMessage(id, verificationCode) {
  return `
    <h1>Welcome to Glassfinder!</h1>
    <p>In order to ensure you are a real human being, please click the link below to verify your account.</p>
    <a href="${constants.URL}/verification/${id}/${verificationCode}">Verify my account</a>
    <p><em>If you did not sign up for a Glassfinder account, please ignore this message.</em></p>
  `;
}
