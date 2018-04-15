import * as config from "../../../config";
import { respondWith, requireProperties, success } from "../../../util";
import models from "../../database/models";
import {
  genericSortedRead,
  genericPaginatedRead,
  genericReadAll,
  genericRemove
} from "../common";

const { Shop, User, Piece, ShopToBrand } = models;

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
 * @func readSorted
 * @desc Provides a page from a sorted collection.
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @returns {Array<Shop>}
 */
function readSorted(req, res) {
  return genericSortedRead(
    req,
    res,
    Shop,
    config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.SHOP]
  );
}

/**
 * @func readPiecesSorted
 * @desc Provides a page from a sorted collection.
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @returns {Array<Piece>}
 */
async function readPiecesSorted(req, res) {
  const { id } = req.params;

  requireProperties({ id });

  const { userId } = await Shop.findById(+id);

  return genericSortedRead(
    req,
    res,
    Piece,
    config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.PIECE],
    userId
  );
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
    }).map(item => item.dataValues);
    const shopToBrands = await ShopToBrand.findAll().map(
      item => item.dataValues
    );

    markers.forEach(marker => {
      marker.brands = [];

      shopToBrands.forEach(shopToBrand => {
        if (shopToBrand.shopId === marker.id) {
          marker.brands.push(shopToBrand.brandId);
        }
      });
    });

    return success(res, `Successfully fetched mapmarkers`, {
      markers
    });
  });
}

export default {
  read,
  readAll,
  readSorted,
  readPiecesSorted,
  remove,
  fetchPiecesForId,
  fetchMapMarkers
};
