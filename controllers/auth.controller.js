const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// NON RENDER CONTROLLER
const generateRefreshToken = async (user) => {
  // Generate a refresh token with an expiration time of 30 days (in seconds)
  const token = jwt.sign({ userId: user.id }, 'refreshTokenSecret', {
    expiresIn: '30d',
  });
  return token;
};

const generateAccessToken = async (user) => {
  // Generate a access token with an expiration time of 1 h (in seconds)
  const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
    expiresIn: '1h',
  });
  return token;
};

// API CONTROLLER
const apiRegisterUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (user) {
      return res.status(400).json({ message: 'User already registered' });
    } else {
      // Create a new user

      const user = await User.create({
        username,
        password: hashedPassword,
        email,
      });

      return res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const apiLoginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate a JWT token
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Refresh Token Endpoint
const apiRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, 'refreshTokenSecret');

    // Check if the token has expired
    if (Date.now() > decoded.exp * 1000) {
      return res.status(401).json({ error: 'Refresh token has expired' });
    }
    // Check if the provided refresh token exists in the database
    const user = await User.findOne({ where: { refreshToken } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const apiRequestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a JWT token
    const reset_token = await generateAccessToken(user);
    user.reset_token = reset_token;
    user.request_change_password = 1;
    await user.save();

    res.status(200).json({ message: 'Reset password link sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

const apiResetPassword = async (req, res) => {
  try {
    const { reset_token, password, password_2 } = req.body;

    // Verify the refresh token
    const decoded = jwt.verify(reset_token, 'refreshTokenSecret');

    // Check if the token has expired
    if (Date.now() > decoded.exp * 1000) {
      return res.status(401).json({ error: 'Refresh token has expired' });
    }

    // Find the user by username
    const user = await User.findOne({ where: { reset_token } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (password != password_2) {
      return res.status(400).json({ error: 'Two password not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password_2, 10);
    user.hashedPassword = hashedPassword;
    user.request_change_password = 0;
    user.reset_token = '';
    await user.save();

    res.status(200).json({ message: 'Reset password sucessfull.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

exports.authController = {
  generateRefreshToken,
  generateAccessToken,
};

exports.apiAuthController = {
  apiRegisterUser,
  apiLoginUser,
  apiRefreshToken,
  apiRequestResetPassword,
  apiResetPassword,
};
