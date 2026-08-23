// src/routes/professorRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const professorController = require('../controllers/professorController');

// Apply JWT authentication & Professor role authorization (role_id = 2)
router.use(authMiddleware);
router.use(authorizeRoles(2));

// Dashboard & Stats
router.get('/dashboard', professorController.getDashboard);
router.get('/academic-records', professorController.getAcademicRecords);
router.get('/students', professorController.getStudents);
router.post('/marks', professorController.saveMarks);

// Courses
router.get('/courses', professorController.getCourses);

// Modules
router.get('/courses/:courseId/modules', professorController.getModules);
router.post('/courses/:courseId/modules', professorController.createModule);
router.put('/modules/:moduleId', professorController.updateModule);
router.delete('/modules/:moduleId', professorController.deleteModule);

// Resources
router.get('/courses/:courseId/resources', professorController.getResources);
router.post('/courses/:courseId/resources', professorController.createResource);
router.delete('/resources/:resourceId', professorController.deleteResource);

// Quizzes
router.get('/courses/:courseId/quizzes', professorController.getQuizzes);
router.post('/courses/:courseId/quizzes', professorController.createQuiz);

// Assignments
router.get('/courses/:courseId/assignments', professorController.getAssignments);
router.post('/courses/:courseId/assignments', professorController.createAssignment);

module.exports = router;
