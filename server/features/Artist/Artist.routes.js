const express = require("express");

const { ArtistController } = require("./");

exports.common = api => {
  const ArtistRouter = express.Router();

  ArtistRouter.get("/", ArtistController.read);
  ArtistRouter.get("/:id", ArtistController.read);

  api.use("/artists", ArtistRouter);
};

exports.admin = admin => {
  const ArtistAdminRouter = express.Router();

  ArtistAdminRouter.get("/", ArtistController.readAll);
  ArtistAdminRouter.delete("/:id", ArtistController.remove);

  admin.use("/artists", ArtistAdminRouter);
};
