// src/routes/professorRoutes.js
const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Define routes for the professor dashboard and related features
router.get('/dashboard', professorController.getDashboard);
router.get('/courses', professorController.getCourses);
router.get('/students', professorController.getStudentsForMarks);
router.post('/marks', professorController.saveMarks);

module.exports = router;
