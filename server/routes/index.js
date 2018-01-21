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
  app.post("/api/sign-in", UserController.signin);

  app.get("/api/users/", UserController.read);
  app.get("/api/users/:id", UserController.read);
  app.post("/api/users/:id", UserController.update);
  app.get("/api/users/:id/pieces", UserController.fetchPiecesForId);
  app.post("/api/users/:id/update-password", UserController.updatePassword);
  app.post("/api/users/:id/link", UserController.link);
  app.post("/api/users/:id/upload-image", UserController.uploadImage);
  app.post("/api/users/:id/verify", UserController.verify);
  app.get("/api/users/:id/my-pieces", UserController.fetchMyPieces);

  app.get("/api/shops/", ShopController.read);
  app.get("/api/shops/:id", ShopController.read);
  app.get("/api/shops/:id/pieces", ShopController.fetchPiecesForId);
  app.get("/api/mapmarkers", ShopController.fetchMapMarkers);

  app.get("/api/artists/", ArtistController.read);
  app.get("/api/artists/:id", ArtistController.read);

  app.get("/api/brands", BrandController.read);
  app.get("/api/brands/:id", BrandController.read);

  app.post("/api/pieces", PieceController.create);
  app.get("/api/pieces/", PieceController.read);
  app.get("/api/pieces/:id", PieceController.read);
  app.post("/api/pieces/:id", PieceController.update);
  app.delete("/api/pieces/:id", PieceController.remove);
  app.post("/api/pieces/:id/upload-image", PieceController.uploadImage);

  app.post("/api/contact", ContactController.send);
};
