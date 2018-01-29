const express = require("express");

const { BrandController } = require("./");

module.exports = API => {
  const BrandRouter = express.Router();

  BrandRouter.get("/", BrandController.read);
  BrandRouter.get("/:id", BrandController.read);

  API.use("/brands", BrandRouter);
};
