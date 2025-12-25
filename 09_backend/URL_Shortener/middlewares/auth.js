const { getUser } = require("../utils/jwt");
const User = require("../models/user");

async function requireLogin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/auth/login");

  const decoded = getUser(token);
  if (!decoded) return res.redirect("/auth/login");

  const user = await User.findById(decoded.userId);
  if (!user) return res.redirect("/auth/login");

  req.user = user;
  next();
}

module.exports = { requireLogin };
