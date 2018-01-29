const express = require("express");

const { BrandController } = require("./");

exports.common = api => {
  const BrandRouter = express.Router();

  BrandRouter.get("/", BrandController.read);
  BrandRouter.get("/:id", BrandController.read);

  api.use("/brands", BrandRouter);
};

exports.admin = admin => {
  const BrandAdminRouter = express.Router();

  BrandAdminRouter.get("/", BrandController.readAll);
  BrandAdminRouter.delete("/:id", BrandController.remove);

  admin.use("/brands", BrandAdminRouter);
};
