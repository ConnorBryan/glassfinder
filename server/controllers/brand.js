const { Brand } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  read
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
