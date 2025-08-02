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
  const [rows] = await db.query("SELECT * FROM contact");
  return rows;
});

module.exports = {
  addContact,
  getContacts,
};
