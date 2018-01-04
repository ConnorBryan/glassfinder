const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid/v4");

const constants = require("../config/constants");

module.exports = bucket => {
  const spacesEndpoint = new AWS.Endpoint(constants.SPACES_ENDPOINT);
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint
  });

  const upload = multer({
    storage: multerS3({
      s3,
      bucket,
      acl: "public-read",
      key: (req, file, cb) => cb(null, `${uuid()}-${file.originalname}`)
    })
  }).single("image");

  return upload;
};
