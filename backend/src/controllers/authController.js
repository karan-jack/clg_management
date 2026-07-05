// src/controllers/authController.js
const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    if (!result.success) {
      return res.status(401).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const me = async (req, res) => {
  // req.user is set by authMiddleware
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
 
  const { User } = require('../models');
  try {
    const user = await User.findOne({
      where: { id: req.user.userId },
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error('Me error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
  me
};