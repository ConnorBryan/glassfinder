const { user: UserController } = require("../controllers");
const { User } = require("../models");

module.exports = app => {
  app.get("/", UserController.test);
};
