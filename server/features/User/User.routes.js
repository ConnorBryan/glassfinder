const express = require("express");

const UserController = require("./User.controller");

exports.common = api => {
  const UserRouter = express.Router();

  api.post("/signup", UserController.signup);
  api.post("/sign-in", UserController.signin);

  UserRouter.get("/", UserController.read);
  UserRouter.get("/:id", UserController.read);
  UserRouter.post("/:id", UserController.update);
  UserRouter.get("/:id/pieces", UserController.fetchPiecesForId);
  UserRouter.post("/:id/update-password", UserController.updatePassword);
  UserRouter.post("/:id/link", UserController.link);
  UserRouter.post("/:id/upload-image", UserController.uploadImage);
  UserRouter.post("/:id/verify", UserController.verify);
  UserRouter.get("/:id/my-pieces", UserController.fetchMyPieces);

  api.use("/users", UserRouter);
};

exports.admin = admin => {};
