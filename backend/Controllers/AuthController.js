// 

const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', success: true });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const errorMsg = 'Auth failed: email or password is incorrect';

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login Success',
      success: true,
      token: jwtToken,
      email: user.email,
      name: user.name
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

module.exports = { signup, login };
