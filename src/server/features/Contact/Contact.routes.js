import express from "express";

import { ContactController } from "./";

export const client = api => {
  const ContactRouter = express.Router();

  ContactRouter.post("/", ContactController.send);

  api.use("/contact", ContactRouter);
};
