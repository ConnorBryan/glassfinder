const express = require("express");

const { LinkRequestController } = require("./");

exports.admin = admin => {
  const LinkRequestAdminRouter = express.Router();

  LinkRequestAdminRouter.get("/", LinkRequestController.read);
  LinkRequestAdminRouter.post("/:id/approve", LinkRequestController.approve);
  LinkRequestAdminRouter.post("/:id/deny", LinkRequestController.deny);

  admin.use("/link-requests", LinkRequestAdminRouter);
};
