const { respondWith, requireProperties, success } = require("../util");
const { User, Shop, Piece } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  read,
  fetchPiecesForId,
  fetchMapMarkers
};

/* === */

/**
 * @func read
 * @desc Provides either a single or multiple instances of Shop.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Shop | Array<Shop>}
 */
function read(req, res) {
  return genericPaginatedRead(req, res, Shop, "shop", "shops");
}

/**
 * @func fetchPiecesForId
 * @desc Retrieves all pieces related to a Shop.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Piece>}
 */
function fetchPiecesForId(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    const shopId = +id;
    const { userId: shopsUserId } = await Shop.findById(shopId);
    const { id: userId } = await User.findOne({ where: { id: shopsUserId } });
    const pieces = await Piece.findAll({ where: { userId } });

    return success(res, `Successfully fetched pieces for User#${id}`, {
      pieces
    });
  });
}

/**
 * @func fetchMapMarkers
 * @desc Retrieves objects containing information relevant to Google Maps.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res
 * @returns {Array<object>}
 */
function fetchMapMarkers(req, res) {
  return respondWith(res, async () => {
    const markers = await Shop.findAll({
      attributes: ["lat", "lng", "id"]
    });

    return success(res, `Successfully fetched mapmarkers`, {
      markers
    });
  });
}
