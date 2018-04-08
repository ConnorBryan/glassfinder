import express from "express";

import { ArtistController } from "./";

export const client = api => {
  const ArtistRouter = express.Router();

  ArtistRouter.get("/", ArtistController.readSorted);
  ArtistRouter.get("/:id", ArtistController.read);
  ArtistRouter.get("/:id/pieces", ArtistController.readPiecesSorted);
  ArtistRouter.get("/:id/all_pieces", ArtistController.getPiecesForArtist);

  api.use("/artists", ArtistRouter);
};

export const admin = api => {
  const ArtistAdminRouter = express.Router();

  ArtistAdminRouter.get("/", ArtistController.readAll);
  ArtistAdminRouter.delete("/:id", ArtistController.remove);

  api.use("/artists", ArtistAdminRouter);
};
