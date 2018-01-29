const express = require("express");

const { ContactController } = require("./");

exports.common = api => {
  const ContactRouter = express.Router();

  ContactRouter.post("/", ContactController.send);

  api.use("/contact", ContactRouter);
};
