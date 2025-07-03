const express = require("express");
const { getAllUsers } = require("../controllers/adminController");
const { updateUser, deleteUser, logoutUser } = require("../controllers/authController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin route
router.get("/", verifyToken, verifyAdmin, getAllUsers);

// User routes
router.put("/update", verifyToken, updateUser);
router.delete("/delete", verifyToken, deleteUser);
router.post("/logout", verifyToken, logoutUser);

module.exports = router;
