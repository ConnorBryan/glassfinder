import * as configuration from "../../../config";
import { CRUR, respondWith, error, success } from "../../../util";
import multerS3 from "../../../util/upload";
import models from "../../database/models";

const { Image } = models;
const upload = multerS3(configuration.IMAGE_BUCKET);
const config = {
  Model: Image,
  modelName: "Image",
  collection: "images"
};

function create(req, res) {
  return respondWith(res, () => {
    return upload(req, res, async err => {
      if (err) {
        return error(res, err.toString());
      }

      const { key } = req.file;

      const image = await Image.create({
        path: `${configuration.GENERIC_IMAGES_SPACES_URL}/${key}`
      });

      return success(res, `Successfully uploaded an image`, {
        imagePath: image.path
      });
    });
  });
}

function read(req, res) {
  return CRUR.read(req, res, config);
}

function update(req, res) {
  return CRUR.update(req, res, config);
}

function remove(req, res) {
  return CRUR.remove(req, res, config);
}

export default {
  create,
  read,
  update,
  remove
};
