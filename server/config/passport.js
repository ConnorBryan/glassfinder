const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;

const constants = require("../config/constants");
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

        const newUser = await User.create({
          email: email.trim(),
          password: await createSafePassword(password),
          verified: false,
          verificationCode: null,
          linked: false,
          type: null
        });

        return done(null);
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
          expiresIn: 300
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
