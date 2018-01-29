const express = require("express");

const { HelpController } = require("./");

exports.common = api => {
  const HelpRouter = express.Router();

  HelpRouter.get("/", HelpController.read);

  api.use("/help", HelpRouter);
};

exports.admin = admin => {
  const HelpAdminRouter = express.Router();

  HelpAdminRouter.get("/", HelpController.read);
  HelpAdminRouter.post("/", HelpController.create);
  HelpAdminRouter.post("/:id", HelpController.update);
  HelpAdminRouter.delete("/:id", HelpController.remove);

  admin.use("/help", HelpAdminRouter);
};
