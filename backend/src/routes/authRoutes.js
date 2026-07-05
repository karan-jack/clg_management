// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const  authMiddleware  = require('../middleware/authMiddleware');
const  authorizeRoles  = require('../middleware/roleMiddleware');

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected routes
router.get('/me', authMiddleware, authController.me);

module.exports = router;