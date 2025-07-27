const mongoose = require('mongoose');

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
  }, {
    timestamps: true,
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports = User;