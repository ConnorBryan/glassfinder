const passport = require("passport");

const { User, Piece } = require("../models");
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
    await genericPaginatedRead(req, res, User, "user", "users"),
  getPiecesForId: async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          error:
            "An id is required as a req.params property for User#getPiecesforId "
        });
      }

      const userId = +id;
      const pieces = await Piece.findAll({ where: { userId } });

      return res.status(200).json({
        success: true,
        pieces
      });
    } catch (e) {
      console.error(e);

      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  }
};
