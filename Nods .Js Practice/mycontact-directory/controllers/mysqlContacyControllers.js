const asyncHandler = require("express-async-handler");
const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../models/mysqlContacyModel");

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

const getAllContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const updateContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  try {
    const updatedContact = await updateContact(id, { name, email, phone });
    if (updatedContact.affectedRows === 0) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.status(200).json({ message: "Contact updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const deleteContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteContact(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.status(200).json({ message: "Contact deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createContact,
  getAllContacts,
  updateContactById,
  deleteContactById,
};
