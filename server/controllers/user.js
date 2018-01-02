const passport = require("passport");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid/v4");

const { User, Shop, Artist, Brand, Piece } = require("../models");
const constants = require("../config/constants");
const { createSafePassword, confirmPassword } = require("../config/passport");
const { genericPaginatedRead } = require("./common");

const spacesEndpoint = new aws.Endpoint(constants.SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: constants.BUCKET,
    acl: "public-read",
    key: (req, file, cb) => cb(null, `${uuid()}-${file.originalname}`)
  })
}).single("image");

const userNotFoundResponse = res =>
  res.status(404).json({ success: false, error: "User not found" });

module.exports = {
  signup: async (req, res, next) => {
    return passport.authenticate("local-signup", (err, id) => {
      if (err) return res.json({ success: false, error: err.toString() });

      return res.status(200).json({
        success: true,
        message: "Sign up successful.",
        id
      });
    })(req, res, next);
  },
  signin: async (req, res, next) => {
    return passport.authenticate("local-login", (err, token, data) => {
      if (err) return res.json({ success: false, error: err.toString() });

      return res.status(200).json({
        success: true,
        message: "Sign in successful",
        token,
        data
      });
    })(req, res, next);
  },
  read: async (req, res) =>
    await genericPaginatedRead(req, res, User, "user", "users"),
  getPiecesForId: async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          error:
            "An id is required as a req.params property for User#getPiecesforId "
        });
      }

      const userId = +id;
      const pieces = await Piece.findAll({ where: { userId } });

      return res.status(200).json({
        success: true,
        pieces
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      if (!id || !currentPassword || !newPassword)
        return res.status(400).json({
          success: false,
          error:
            "An id, current password and new password is required to updatePassword"
        });

      const user = await User.findById(+id);

      if (!user) return userNotFoundResponse(res);

      const actualPassword = user.password;
      const passwordsMatch = await confirmPassword(
        currentPassword,
        actualPassword
      );

      if (!passwordsMatch)
        return res
          .status(400)
          .json({ success: false, error: "Current password was incorrect" });

      user.password = await createSafePassword(newPassword);

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password successfully updated"
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  },
  link: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, config } = req.body;
      const isValidType = constants.LINK_TYPES[type];

      if (!id || !isValidType || !config)
        return res.status(400).json({
          success: false,
          error: "An id, valid type and config are required to link"
        });

      const parsedConfig = JSON.parse(config);
      const user = await User.findById(+id);

      if (!user) return userNotFoundResponse(res);

      const link = await user.linkAs(type, parsedConfig);

      if (!link)
        return res.status(400).json({
          success: false,
          error: "An error occurred while linking"
        });

      const data = {
        id: user.id,
        email: user.email,
        type: user.type,
        linked: true,
        link
      };

      return res.status(200).json({
        success: true,
        message: `Successfully linked user ${id} as ${type}`,
        data
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { values } = req.body;

      if (!id || !values)
        return res.status(400).json({
          success: false,
          error: "An id and values are required to update information"
        });

      const parsedValues = JSON.parse(values);
      const user = await User.findById(+id);

      if (!user) return userNotFoundResponse(res);

      if (!user.linked)
        return res.status(400).json({
          success: false,
          error: "An unlinked user cannot be updated"
        });

      const { type } = user;
      const models = {
        [constants.LINK_TYPES.SHOP]: Shop,
        [constants.LINK_TYPES.ARTIST]: Artist,
        [constants.LINK_TYPES.BRAND]: Brand
      };
      const Model = models[type];
      const originalModel = await Model.findOne({ where: { userId: id } });

      if (!originalModel)
        return res.status(400).json({
          success: false,
          error: "User was linked but no link equivalent was found"
        });

      const updatedModel = await originalModel.update(parsedValues);

      return res.status(200).json({
        success: true,
        message: `Successfully updated info for user ${id} as ${type}`,
        link: updatedModel
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  },
  uploadImage: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(400).json({
          success: false,
          error: "An id is required to upload an image"
        });

      const user = await User.findById(+id);

      if (!user) return userNotFoundResponse(res);

      if (!user.linked)
        return res.status(400).json({
          success: false,
          error: "An unlinked user cannot upload an image"
        });

      const { type } = user;
      const models = {
        [constants.LINK_TYPES.SHOP]: Shop,
        [constants.LINK_TYPES.ARTIST]: Artist,
        [constants.LINK_TYPES.BRAND]: Brand
      };
      const Model = models[type];
      const originalModel = await Model.findOne({ where: { userId: id } });

      return upload(req, res, async err => {
        if (err)
          return res.status(400).json({
            success: false,
            error: err.toString()
          });

        const { key } = req.file;

        const updatedModel = await originalModel.update({
          image: `${constants.SPACES_URL}/${key}`
        });

        return res.status(200).json({
          success: true,
          message: `Successfully updated info for user ${id}`,
          link: updatedModel
        });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  },
  verify: async (req, res) => {
    try {
      const { id } = req.params;
      const { verificationCode } = req.body;

      if (!id || !verificationCode)
        return res.status(400).json({
          success: false,
          error: "An id and a verification code are required to verify a user"
        });

      const user = await User.findById(+id);

      if (!user) return userNotFoundResponse(res);

      if (user.verified)
        return res.status(400).json({
          success: false,
          error: `User ${id} is already verified`
        });

      if (!user.verified && !user.verificationCode)
        return res.status(400).json({
          success: false,
          error: `User ${id} is not verified but no verification code is present`
        });

      if (verificationCode !== user.verificationCode)
        return res.status(400).json({
          success: false,
          error: "The provided verification code was incorrent"
        });

      await user.update({
        verified: true,
        verificationCode: null
      });

      return res.status(200).json({
        success: true,
        message: `Succesfully verified user ${id}`
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  }
};
