import express from "express";

import { LinkRequestController } from "./";

export const admin = api => {
  const LinkRequestAdminRouter = express.Router();

  LinkRequestAdminRouter.get("/", LinkRequestController.read);
  LinkRequestAdminRouter.post("/:id/approve", LinkRequestController.approve);
  LinkRequestAdminRouter.post("/:id/deny", LinkRequestController.deny);

  api.use("/link-requests", LinkRequestAdminRouter);
};
