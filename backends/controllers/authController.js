// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // Generate JWT Token including isAdmin
// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       username: user.username,
//       isAdmin: user.isAdmin, 
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: '7d' }
//   );
// };

// // @desc    Register new user
// // @route   POST /api/auth/register
// // @access  Public
// exports.registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({ username, email, password });
//     const token = generateToken(user); 

//     res.status(201).json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     console.dir(user, {depth: null})
//     const token = generateToken(user); 

//     res.json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token including isAdmin
const generateToken = (user) => {
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
// @access  Public
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

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
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const identifier = req.body.identifier || email;
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      username: user.username,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching user info' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.username = req.body.username || user.username;
    await user.save();

    res.json({
      success: true,
      message: 'Profile updated',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/delete
// @access  Private
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    await user.deleteOne();
    res.json({ success: true, message: 'User account deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
exports.logoutUser = (req, res) => {
  res.clearCookie('token'); // Optional — if using cookies
  res.json({ success: true, message: 'Logged out successfully' });
};
