import express from "express";

const { AboutController } = require("./");

export const client = api => {
  const AboutRouter = express.Router();

  AboutRouter.get("/", AboutController.read);

  api.use("/about", AboutRouter);
};

export const admin = api => {
  const AboutAdminRouter = express.Router();

  AboutAdminRouter.get("/", AboutController.read);
  AboutAdminRouter.get("/:id", AboutController.read);
  AboutAdminRouter.post("/", AboutController.create);
  AboutAdminRouter.post("/:id", AboutController.update);
  AboutAdminRouter.delete("/:id", AboutController.remove);

  api.use("/about", AboutAdminRouter);
};
