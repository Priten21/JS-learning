const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function handleSignup(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.redirect("/login");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid credentials");

  req.session.userId = user._id; 

  return res.redirect("/");
}

function handleLogout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
};
