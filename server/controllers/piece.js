const constants = require("../config/constants");
const {
  respondWith,
  requireProperties,
  error,
  success,
  userNotFound,
  userNotLinked
} = require("../util");
const upload = require("../util").upload(constants.PIECE_BUCKET);
const { User, Piece } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  create,
  read,
  update,
  uploadImage
};

/* === */

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
      case user.type === constants.LINK_TYPES.BRAND:
        return error(
          res,
          `A piece can only upload by a verified, linked user that is not a brand`
        );
    }

    const piece = await Piece.create({
      userId,
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
        image: `${constants.PIECE_IMAGES_SPACES_URL}/${key}`
      });

      return success(res, `Succesfully uploaded an image for Piece#${id}`, {
        piece: updatedPiece
      });
    });
  });
}
