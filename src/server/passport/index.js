import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import localPassport from "passport-local";
import uuid from "uuid/v4";

import * as config from "../../config";
import transporter, { glassfinder, slightlyBiggerText } from "../transporter";
import models from "../database/models";

const { User } = models;
const { Strategy: LocalStrategy } = localPassport;

export const localSignupStrategy = new LocalStrategy(
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

      return transporter.sendMail(
        verificationMailOptions(email, id, verificationCode),
        err => (err ? done(err) : done(null, id))
      );
    } catch (e) {
      return done(e);
    }
  }
);

export const localLoginStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const existingUser = await User.findOne({ where: { email } });

      if (!existingUser) return done(new Error("Incorrect email or password"));

      if (!existingUser.verified)
        return done(new Error(config.UNVERIFIED_USER_SIGN_IN_ATTEMPT_ERROR));

      const passwordsMatch = await confirmPassword(
        password,
        existingUser.password
      );

      if (!passwordsMatch)
        return done(new Error("Incorrect email or password"));

      const link = existingUser.linked ? await existingUser.fetchLink() : null;
      const payload = { sub: existingUser.id };
      const token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.TOKEN_EXPIRATION
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
);

export async function checkForExistingEmail(email) {
  return !!await User.findOne({ where: { email } });
}

export async function createSafePassword(password) {
  return new Promise((resolve, reject) => {
    return bcrypt.genSalt(config.SALT_ROUNDS, (err, salt) => {
      if (err) return reject(err);

      return bcrypt.hash(password, salt, null, (err, hash) => {
        return err ? reject(err) : resolve(hash);
      });
    });
  });
}

export async function confirmPassword(incomingPassword, correctPassword) {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(incomingPassword, correctPassword, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export const verificationMailOptions = (email, id, verificationCode) => ({
  from: config.TRANSPORTER_EMAIL_ADDRESS,
  to: email.trim(),
  subject: "Please verify your new Glassfinder account",
  html: composeMessage(id, verificationCode)
});

export function composeMessage(id, verificationCode) {
  return `
    ${glassfinder}
    <p ${slightlyBiggerText}>Welcome to Glassfinder!</p>
    <p ${slightlyBiggerText}>In order to ensure you are a real human being, please click the link below to verify your account.</p>
    <p ${slightlyBiggerText}><a href="${config.URL}/verification/${id}/${verificationCode}">Verify my account</a></p>
    <p ${slightlyBiggerText}><em>If you did not sign up for a Glassfinder account, please ignore this message.</em></p>
  `;
}
