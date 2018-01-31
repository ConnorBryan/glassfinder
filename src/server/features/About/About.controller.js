import { CRUR } from "../../../util";
import models from "../../models";

const { About } = models;
const config = {
  Model: About,
  modelName: "About",
  collection: "about"
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
