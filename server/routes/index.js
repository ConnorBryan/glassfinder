const {
  user: UserController,
  shop: ShopController,
  artist: ArtistController,
  brand: BrandController,
  piece: PieceController,
  contact: ContactController
} = require("../controllers");

module.exports = app => {
  app.post("/api/signup", UserController.signup);
  app.post("/api/signin", UserController.signin);

  app.get("/api/users/", UserController.read);
  app.get("/api/users/:id", UserController.read);
  app.post("/api/users/:id", UserController.update);
  app.get("/api/users/:id/pieces", UserController.getPiecesForId);
  app.post("/api/users/:id/update-password", UserController.updatePassword);
  app.post("/api/users/:id/link", UserController.link);
  app.post("/api/users/:id/upload-image", UserController.uploadImage);

  app.get("/api/shops/", ShopController.read);
  app.get("/api/shops/:id", ShopController.read);
  app.get("/api/shops/:id/pieces", ShopController.getPiecesForId);

  app.get("/api/artists/", ArtistController.read);
  app.get("/api/artists/:id", ArtistController.read);

  app.get("/api/brands/", BrandController.read);
  app.get("/api/brands/:id", BrandController.read);

  app.get("/api/pieces/", PieceController.read);
  app.get("/api/pieces/:id", PieceController.read);

  app.post("/api/contact", ContactController.send);
};
