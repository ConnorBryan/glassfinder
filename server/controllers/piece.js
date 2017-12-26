const { Piece } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  read: async (req, res) =>
    await genericPaginatedRead(req, res, Piece, "piece", "pieces")
};
