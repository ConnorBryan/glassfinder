import express from "express";

import { ShopToBrandController } from "./";

export const client = api => {
  const ShopToBrandRouter = express.Router();

  ShopToBrandRouter.get(
    "/:id/brands",
    ShopToBrandController.getAssociatedBrands
  );

  ShopToBrandRouter.post(
    "/:id/brands/:brandId",
    ShopToBrandController.associateShopWithBrand
  );

  api.use("/shops", ShopToBrandRouter);
};

export const admin = api => {
  const ShopToBrandAdminRouter = express.Router();

  api.use("/shops", ShopToBrandAdminRouter);
};
