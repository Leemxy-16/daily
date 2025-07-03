const User = require("../models/User");

/**
 * Get all users (excluding passwords)
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

/**
 * Delete a user by ID (admin-only, prevent self-deletion)
 */
const deleteUser = async (req, res) => {
  const targetUserId = req.params.id;
  const requestingAdminId = req.user?.id;

  if (!targetUserId) {
    return res.status(400).json({ message: "User ID parameter is required." });
  }

  if (!requestingAdminId) {
    return res.status(401).json({ message: "Unauthorized: Missing admin identification." });
  }

  if (targetUserId === requestingAdminId) {
    return res.status(403).json({ message: "Admins cannot delete themselves." });
  }

  try {
    const user = await User.findById(targetUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.deleteOne();
    res.status(200).json({ message: `User ${user.username || user._id} deleted successfully.` });
  } catch (err) {
    console.error(`Error deleting user ${targetUserId}:`, err);
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
