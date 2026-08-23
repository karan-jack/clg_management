const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.use(authMiddleware); // Ensure the user is authenticated
router.use(authorizeRoles('admin')); // Ensure the user has the 'admin' role

// Admin Dashboard
router.get('/dashboard', adminController.getDashboard);
router.get('/analytics', adminController.getAnalytics);

// Students
router.get('/students', adminController.studentController.getAll);
router.get('/students/:id', adminController.studentController.getById);
router.post('/students', adminController.studentController.create);
router.put('/students/:id', adminController.studentController.update);
router.delete('/students/:id', adminController.studentController.delete);

// Professors
router.get('/professors', adminController.professorController.getAll);
router.get('/professors/:id', adminController.professorController.getById);
router.post('/professors', adminController.professorController.create);
router.put('/professors/:id', adminController.professorController.update);
router.delete('/professors/:id', adminController.professorController.delete);

// Admins
router.get('/admins', adminController.adminController.getAll);
router.get('/admins/:id', adminController.adminController.getById);
router.post('/admins', adminController.adminController.create);
router.put('/admins/:id', adminController.adminController.update);
router.delete('/admins/:id', adminController.adminController.delete);

// Courses
router.get('/courses', adminController.courseController.getAll);
router.get('/courses/:id', adminController.courseController.getById);
router.post('/courses', adminController.courseController.create);
router.put('/courses/:id', adminController.courseController.update);
router.delete('/courses/:id', adminController.courseController.delete);

// Learning Paths
router.get('/learning-paths', adminController.learningPathController.getAll);
router.get('/learning-paths/:id', adminController.learningPathController.getById);
router.post('/learning-paths', adminController.learningPathController.create);
router.put('/learning-paths/:id', adminController.learningPathController.update);
router.delete('/learning-paths/:id', adminController.learningPathController.delete);

module.exports = router;