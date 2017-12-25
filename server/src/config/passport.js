const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;

const config = require("../config/config.json");
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
        const newUser = await User.create({
          email: email.trim(),
          password: password.trim(),
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

        const payload = { sub: existingUser.id };
        const token = jwt.sign(payload, config.JWT_SECRET);
        const data = { email: existingUser.email };

        return done(null, token, data);
      } catch (e) {
        return done(e);
      }
    }
  )
};
