const express = require("express");

const LinkRequestController = require("./LinkRequest.controller");

module.exports = admin => {
  const LinkRequestRouter = express.Router();

  LinkRequestRouter.get("/", LinkRequestController.read);
  LinkRequestRouter.post("/:id/approve", LinkRequestController.approve);
  LinkRequestRouter.post("/:id/deny", LinkRequestController.deny);

  admin.use("/link-requests", LinkRequestRouter);
};
