import jwt from "jsonwebtoken";

import * as config from "../../config";
import models from "../models";

const { User } = models;

export default function authCheck(req, res, next) {
  if (!req.headers.authorization) return res.status(401).end();

  const token = req.headers.authorization;

  return jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
    try {
      if (err) return res.status(401).end();

      const id = decoded.sub;
      const user = await User.findById(id);

      if (!user) return res.status(401).end();

      return next();
    } catch (e) {
      return res.status(401).end();
    }
  });
}
