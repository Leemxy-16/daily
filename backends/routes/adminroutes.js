// // routes/adminRoutes.js
// const router = require("express").Router();
// const User = require("../models/User");
// const { verifyAdmin } = require("../middleware/authMiddleware");
// const adminRouter = router


// // DELETE a user by ID
// adminRouter.delete("/user/:id", verifyAdmin, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("User deleted successfully");
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

// module.exports = {
//     adminRouter
// };



// routes/adminRoutes.js
const router = require("express").Router();
const User = require("../models/Users");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// DELETE a user by ID (except self)
router.delete("/user/:id", verifyToken, verifyAdmin, async(req, res) => {
    try {
        if (req.user.id === req.params.id) {
            return res.status(403).json({ message: "You cannot delete yourself." });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

// DELETE all users except the first one (admin)
router.delete("/users", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const users = await User.find().sort({ createdAt: 1 }); // Oldest first
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        const adminUser = users[0]; // First registered user (admin)
        const usersToDelete = users.slice(1); // All except admin

        const deletePromises = usersToDelete.map((user) =>
            User.findByIdAndDelete(user._id)
        );
        await Promise.all(deletePromises);

        res
            .status(200)
            .json({ message: `${usersToDelete.length} user(s) deleted.` });
    } catch (err) {
        res.status(500).json({ message: "Error deleting users" });
    }
});

module.exports = {
    adminrouter: router,
};