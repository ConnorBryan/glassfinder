const express = require("express");

const { addAboutRoutes, addAboutAdminRoutes } = require("../features/About");
const { addHelpRoutes, addHelpAdminRoutes } = require("../features/Help");
const { addUpdateRoutes, addUpdateAdminRoutes } = require("../features/Update");

const { addUserRoutes } = require("../features/User");
const { addShopRoutes } = require("../features/Shop");
const { addArtistRoutes } = require("../features/Artist");
const { addBrandRoutes } = require("../features/Brand");
const { addContactRoutes } = require("../features/Contact");
const { addPieceRoutes } = require("../features/Piece");
const { addVerbiageRoutes } = require("../features/Verbiage");
const { addLinkRequestRoutes } = require("../features/LinkRequest");
const addAdminRoutes = require("./admin");

module.exports = app => {
  const api = express.Router();

  addAboutRoutes(api);
  addHelpRoutes(api);
  addUpdateRoutes(api);

  addUserRoutes(api);
  addShopRoutes(api);
  addArtistRoutes(api);
  addBrandRoutes(api);
  addContactRoutes(api);
  addVerbiageRoutes(api);

  const admin = express.Router();

  addLinkRequestRoutes(admin);

  addAboutAdminRoutes(admin);
  addHelpAdminRoutes(admin);
  addUpdateAdminRoutes(admin);

  addAdminRoutes(admin);

  api.use("/admin", admin);
  app.use("/api", api);
};
