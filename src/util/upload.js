import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import uuid from "uuid/v4";

import * as config from "../config";

export default function upload(bucket) {
  const spacesEndpoint = new AWS.Endpoint(config.SPACES_ENDPOINT);
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
}
