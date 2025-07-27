// Correcting the middleware name and ensuring user is fetched correctly
const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies.uid;

  if (!userUid) {
    return res.redirect("/static/login"); // Ensure the redirect is to the correct login path
  }

  // Assuming getUser is a synchronous function here (i.e., using a Map)
  const user = getUser(userUid);

  if (!user) {
    return res.redirect("/static/login"); // Redirect to login if user is not found
  }

  // Attach user information to the request object for further use
  req.user = user;

  // Proceed to the next middleware or route handler
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
};
