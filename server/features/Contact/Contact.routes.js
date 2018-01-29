const express = require("express");

const { ContactController } = require("./");

module.exports = API => {
  const ContactRouter = express.Router();

  ContactRouter.post("/", ContactController.send);

  API.use("/contact", ContactRouter);
};
