import * as config from "../../../config";
import {
  respondWith,
  requireProperties,
  error,
  success,
  userNotFound,
  userNotLinked
} from "../../../util";
import multerS3 from "../../../util/upload";
import models from "../../database/models";
import {
  genericSortedRead,
  genericPaginatedRead,
  genericReadAll
} from "../common";

const { User, Piece } = models;
const upload = multerS3(config.PIECE_BUCKET);

/**
 * @func create
 * @desc Add a new instance of Piece to the database.
 * @param {ExpressRequest} req 
 * @param {ExpressRequest} res 
 * @returns {Piece}
 */
function create(req, res) {
  return respondWith(res, async () => {
    const { userId } = req.query;
    const { name, description, maker, price, location } = req.body;

    requireProperties({ userId, name, description, maker, price, location });

    const user = await User.findById(+userId);

    switch (true) {
      case !user:
        return userNotFound(res);
      case !user.linked:
        return userNotLinked(res);
      case !user.verified:
      case user.type === config.LINK_TYPES.BRAND:
        return error(
          res,
          `A piece can only upload by a verified, linked user that is not a brand`
        );
    }

    const piece = await Piece.create({
      userId,
      image: config.PLACEHOLDER_IMAGE,
      name,
      description,
      maker,
      price,
      location
    });

    return success(
      res,
      `Successfully created Piece#${piece.id} belonging to User#${userId}`,
      { piece }
    );
  });
}

/**
 * @func read
 * @desc Provides either a single or multiple instances of Piece.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Piece | Array<Piece>}
 */
function read(req, res) {
  return genericPaginatedRead(req, res, Piece, "piece", "pieces");
}

/**
 * @func readAll
 * @desc Retrieves all instances of Piece.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Piece>}
 */
function readAll(req, res) {
  return genericReadAll(req, res, Piece, "pieces");
}

/**
 * @func readSorted
 * @desc Provides a page from a sorted collection.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Piece>}
 */
function readSorted(req, res) {
  return genericSortedRead(
    req,
    res,
    Piece,
    config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.PIECE]
  );
}

/**
 * @func update
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {object}
 */
function update(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { values } = req.body;

    requireProperties({ id, values });

    const piece = await Piece.findById(+id);

    if (!piece) return error(res, `Piece#${id} could not be found`);

    const parsedValues = JSON.parse(values);
    const newPiece = await piece.update(parsedValues);

    return success(res, `Successfully updated information for Piece#${id}`, {
      piece: newPiece
    });
  });
}

/**
 * @func remove
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @returns {object}
 */
function remove(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    await Piece.destroy({ where: { id } });

    return success(res, `Piece#${id} successfully deleted`);
  });
}

/**
 * @func uploadImage
 * @desc Replace the primary image of a Piece.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Piece | Array<Piece>}
 */
function uploadImage(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    const piece = await Piece.findById(+id);

    if (!piece) {
      return error(res, `Piece#${id} was not found`);
    }

    return upload(req, res, async err => {
      if (err) {
        return error(res, err.toString());
      }

      const { file: { key } } = req;
      const updatedPiece = await piece.update({
        image: `${config.PIECE_IMAGES_SPACES_URL}/${key}`
      });

      return success(res, `Succesfully uploaded an image for Piece#${id}`, {
        piece: updatedPiece
      });
    });
  });
}

export default {
  create,
  read,
  readAll,
  readSorted,
  update,
  remove,
  uploadImage
};
