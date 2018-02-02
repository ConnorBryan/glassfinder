import * as config from "../../../config";
import models from "../../database/models";
import {
  genericSortedRead,
  genericPaginatedRead,
  genericReadAll,
  genericRemove
} from "../common";

const { Artist } = models;

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
 * @func readSorted
 * @desc Provides a page from a sorted collection.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Artist>}
 */
function readSorted(req, res) {
  return genericSortedRead(
    req,
    res,
    Artist,
    config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.ARTIST]
  );
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

export default {
  read,
  readAll,
  readSorted,
  remove
};
