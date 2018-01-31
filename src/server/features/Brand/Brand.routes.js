import express from "express";

import { BrandController } from "./";

export const client = api => {
  const BrandRouter = express.Router();

  BrandRouter.get("/", BrandController.read);
  BrandRouter.get("/:id", BrandController.read);

  api.use("/brands", BrandRouter);
};

export const admin = api => {
  const BrandAdminRouter = express.Router();

  BrandAdminRouter.get("/", BrandController.readAll);
  BrandAdminRouter.delete("/:id", BrandController.remove);

  api.use("/brands", BrandAdminRouter);
};
