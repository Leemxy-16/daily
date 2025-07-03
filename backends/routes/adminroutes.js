const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { verifyAdmin } = require("../middleware/authMiddleware");

// DELETE a user by ID (except self)
router.delete("/user/:id", verifyAdmin, async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            return res.status(403).json({ message: "You cannot delete yourself." });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        // Consider logging error details here
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE all users except the first one (admin)
router.delete("/users", verifyAdmin, async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: 1 }); // Oldest first
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        const adminUser = users[0]; // First registered user (admin)
        const usersToDelete = users.slice(1); // All except admin

        const deleteResults = await User.deleteMany({
            _id: { $in: usersToDelete.map(u => u._id) }
        });

        res.status(200).json({ message: `${deleteResults.deletedCount} user(s) deleted.` });
    } catch (err) {
        // Consider logging error details here
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = {
    adminRouter: router,
};
