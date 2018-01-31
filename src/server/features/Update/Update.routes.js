import express from "express";

import { UpdateController } from "./";

export const client = api => {
  const UpdateRouter = express.Router();

  UpdateRouter.get("/", UpdateController.read);
  UpdateRouter.get("/:id", UpdateController.read);

  api.use("/updates", UpdateRouter);
};

export const admin = api => {
  const UpdateAdminRouter = express.Router();

  UpdateAdminRouter.get("/", UpdateController.read);
  UpdateAdminRouter.get("/:id", UpdateController.read);
  UpdateAdminRouter.post("/", UpdateController.create);
  UpdateAdminRouter.post("/:id", UpdateController.update);
  UpdateAdminRouter.delete("/:id", UpdateController.remove);

  api.use("/updates", UpdateAdminRouter);
};
