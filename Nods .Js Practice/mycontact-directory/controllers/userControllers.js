const asyncHandler = require("express-async-handler");

// Dummy user store (replace with DB in production)
const users = [];

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Username and password required");
  }
  const exists = users.find((u) => u.username === username);
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }
  users.push({ username, password });
  res.status(201).json({ message: "User registered", username });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  res.status(200).json({ message: "Login successful", username });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // For demo, just return the first user
  if (users.length === 0) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json(users[0]);
});

module.exports = { registerUser, loginUser, getCurrentUser };
