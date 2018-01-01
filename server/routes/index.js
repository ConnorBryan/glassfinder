const {
  user: UserController,
  shop: ShopController,
  artist: ArtistController,
  brand: BrandController,
  piece: PieceController,
  contact: ContactController
} = require("../controllers");

module.exports = app => {
  app.post("/signup", UserController.signup);
  app.post("/signin", UserController.signin);

  app.get("/users/", UserController.read);
  app.get("/users/:id", UserController.read);
  app.post("/users/:id", UserController.update);
  app.get("/users/:id/pieces", UserController.getPiecesForId);
  app.post("/users/:id/update-password", UserController.updatePassword);
  app.post("/users/:id/link", UserController.link);
  app.post("/users/:id/upload-image", UserController.uploadImage);

  app.get("/shops/", ShopController.read);
  app.get("/shops/:id", ShopController.read);
  app.get("/shops/:id/pieces", ShopController.getPiecesForId);

  app.get("/artists/", ArtistController.read);
  app.get("/artists/:id", ArtistController.read);

  app.get("/brands/", BrandController.read);
  app.get("/brands/:id", BrandController.read);

  app.get("/pieces/", PieceController.read);
  app.get("/pieces/:id", PieceController.read);

  app.post("/contact", ContactController.send);
};
