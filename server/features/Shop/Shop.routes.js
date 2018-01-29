const express = require("express");

const { ShopController } = require("./");

exports.common = api => {
  const ShopRouter = express.Router();

  ShopRouter.get("/", ShopController.read);
  ShopRouter.get("/:id", ShopController.read);
  ShopRouter.get("/:id/pieces", ShopController.fetchPiecesForId);
  ShopRouter.get("/mapmarkers", ShopController.fetchMapMarkers);

  api.use("/shops", ShopRouter);
};

exports.admin = admin => {
  const ShopAdminRouter = express.Router();

  ShopAdminRouter.get("/", ShopController.readAll);
  ShopAdminRouter.delete("/:id", ShopController.remove);

  admin.use("/shops", ShopAdminRouter);
};
