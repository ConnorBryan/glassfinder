const express = require("express");

const { AboutController } = require("./");

exports.common = api => {
  const AboutRouter = express.Router();

  AboutRouter.get("/", AboutController.read);

  api.use("/about", AboutRouter);
};

exports.admin = admin => {
  const AboutAdminRouter = express.Router();

  AboutAdminRouter.get("/", AboutController.read);
  AboutAdminRouter.post("/", AboutController.create);
  AboutAdminRouter.post("/:id", AboutController.update);
  AboutAdminRouter.delete("/:id", AboutController.remove);

  admin.use("/about", AboutAdminRouter);
};
