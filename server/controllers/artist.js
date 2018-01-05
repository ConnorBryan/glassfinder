const { Artist } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  read
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
