import express from "express";

const { ImageController } = require("./");

export const client = api => {
  const ImageRouter = express.Router();

  ImageRouter.post("/", ImageController.create);

  api.use("/images", ImageRouter);
};

export const admin = api => {
  const ImageAdminRouter = express.Router();

  ImageAdminRouter.get("/", ImageController.read);
  ImageAdminRouter.get("/:id", ImageController.read);
  ImageAdminRouter.post("/", ImageController.create);
  ImageAdminRouter.post("/:id", ImageController.update);
  ImageAdminRouter.delete("/:id", ImageController.remove);

  api.use("/images", ImageAdminRouter);
};
