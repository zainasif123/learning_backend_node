const asyncHandler = require("express-async-handler");
const ContactsModel = require("../models/contactModels.js");
const getAllContacts = async (req, res) => {
  //   res.send("Get All Contacts");
  const contacts = await ContactsModel.find();
  res.status(200).json(contacts);
};

const getContactById = asyncHandler(async (req, res) => {
  const contact = await ContactsModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  //   res.send("Get All Contacts");
  res.status(200).json([contact]);
});

const createContact = asyncHandler(async (req, res) => {
  const { NAME, EMAIL, PHONE } = req.body;
  if (!NAME || !EMAIL || !PHONE) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  try {
    const contact = await ContactsModel.create({
      name: NAME,
      email: EMAIL,
      phone: PHONE,
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { NAME, EMAIL, PHONE } = req.body;
  const contact = await ContactsModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await ContactsModel.findByIdAndUpdate(
    req.params.id,
    {
      name: NAME,
      email: EMAIL,
      phone: PHONE,
    },
    { new: true }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactsModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await ContactsModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `User Contact Deleted Successfully: ${contact.name} with ID: ${req.params.id}`,
  });
});

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
