const db = require("../config/sql");
const asyncHandler = require("express-async-handler");

// Insert a new contact
const addContact = asyncHandler(async ({ name, email, phone }) => {
  const query = "INSERT INTO contact (name, email, phone) VALUES (?, ?, ?)";
  const [result] = await db.query(query, [name, email, phone]);
  return result;
});

// Get all contacts
const getContacts = asyncHandler(async () => {
  const [rows] = await db.query(
    "SELECT * FROM contact ORDER BY idcontact DESC"
  );
  return rows;
});

//update contact
const updateContact = asyncHandler(async (id, { name, email, phone }) => {
  const query =
    "UPDATE contact SET name = ?, email = ?, phone = ? WHERE idcontact = ?";
  const [result] = await db.query(query, [name, email, phone, id]);
  return result;
});

//delete contact

const deleteContact = asyncHandler(async (id) => {
  const query = "DELETE FROM contact WHERE idcontact = ?";
  const [result] = await db.query(query, [id]);
  return result;
});

module.exports = {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
};
