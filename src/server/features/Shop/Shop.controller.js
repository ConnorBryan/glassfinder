import { respondWith, requireProperties, success } from "../../../util";
import models from "../../models";
import { genericPaginatedRead, genericReadAll, genericRemove } from "../common";

const { Shop, User, Piece } = models;

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
 * @func readAll
 * @desc Retrieves all instances of Shop.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Shop>}
 */
function readAll(req, res) {
  return genericReadAll(req, res, Shop, "shops");
}

/**
 * @func remove
 * @desc Destroys an instance of Shop.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */
function remove(req, res) {
  return genericRemove(req, res, Shop, "shop");
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

export default {
  read,
  readAll,
  remove,
  fetchPiecesForId,
  fetchMapMarkers
};
