const { ShopController } = require("./Shop");
const { ArtistController } = require("./Artist");
const { BrandController } = require("./Brand");
const { PieceController } = require("./Piece");
const { UpdateController } = require("./Update");

module.exports = admin => {
  admin.get("/shops", ShopController.readAll);
  admin.delete("/shops/:id", ShopController.remove);

  admin.get("/artists", ArtistController.readAll);
  admin.delete("/artists/:id", ArtistController.remove);

  admin.get("/brands", BrandController.readAll);
  admin.delete("/brands/:id", BrandController.remove);

  admin.get("/pieces", PieceController.readAll);
  admin.delete("/pieces/:id", PieceController.remove);

  admin.post("/updates", UpdateController.create);
  admin.get("/updates", UpdateController.read);
  admin.get("/updates/:id", UpdateController.read);
  admin.post("/updates/:id", UpdateController.update);
  admin.delete("/updates/:id", UpdateController.remove);
};
