const constants = require("../config/constants");
const { respondWith, requireVariables, error, success } = require("../util");
const { User, Piece } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  create,
  read,
  uploadImage
};

/* === */

function create(req, res) {
  return respondWith(res, async () => {
    const { userId } = req.query;
    const { name, description, maker, price, location } = req.body;

    requireVariables(
      ["userId", "name", "description", "maker", "price", "location"],
      [userId, name, description, maker, price, location]
    );

    const user = await User.findById(+userId);

    if (
      !user ||
      !user.verified ||
      !user.linked ||
      user.type === constants.LINK_TYPES.BRAND
    ) {
      return error(
        res,
        `A piece can only upload by a verified, linked user that is not a brand`
      );
    }

    const piece = await Piece.create({
      userId,
      name,
      description,
      maker,
      price,
      location
    });

    return success(
      res,
      `Successfully created Piece#${piece.id} belonging to User#${userId}`,
      { piece }
    );
  });
}

async function read(req, res) {
  return await genericPaginatedRead(req, res, Piece, "piece", "pieces");
}

function uploadImage(req, res) {
  return respondWith(res, async () => {
    return success(res, "Derp");
  });
}
