const express = require("express");

const { addUserRoutes, addUserAdminRoutes } = require("../features/User");

const { addShopRoutes, addShopAdminRoutes } = require("../features/Shop");
const { addArtistRoutes, addArtistAdminRoutes } = require("../features/Artist");
const { addBrandRoutes, addBrandAdminRoutes } = require("../features/Brand");
const { addPieceRoutes, addPieceAdminRoutes } = require("../features/Piece");

const { addContactRoutes } = require("../features/Contact");
const {
  addVerbiageRoutes,
  addVerbiageAdminRoutes
} = require("../features/Verbiage");
const { addLinkRequestAdminRoutes } = require("../features/LinkRequest");

const { addAboutRoutes, addAboutAdminRoutes } = require("../features/About");
const { addHelpRoutes, addHelpAdminRoutes } = require("../features/Help");
const { addUpdateRoutes, addUpdateAdminRoutes } = require("../features/Update");

module.exports = app => {
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

  api.use("/admin", admin);
  app.use("/api", api);
};
