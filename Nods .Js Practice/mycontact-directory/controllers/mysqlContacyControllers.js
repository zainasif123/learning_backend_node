const asyncHandler = require("express-async-handler");
const { addContact, getContacts } = require("../models/mysqlContacyModel");

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  try {
    const contact = await addContact({
      name: name,
      email: email,
      phone: phone,
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = { createContact };
