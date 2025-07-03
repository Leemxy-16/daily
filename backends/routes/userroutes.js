// const router = require("express").Router
// const { getAllUsers } = require("../controllers/adminController");
// const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// const usersRouter = router()

// usersRouter.get('/', verifyToken, verifyAdmin, getAllUsers);

// module.exports = usersRouter




const router = require("express").Router;
const { getAllUsers } = require("../controllers/adminController");
const { updateUser, deleteUser, logoutUser } = require("../controllers/authController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const usersrouter = router();

// Admin route
usersrouter.get("/", verifyToken, verifyAdmin, getAllUsers);

// User routes
usersrouter.put("/update", verifyToken, updateUser);
usersrouter.delete("/delete", verifyToken, deleteUser);
usersrouter.post("/logout", verifyToken, logoutUser);

module.exports = userrouter;