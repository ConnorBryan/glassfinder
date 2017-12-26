/**
 * @overview
 * This file handles AWS S3 upload functionality.
 */
const fs                      = require('fs');
const AWS                     = require('aws-sdk');
const multer                  = require('multer');
const multerS3                = require('multer-s3');
const { BUCKET_NAME, REGION } = require('../../constants.json');

const bucket = BUCKET_NAME;
const region = REGION;
const credentials = new AWS.SharedIniFileCredentials();
const s3 = new AWS.S3({ region, credentials });

module.exports = multer({
  storage: multerS3({
    s3,
    bucket,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, Date.now().toString()),
  }),
});
