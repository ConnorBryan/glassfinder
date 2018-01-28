const {
  user: UserController,
  shop: ShopController,
  artist: ArtistController,
  brand: BrandController,
  piece: PieceController,
  contact: ContactController,
  verbiage: VerbiageController,
  about: AboutController,
  help: HelpController,
  update: UpdateController
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

  app.get("/api/verbiage", VerbiageController.read);

  app.post("/api/about", AboutController.create);
  app.get("/api/about", AboutController.read);
  app.post("/api/about/:id", AboutController.update);
  app.delete("/api/about/:id", AboutController.remove);

  app.post("/api/help", HelpController.create);
  app.get("/api/help", HelpController.read);
  app.post("/api/help/:id", HelpController.update);
  app.delete("/api/help/:id", HelpController.remove);

  app.post("/api/updates", UpdateController.create);
  app.get("/api/updates", UpdateController.read);
  app.post("/api/updates/:id", UpdateController.update);
  app.delete("/api/updates/:id", UpdateController.remove);

  /* === */

  app.get("/api/admin/shops", ShopController.readAll);
  app.delete("/api/admin/shops/:id", ShopController.remove);

  app.get("/api/admin/artists", ArtistController.readAll);
  app.delete("/api/admin/artists/:id", ArtistController.remove);

  app.get("/api/admin/brands", BrandController.readAll);
  app.delete("/api/admin/brands/:id", BrandController.remove);

  app.get("/api/admin/pieces", PieceController.readAll);
  app.delete("/api/admin/pieces/:id", PieceController.remove);

  app.get("/api/admin/link-requests", UserController.readLinkRequests);
  app.post("/api/admin/link-requests/:id/approve", UserController.approveLink);
  app.post("/api/admin/link-requests/:id/deny", UserController.denyLink);
};
