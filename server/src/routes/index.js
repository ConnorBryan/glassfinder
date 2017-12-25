const { user: UserController } = require("../controllers");
const { User } = require("../models");
const authCheckMiddleware = require("../middlewares/auth-check");

module.exports = app => {
  app.post("/signup", UserController.signup);
  app.post("/signin", UserController.signin);
  app.get("/api/test", (req, res) => res.json({ success: true }));
};
