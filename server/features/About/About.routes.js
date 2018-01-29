const express = require("express");

const { AboutController } = require("./");

module.exports = API => {
  const AboutRouter = express.Router();

  AboutRouter.post("/", AboutController.create);
  AboutRouter.get("/", AboutController.read);
  AboutRouter.post("/:id", AboutController.update);
  AboutRouter.delete("/:id", AboutController.remove);

  API.use("/about", AboutRouter);
};
