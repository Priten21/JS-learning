const bcrypt = require("bcrypt");
const User = require("../models/user");
const { setUser } = require("../utils/jwt");

async function handleSignup(req, res) {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  res.redirect("/auth/login");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.redirect("/auth/login");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.redirect("/auth/login");

  const token = setUser(user);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.redirect("/");
}

function handleLogout(req, res) {
  res.clearCookie("token");
  res.redirect("/auth/login");
}

module.exports = { handleSignup, handleLogin, handleLogout };
