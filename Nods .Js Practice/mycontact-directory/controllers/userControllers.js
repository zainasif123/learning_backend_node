const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Username, email, and password are required");
  }

  // Check if user already exists
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    message: "User registered",
    username: newUser.username,
    email: newUser.email,
    id: newUser._id,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credential");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (user && isMatch) {
    const accessToken = jwt.sign(
      { user: { id: user._id, username: user.username, email: user.email } },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );
    res.status(200).json({
      message: "Login successful",
      username: user.username,
      email: user.email,
      id: user._id,
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentia");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { id } = req.user; // Get user id from req.user set by middleware
  const user = await User.findById(id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json(user);
});

module.exports = { registerUser, loginUser, getCurrentUser };
