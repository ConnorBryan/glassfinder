"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const populate = require("../seeders/populate");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};
const addModel = db => (...models) =>
  models.map(
    model =>
      (db[model] = sequelize.import(`../features/${model}/${model}.model`))
  );
const addModelsToDatabase = addModel(db);

addModelsToDatabase(
  "About",
  "Artist",
  "Brand",
  "Help",
  "LinkRequest",
  "Piece",
  "Shop",
  "Update",
  "User",
  "Verbiage"
);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// (async () => {
//   await sequelize.sync({ force: true });
//   await populate(db);
// })();

module.exports = db;
