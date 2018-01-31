import express from "express";

import { UserController } from "./";

export const client = api => {
  const UserRouter = express.Router();

  api.post("/signup", UserController.signup);
  api.post("/sign-in", UserController.signin);

  UserRouter.get("/", UserController.read);
  UserRouter.get("/:id", UserController.read);
  UserRouter.post("/:id", UserController.update);
  UserRouter.get("/:id/pieces", UserController.fetchPiecesForId);
  UserRouter.post("/:id/update-password", UserController.updatePassword);
  UserRouter.post("/:id/link", UserController.link);
  UserRouter.post("/:id/upload-image", UserController.uploadImage);
  UserRouter.post("/:id/verify", UserController.verify);
  UserRouter.get("/:id/my-pieces", UserController.fetchMyPieces);

  api.use("/users", UserRouter);
};

export const admin = api => {
  const UserAdminRouter = express.Router();

  UserAdminRouter.get("/", UserController.adminRead);
  UserAdminRouter.get("/:id", UserController.adminRead);
  UserAdminRouter.post("/", UserController.adminCreate);
  UserAdminRouter.post("/:id", UserController.adminUpdate);
  UserAdminRouter.delete("/:id", UserController.adminRemove);

  api.use("/users", UserAdminRouter);
};
