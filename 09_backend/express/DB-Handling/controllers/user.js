const User = require("../models/user");

// GET all users
async function handleGetAllUsers(req, res) {
  const users = await User.find({});
  return res.json(users);
}

// GET user by ID
async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json(user);
}

// CREATE new user
async function handleCreateNewUser(req, res) {

  const { firstName, lastName, email, gender, jobTitle } = req.body;


  if (!firstName || !lastName || !email || !gender || !jobTitle) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName,
    lastName,
    email,
    gender,
    jobTitle,
  });

  return res.status(201).json({
    msg: "User created successfully",
    id: result._id,
  });
}

// UPDATE user
async function handleUpdateuserById(req, res) {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedUser)
    return res.status(404).json({ error: "User not found" });

  return res.json({ status: "Updated", user: updatedUser });
}

// DELETE user
async function handleDeleteUserById(req, res) {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser)
    return res.status(404).json({ error: "User not found" });

  return res.json({ status: "Deleted successfully" });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleUpdateuserById,
  handleDeleteUserById,
};
