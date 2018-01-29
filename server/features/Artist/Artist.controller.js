const { Artist } = require("../../models");
const {
  genericPaginatedRead,
  genericReadAll,
  genericRemove
} = require("../common");

module.exports = {
  read,
  readAll,
  remove
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

/**
 * @func remove
 * @desc Destroys an instance of Artist.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */
function remove(req, res) {
  return genericRemove(req, res, Artist, "artist");
}
