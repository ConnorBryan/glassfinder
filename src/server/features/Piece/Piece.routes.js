import express from "express";

import { PieceController } from "./";

export const client = api => {
  const PieceRouter = express.Router();

  PieceRouter.post("/", PieceController.create);
  PieceRouter.get("/", PieceController.readSorted);
  PieceRouter.get("/:id", PieceController.read);
  PieceRouter.post("/:id", PieceController.update);
  PieceRouter.delete("/:id", PieceController.remove);
  PieceRouter.post("/:id/upload-image", PieceController.uploadImage);

  api.use("/pieces", PieceRouter);
};

export const admin = api => {
  const PieceAdminRouter = express.Router();

  PieceAdminRouter.get("/", PieceController.readAll);
  PieceAdminRouter.delete("/:id", PieceController.remove);

  api.use("/pieces", PieceAdminRouter);
};
