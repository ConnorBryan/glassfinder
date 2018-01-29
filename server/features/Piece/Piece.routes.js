const express = require("express");

const { PieceController } = require("./");

exports.common = api => {
  const PieceRouter = express.Router();

  PieceRouter.post("/", PieceController.create);
  PieceRouter.get("/", PieceController.read);
  PieceRouter.get("/:id", PieceController.read);
  PieceRouter.post("/:id", PieceController.update);
  PieceRouter.delete("/:id", PieceController.remove);
  PieceRouter.post("/:id/upload-image", PieceController.uploadImage);

  api.use("/pieces", PieceRouter);
};

exports.admin = admin => {
  const PieceAdminRouter = express.Router();

  PieceAdminRouter.get("/", PieceController.readAll);
  PieceAdminRouter.delete("/:id", PieceController.remove);

  admin.use("/pieces", PieceAdminRouter);
};
