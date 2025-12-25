const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "dev_jwt_secret";

function setUser(user) {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    SECRET,
    { expiresIn: "1h" }
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { setUser, getUser };
