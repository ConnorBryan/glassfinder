import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

import * as config from "../../config";
import database from "./";
import populate from "./populate";

const basename = path.basename(__dirname);
const env = config.ENVIRONMENT;
const databaseConfig = database[env];
const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig
);
const db = {};
const addModel = db => (...models) =>
  models.map(
    model =>
      (db[model] = sequelize.import(`../features/${model}/${model}.model`))
  );
const addModelsToDatabase = addModel(db);

addModelsToDatabase(...config.MODEL_LIST);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(async () => {
  await sequelize.sync({ force: true });
  console.log("!!!");
  populate(db);
})();

export default db;
