const express = require("express");

const { PieceController } = require("./");

module.exports = API => {
  const PieceRouter = express.Router();

  PieceRouter.post("/", PieceController.create);
  PieceRouter.get("/", PieceController.read);
  PieceRouter.get("/:id", PieceController.read);
  PieceRouter.post("/:id", PieceController.update);
  PieceRouter.delete("/:id", PieceController.remove);
  PieceRouter.post("/:id/upload-image", PieceController.uploadImage);

  API.use("/pieces", PieceRouter);
};
