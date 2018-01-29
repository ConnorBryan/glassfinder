exports.UserController = require("./User.controller");
exports.UserModel = require("./User.model");
exports.addUserRoutes = require("./User.routes").common;
exports.addUserAdminRoutes = require("./User.routes").admin;
