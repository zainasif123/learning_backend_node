const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: [true, "Please add a user name"],
    },
    email: {
      type: String,
      required: [true, "please add an email address"],
      unique: [true, "email address already taken"],
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
