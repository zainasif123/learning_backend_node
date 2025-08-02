const express = require("express");
const sqlUserRouter = express.Router();
const {
  createContact,
  getAllContacts,
  updateContactById,
  deleteContactById,
} = require("../controllers/mysqlContacyControllers.js");

sqlUserRouter.route("/").post(createContact).get(getAllContacts);
sqlUserRouter.route("/:id").put(updateContactById).delete(deleteContactById);

module.exports = sqlUserRouter;
