const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const authRouter = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
authRouter.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Log in a user
 * @access  Public
 */
authRouter.post('/login', loginUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
authRouter.get('/me', verifyToken, getMe);

module.exports = authRouter;
