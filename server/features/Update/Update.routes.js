const express = require("express");

const { UpdateController } = require("./");

module.exports = API => {
  const UpdateRouter = express.Router();

  UpdateRouter.post("/", UpdateController.create);
  UpdateRouter.get("/", UpdateController.read);
  UpdateRouter.get("/:id", UpdateController.read);
  UpdateRouter.post("/:id", UpdateController.update);
  UpdateRouter.delete("/:id", UpdateController.remove);

  API.use("/updates", UpdateRouter);
};
