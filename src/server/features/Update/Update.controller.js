import { CRUR } from "../../../util";
import models from "../../models";

const { Update } = models;
const config = {
  Model: Update,
  modelName: "Update",
  collection: "update"
};

function create(req, res) {
  return CRUR.create(req, res, config);
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
