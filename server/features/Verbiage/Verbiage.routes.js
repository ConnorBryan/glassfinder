const express = require("express");

const { VerbiageController } = require("./");

module.exports = api => {
  const VerbiageRouter = express.Router();

  VerbiageRouter.get("/", VerbiageController.read);

  api.use("/help", VerbiageRouter);
};
