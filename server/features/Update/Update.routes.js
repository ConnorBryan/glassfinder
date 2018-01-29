const express = require("express");

const { UpdateController } = require("./");

exports.common = api => {
  const UpdateRouter = express.Router();

  UpdateRouter.get("/", UpdateController.read);
  UpdateRouter.get("/:id", UpdateController.read);

  api.use("/updates", UpdateRouter);
};

exports.admin = admin => {
  const UpdateAdminRouter = express.Router();

  UpdateAdminRouter.get("/", UpdateController.read);
  UpdateAdminRouter.get("/:id", UpdateController.read);
  UpdateAdminRouter.post("/", UpdateController.create);
  UpdateAdminRouter.post("/:id", UpdateController.update);
  UpdateAdminRouter.delete("/:id", UpdateController.remove);

  admin.use("/updates", UpdateAdminRouter);
};
