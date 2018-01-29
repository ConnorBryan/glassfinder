const express = require("express");

const { HelpController } = require("./");

module.exports = API => {
  const HelpRouter = express.Router();

  HelpRouter.post("/", HelpController.create);
  HelpRouter.get("/", HelpController.read);
  HelpRouter.post("/:id", HelpController.update);
  HelpRouter.delete("/:id", HelpController.remove);

  API.use("/help", HelpRouter);
};
