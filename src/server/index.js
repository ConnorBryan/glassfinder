/**
 * G L A S S F I N D E R
 *    By Connor Bryan
 */
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import jwt from "jsonwebtoken";
import http from "http";

import * as config from "../config";
import { localSignupStrategy, localLoginStrategy } from "./passport";
import addFeatures from "./features";

const app = express();
const port = config.API_PORT;

/**
 * A P P L I C A T I O N
 *    S E T U P
 */
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");

  next();
});

/**
 * F E A T U R E
 *    S E T U P
 */
addFeatures(app);

/**
 * C A T C H - A L L
 */
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  })
);

/**
 * R E A D Y
 *    T O
 *      G O
 */
app.set("port", port);
http.createServer(app).listen(port);
