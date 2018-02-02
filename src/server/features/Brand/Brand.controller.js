import * as config from "../../../config";
import models from "../../database/models";
import {
  genericSortedRead,
  genericPaginatedRead,
  genericReadAll,
  genericRemove
} from "../common";

const { Brand } = models;

/**
 * @func read
 * @desc Provides either a single or multiple instances of Brand.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Brand | Array<Brand>}
 */
function read(req, res) {
  return genericPaginatedRead(req, res, Brand, "brand", "brands");
}

/**
 * @func readSorted
 * @desc Provides a page from a sorted collection.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<BRAND>}
 */
function readSorted(req, res) {
  return genericSortedRead(
    req,
    res,
    Brand,
    config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.BRAND]
  );
}

/**
 * @func readAll
 * @desc Retrieves all instances of Brand.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Brand>}
 */
function readAll(req, res) {
  return genericReadAll(req, res, Brand, "brands");
}

/**
 * @func remove
 * @desc Destroys an instance of Brand.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */
function remove(req, res) {
  return genericRemove(req, res, Brand, "brand");
}

export default {
  read,
  readAll,
  readSorted,
  remove
};
