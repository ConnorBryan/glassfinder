const express = require("express");

const { addUserRoutes } = require("../features/User");
const { addShopRoutes } = require("../features/Shop");
const { addAboutRoutes } = require("../features/About");
const { addArtistRoutes } = require("../features/Artist");
const { addBrandRoutes } = require("../features/Brand");
const { addContactRoutes } = require("../features/Contact");
const { addHelpRoutes } = require("../features/Help");
const { addPieceRoutes } = require("../features/Piece");
const { addUpdateRoutes } = require("../features/Update");
const { addVerbiageRoutes } = require("../features/Verbiage");
const { addLinkRequestRoutes } = require("../features/LinkRequest");
const addAdminRoutes = require("./admin");

module.exports = app => {
  const api = express.Router();

  addUserRoutes(api);
  addShopRoutes(api);
  addAboutRoutes(api);
  addArtistRoutes(api);
  addBrandRoutes(api);
  addContactRoutes(api);
  addHelpRoutes(api);
  addUpdateRoutes(api);
  addVerbiageRoutes(api);

  const admin = express.Router();

  addLinkRequestRoutes(admin);
  addAdminRoutes(admin);

  api.use("/admin", admin);
  app.use("/api", api);
};
