const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getMe } = require('../controllers/authController');
const authrouter = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

// current user info
authrouter.get('/me', verifyToken, getMe);

authrouter.post('/register', registerUser);
authrouter.post('/login', loginUser);

module.exports = authrouter;

