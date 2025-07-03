const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper: Generate JWT Token
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment variables');
  }
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    // TODO: Add email & password validation (format, strength)

    const user = await User.create({ username, email, password });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password, identifier } = req.body;

  if ((!email && !identifier) || !password) {
    return res.status(400).json({ success: false, message: 'Email/username and password are required.' });
  }

  try {
    const searchIdentifier = identifier || email;
    const user = await User.findOne({
      $or: [{ email: searchIdentifier }, { username: searchIdentifier }],
    });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email/username or password.' });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/update
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    if (req.body.username) user.username = req.body.username;
    // Optionally: update email, password if provided (with validation)
    await user.save();

    res.json({
      success: true,
      message: 'Profile updated.',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    await user.deleteOne();
    res.json({ success: true, message: 'User account deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
exports.logoutUser = (req, res) => {
  // If using cookies:
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully.' });
};
