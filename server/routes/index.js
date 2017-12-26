const {
  user: UserController,
  shop: ShopController,
  artist: ArtistController,
  brand: BrandController,
  piece: PieceController
} = require("../controllers");

module.exports = app => {
  app.post("/signup", UserController.signup);
  app.post("/signin", UserController.signin);

  app.get("/users/", UserController.read);
  app.get("/users/:id", UserController.read);

  app.get("/shops/", ShopController.read);
  app.get("/shops/:id", ShopController.read);

  app.get("/artists/", ArtistController.read);
  app.get("/artists/:id", ArtistController.read);

  app.get("/brands/", BrandController.read);
  app.get("/brands/:id", BrandController.read);

  app.get("/pieces/", PieceController.read);
  app.get("/pieces/:id", PieceController.read);
};
