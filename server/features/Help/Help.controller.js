const { Help } = require("../../models");
const CRUR = require("../../util/crur");

module.exports = {
  create,
  read,
  update,
  remove
};

/* === */

const config = {
  Model: Help,
  modelName: "Help",
  collection: "help"
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
