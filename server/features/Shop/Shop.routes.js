const express = require("express");

const { ShopController } = require("./");

module.exports = API => {
  const ShopRouter = express.Router();

  ShopRouter.get("/", ShopController.read);
  ShopRouter.get("/:id", ShopController.read);
  ShopRouter.get("/:id/pieces", ShopController.fetchPiecesForId);
  ShopRouter.get("/mapmarkers", ShopController.fetchMapMarkers);

  API.use("/shops", ShopRouter);
};
