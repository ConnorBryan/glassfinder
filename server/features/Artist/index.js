exports.ArtistController = require("./Artist.controller");
exports.ArtistModel = require("./Artist.model");
exports.addArtistRoutes = require("./Artist.routes").common;
exports.addArtistAdminRoutes = require("./Artist.routes").admin;
