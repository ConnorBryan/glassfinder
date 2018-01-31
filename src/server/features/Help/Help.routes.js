import express from "express";

import { HelpController } from "./";

export const client = api => {
  const HelpRouter = express.Router();

  HelpRouter.get("/", HelpController.read);

  api.use("/help", HelpRouter);
};

export const admin = api => {
  const HelpAdminRouter = express.Router();

  HelpAdminRouter.get("/", HelpController.read);
  HelpAdminRouter.get("/:id", HelpController.read);
  HelpAdminRouter.post("/", HelpController.create);
  HelpAdminRouter.post("/:id", HelpController.update);
  HelpAdminRouter.delete("/:id", HelpController.remove);

  api.use("/help", HelpAdminRouter);
};
