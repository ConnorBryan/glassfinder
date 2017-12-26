const { Piece } = require("../models");

module.exports = {
  read: async (req, res) => {
    try {
      const pieces = await Piece.all();

      res.json({
        success: true,
        pieces
      });
    } catch (e) {
      console.error(e);

      res.json({
        success: false,
        error: e.toString()
      });
    }
  }
};
