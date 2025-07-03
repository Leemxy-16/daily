// const User = require("../models/User");

// // Get all users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching users" });
//   }
// };

// // Delete a user by ID
// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     await user.deleteOne();
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting user" });
//   }
// };

// module.exports = {
//     getAllUsers,
//     deleteUser
// }




const User = require("../models/User");

// Get all users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Delete a user by ID (admin-only, prevent self-deletion)
const deleteUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const requestingAdminId = req.user.id;

    if (targetUserId === requestingAdminId) {
      return res.status(403).json({ message: "Admins cannot delete themselves." });
    }

    const user = await User.findById(targetUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};