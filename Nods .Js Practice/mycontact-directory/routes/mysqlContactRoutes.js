const express = require("express");
const sqlUserRouter = express.Router();
const { createContact } = require("../controllers/mysqlContacyControllers.js");

sqlUserRouter.route("/").post(createContact);

module.exports = sqlUserRouter;
