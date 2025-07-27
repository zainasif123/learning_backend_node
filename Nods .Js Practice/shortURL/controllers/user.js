const User = require("../models/user");
const { v4: uuid } = require("uuid"); // Import v4 and alias it as uuid
const { setUser, getUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/static/login");
}

// Log-In Handler
async function handleUserLogIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .render("logIn", { message: "Invalid email or password" });
    }

    const sessionid = uuid(); // Corrected to use uuid() for generating the session ID
    setUser(sessionid, user);
    res.cookie("uid", sessionid); // Corrected typo in "cookie"

    // After successful login, redirect to the home page
    return res.redirect("/static/enterUrl");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error during login");
  }
}

module.exports = { handleUserSignUp, handleUserLogIn };
