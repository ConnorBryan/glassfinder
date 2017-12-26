const passport = require("passport");

const { User } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  signup: async (req, res, next) => {
    return passport.authenticate("local-signup", err => {
      if (err) return res.json({ success: false, error: err.toString() });

      return res.status(200).json({
        success: true,
        message: "Sign up successful."
      });
    })(req, res, next);
  },
  signin: async (req, res, next) => {
    return passport.authenticate("local-login", (err, token, data) => {
      if (err) return res.json({ success: false, error: err.toString() });

      return res.status(200).json({
        success: true,
        message: "Sign in successful",
        token,
        data
      });
    })(req, res, next);
  },
  read: async (req, res) =>
    await genericPaginatedRead(req, res, User, "user", "users")
};
