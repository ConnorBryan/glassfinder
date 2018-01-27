const { Artist } = require("../models");
const { genericPaginatedRead, genericReadAll } = require("./common");

module.exports = {
  read,
  readAll
};

/* === */

/**
 * @func read
 * @desc Provides either a single or multiple instances of Artist.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Artist | Array<Artist>}
 */
function read(req, res) {
  return genericPaginatedRead(req, res, Artist, "artist", "artists");
}

/**
 * @func readAll
 * @desc Retrieves all instances of Artist.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Artist>}
 */
function readAll(req, res) {
  return genericReadAll(req, res, Artist, "artists");
}
