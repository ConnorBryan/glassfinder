const { Brand } = require("../models");
const { genericPaginatedRead, genericReadAll } = require("./common");

module.exports = {
  read,
  readAll
};

/* === */

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
