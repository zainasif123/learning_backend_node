const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userControllers.js");
const validateTokenAccessHandler = require("../middleware/validateTokenAccessHandler.js");
const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/me", validateTokenAccessHandler, getCurrentUser);

module.exports = UserRouter;
