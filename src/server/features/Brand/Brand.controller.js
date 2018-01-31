import models from "../../models";
import { genericPaginatedRead, genericReadAll, genericRemove } from "../common";

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
  remove
};
