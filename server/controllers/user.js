const passport = require("passport");

const constants = require("../config/constants");
const {
  respondWith,
  requireProperties,
  userNotFound,
  error,
  success
} = require("../util");
const upload = require("../util").upload(constants.USER_BUCKET);
const { User, Shop, Artist, Brand, Piece } = require("../models");
const { createSafePassword, confirmPassword } = require("../config/passport");
const { genericPaginatedRead } = require("./common");

module.exports = {
  signup,
  signin,
  read,
  updatePassword,
  link,
  update,
  uploadImage,
  verify,
  fetchMyPieces,
  fetchPiecesForId
};

/* === */

/**
 * @func signup
 * @desc An aliased wrapper for passport's "local-signup" strategy.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @param {ExpressNext} next 
 * @returns {number} id - A unique identifier for the newly created User.
 */
function signup(req, res, next) {
  return passport.authenticate("local-signup", (err, id) => {
    return err ? error(res, err) : success(res, "Sign up successful", { id });
  })(req, res, next);
}

/**
 * @func signin
 * @desc An aliased wrapper for passport's "local-login" strategy.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @param {ExpressNext} next
 * @returns {string} token - A JWT used for accessing restricted resources.
 * @returns {object} data - Relevant User data for account management.
 */
function signin(req, res, next) {
  return passport.authenticate("local-login", (err, token, data) => {
    return err
      ? error(res, err)
      : success(res, "Sign in successful", {
          token,
          data
        });
  })(req, res, next);
}

/**
 * @func read
 * @desc Provides either a single or multiple instances of User.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {User | Array<User>}
 */
function read(req, res) {
  return genericPaginatedRead(req, res, User, "user", "users");
}

/**
 * @deprecated
 * @func fetchPiecesForId
 * @desc Retrieve all pieces related to a particular User.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Piece>}
 */
function fetchPiecesForId(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    const userId = +id;
    const pieces = await Piece.findAll({ where: { userId } });

    return success(res, `Successfully fetched pieces for User#${userId}`, {
      pieces
    });
  });
}

/**
 * @func verify
 * @desc Elevate the permissions of a new User following email confirmation.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */
function verify(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { verificationCode } = req.body;

    requireProperties({ id, verificationCode });

    const user = await User.findById(+id);

    switch (true) {
      case !user:
        return userNotFound(res);
      case user.verified:
        return error(res, `User#${id} is already verified`);
      case !user.verified && !user.verificationCode:
        return error(
          res,
          `User#${id} is not verified but no verification code is present`
        );
      case verificationCode !== user.verificationCode:
        return error(res, `The provided verification code was incorrect`);
    }

    await user.update({
      verified: true,
      verificationCode: null
    });

    return success(res, `Successfully verified User#${id}`);
  });
}

/**
 * @func link
 * @desc Updates a User in the database to become associated with another Model.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {object} data - User information with the new Model link embedded within.
 */
function link(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { type, config } = req.body;

    requireProperties({ id, type, config });

    const isValidType = constants.LINK_TYPES[type];

    if (!isValidType) return error(res, `Invalid type ${type}`);

    const user = await User.findById(+id);

    switch (true) {
      case !user:
        return userNotFound(res);
      case user.linked:
        return error(res, `User#${id} is already linked as ${user.type}`);
    }

    const parsedConfig = JSON.parse(config);
    const link = await user.linkAs(type, parsedConfig);
    const data = {
      id: user.id,
      email: user.email,
      type: user.type,
      linked: true,
      link
    };

    return success(res, `Successfully linked User#${id} as ${type}`, {
      data
    });
  });
}

/**
 * @func update
 * @desc Potentially updates all safe fields of a User's linked Model with some or all new values.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {object} link - The User's new, updated linked model.
 */
function update(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { values } = req.body;

    requireProperties({ id, values });

    const user = await User.findById(+id);

    switch (true) {
      case !user:
        return userNotFound(res);
      case !user.linked:
        return error(
          res,
          "An id and values are required to update information"
        );
    }

    const parsedValues = JSON.parse(values);
    const Model = fetchLinkedModel(user);

    await Model.update(parsedValues, {
      where: { userId: id }
    });

    const link = await Model.findOne({ where: { userId: id } });

    return success(
      res,
      `Successfully updated info for User#${id} as ${user.type}`,
      {
        link
      }
    );
  });
}

/**
 * @func updatePassword
 * @desc Adjust the "password" field of a single User.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */
function updatePassword(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    requireProperties({ id, currentPassword, newPassword });

    const user = await User.findById(+id);

    if (!user) return userNotFound(res);

    const { password: actualPassword } = user;
    const passwordsMatch = await confirmPassword(
      currentPassword,
      actualPassword
    );

    if (!passwordsMatch) return error(res, "Invalid user or password");

    await user.update({ password: await createSafePassword(newPassword) });

    return success(res, "Password successfully updated");
  });
}

/**
 * @func uploadImage
 * @desc Replace the primary image of a User's linked Model.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {object} link - The User's new, updated linked model.
 */
function uploadImage(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    const user = await User.findById(+id);

    switch (true) {
      case !user:
        return userNotFound(res);
      case !user.linked:
        return error(res, "An unlinked user cannot upload an image");
    }

    return upload(req, res, async err => {
      if (err) return error(res, err);

      const { file: { key } } = req;
      const Model = fetchLinkedModel(user);

      await Model.update(
        { image: `${constants.USER_IMAGES_SPACES_URL}/${key}` },
        { where: { userId: id } }
      );

      const link = await Model.findOne({ where: { userId: id } });

      return success(res, `Successfully updated info for User#${id}`, {
        link
      });
    });
  });
}

/**
 * @func fetchMyPieces
 * @desc Retrieve paginated Pieces associated with a given User.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {number} count - How many total Pieces are associated with the User
 * @returns {number} pages - How many total pages of Pieces there are
 * @returns {Array<Piece>}
 */
function fetchMyPieces(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { page } = req.query;

    requireProperties({ id, page });

    const coercedPage = +(page || 0);
    const limit = constants.MODEL_READ_LIMIT;
    const offset = coercedPage * limit;
    const { count, rows: pieces } = await Piece.findAndCountAll({
      where: { userId: +id },
      offset,
      limit,
      $sort: { id: 1 }
    });
    const pages = Math.ceil(count / limit);

    return success(res, `Successfully read pieces for User#${id}`, {
      count,
      pages,
      pieces
    });
  });
}

/* === */

/**
 * @func fetchLinkedModel
 * @desc Translates a User's type into a Sequelize Model to use for querying.
 * @param {string} type
 * @returns {SequelizeModel} Model
 */
function fetchLinkedModel({ type }) {
  const models = {
    [constants.LINK_TYPES.SHOP]: Shop,
    [constants.LINK_TYPES.ARTIST]: Artist,
    [constants.LINK_TYPES.BRAND]: Brand
  };
  const Model = models[type];

  if (!Model) throw Error(`Unable to get linked model with type ${type}`);

  return Model;
}
