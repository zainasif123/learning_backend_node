const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateTokenAccessHandler = require("../middleware/validateTokenAccessHandler.js");
router.use(validateTokenAccessHandler);
router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getContactById);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);
module.exports = router;
