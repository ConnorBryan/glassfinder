import express from "express";

import { VerbiageController } from "./";

export const client = api => {
  const VerbiageRouter = express.Router();

  VerbiageRouter.get("/", VerbiageController.read);

  api.use("/verbiage", VerbiageRouter);
};

export const admin = api => {};
