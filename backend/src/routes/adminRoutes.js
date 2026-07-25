const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.use(authMiddleware); // Ensure the user is authenticated
router.use(authorizeRoles('admin')); // Ensure the user has the 'admin' role

// Admin routes
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/students', adminController.getAllStudents);
router.get('/professors', adminController.getAllProfessors);
router.get('/admins', adminController.getAdminUsers);
module.exports = router;