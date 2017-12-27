const { User, Shop, Piece } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  read: async (req, res) =>
    await genericPaginatedRead(req, res, Shop, "shop", "shops"),
  getPiecesForId: async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          error:
            "An id is required as a req.params property for Shop#getPiecesforId "
        });
      }

      const shopId = +id;
      const { userId: shopsUserId } = await Shop.findById(shopId);
      const { id: userId } = await User.findOne({ where: { id: shopsUserId } });
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
