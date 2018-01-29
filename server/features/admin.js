const { ShopController } = require("./Shop");
const { ArtistController } = require("./Artist");
const { BrandController } = require("./Brand");
const { PieceController } = require("./Piece");
const { AboutController } = require("./About");
const { HelpController } = require("./Help");

module.exports = admin => {
  admin.get("/shops", ShopController.readAll);
  admin.delete("/shops/:id", ShopController.remove);

  admin.get("/artists", ArtistController.readAll);
  admin.delete("/artists/:id", ArtistController.remove);

  admin.get("/brands", BrandController.readAll);
  admin.delete("/brands/:id", BrandController.remove);

  admin.get("/pieces", PieceController.readAll);
  admin.delete("/pieces/:id", PieceController.remove);
};
