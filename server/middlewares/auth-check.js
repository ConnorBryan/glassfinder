const jwt = require("jsonwebtoken");

const constants = require("../config/constants.json");
const { User } = require("../models");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end();

  const token = req.headers.authorization;

  return jwt.verify(token, constants.JWT_SECRET, async (err, decoded) => {
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
};
