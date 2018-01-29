const express = require("express");

const { VerbiageController } = require("./");

exports.common = api => {
  const VerbiageRouter = express.Router();

  VerbiageRouter.get("/", VerbiageController.read);

  api.use("/verbiage", VerbiageRouter);
};

exports.admin = admin => {};
