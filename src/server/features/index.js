import express from "express";

import { addUserRoutes, addUserAdminRoutes } from "./User";
import { addShopRoutes, addShopAdminRoutes } from "./Shop";
import { addArtistRoutes, addArtistAdminRoutes } from "./Artist";
import { addBrandRoutes, addBrandAdminRoutes } from "./Brand";
import { addPieceRoutes, addPieceAdminRoutes } from "./Piece";
import { addContactRoutes } from "./Contact";
import { addVerbiageRoutes, addVerbiageAdminRoutes } from "./Verbiage";
import { addLinkRequestAdminRoutes } from "./LinkRequest";
import { addAboutRoutes, addAboutAdminRoutes } from "./About";
import { addHelpRoutes, addHelpAdminRoutes } from "./Help";
import { addUpdateRoutes, addUpdateAdminRoutes } from "./Update";
import { addImageRoutes, addImageAdminRoutes } from "./Image";
import { addShopToBrandRoutes, addShopToBrandAdminRoutes } from "./ShopToBrand";

export default function addFeatures(app) {
  const api = express.Router();

  addUserRoutes(api);

  addShopRoutes(api);
  addArtistRoutes(api);
  addBrandRoutes(api);
  addPieceRoutes(api);

  addContactRoutes(api);
  addVerbiageRoutes(api);

  addAboutRoutes(api);
  addHelpRoutes(api);
  addUpdateRoutes(api);
  addImageRoutes(api);

  addShopToBrandRoutes(api);

  const admin = express.Router();

  addUserAdminRoutes(admin);

  addShopAdminRoutes(admin);
  addArtistAdminRoutes(admin);
  addBrandAdminRoutes(admin);
  addPieceAdminRoutes(admin);

  addVerbiageAdminRoutes(admin);

  addAboutAdminRoutes(admin);
  addHelpAdminRoutes(admin);
  addUpdateAdminRoutes(admin);

  addLinkRequestAdminRoutes(admin);
  addImageAdminRoutes(admin);

  addShopToBrandAdminRoutes(admin);

  api.use("/admin", admin);
  app.use("/api", api);
}
