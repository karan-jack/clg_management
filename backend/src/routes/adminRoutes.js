const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

// Apply JWT authentication & Admin role authorization (role_id = 1)
router.use(authMiddleware);
router.use(authorizeRoles(1));

// Dashboard & Analytics
router.get('/dashboard', adminController.getDashboard);
router.get('/analytics', adminController.getAnalytics);

const mapCrudRoutes = (path, controller) => {
    router.get(path, controller.getAll);
    router.get(`${path}/:id`, controller.getById);
    router.post(path, controller.create);
    router.put(`${path}/:id`, controller.update);
    router.delete(`${path}/:id`, controller.delete);
};

// CRUD Routes
mapCrudRoutes('/students', adminController.studentController);
mapCrudRoutes('/professors', adminController.professorController);
mapCrudRoutes('/admins', adminController.adminController);
mapCrudRoutes('/courses', adminController.courseController);
mapCrudRoutes('/subjects', adminController.subjectController);
mapCrudRoutes('/batches', adminController.batchController);
mapCrudRoutes('/learning-paths', adminController.learningPathController);

module.exports = router;