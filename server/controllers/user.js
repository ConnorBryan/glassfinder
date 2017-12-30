const passport = require("passport");

const { User, Piece } = require("../models");
const { createSafePassword, confirmPassword } = require("../config/passport");
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
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      if (!id || !currentPassword || !newPassword)
        return res.status(400).json({
          success: false,
          error:
            "An id, current password and new password is required to updatePassword"
        });

      const user = await User.findById(+id);

      if (!user)
        return res
          .status(404)
          .json({ success: false, error: "User not found" });

      const actualPassword = user.password;
      const passwordsMatch = await confirmPassword(
        currentPassword,
        actualPassword
      );

      if (!passwordsMatch)
        return res
          .status(400)
          .json({ success: false, error: "Current password was incorrect" });

      user.password = await createSafePassword(newPassword);

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password successfully updated"
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  }
};
