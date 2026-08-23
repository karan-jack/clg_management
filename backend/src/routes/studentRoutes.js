const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const studentController = require('../controllers/studentController');

// Apply JWT authentication & Student role authorization (role_id = 3)
router.use(authMiddleware);
router.use(authorizeRoles(3));

// Student routes
router.get('/dashboard', studentController.getDashboard);
router.get('/academic-records', studentController.getAcademicRecords);
router.get('/courses', studentController.getCourses);
router.get('/my-learning', studentController.getMyLearning);
router.get('/learning-paths', studentController.getLearningPaths);
router.get('/leaderboard', studentController.getLeaderboard);
router.get('/badges', studentController.getBadges);
router.get('/certificates', studentController.getCertificates);
router.get('/publications', studentController.getPublications);
router.get('/profile', studentController.getProfile);
router.put('/profile', studentController.updateProfile);

module.exports = router;
