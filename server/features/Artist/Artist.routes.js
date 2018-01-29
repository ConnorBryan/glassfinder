const express = require("express");

const { ArtistController } = require("./");

module.exports = API => {
  const ArtistRouter = express.Router();

  ArtistRouter.get("/", ArtistController.read);
  ArtistRouter.get("/:id", ArtistController.read);

  API.use("/artists", ArtistRouter);
};
