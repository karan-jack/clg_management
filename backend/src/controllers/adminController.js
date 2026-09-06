const adminService = require('../services/adminService');

const handleControllerError = (res, error, defaultMessage = 'Internal server error') => {
  console.error(error);
  const status = error.status || 500;
  return res.status(status).json({
    success: false,
    message: error.message || defaultMessage
  });
};

const getDashboard = async (req, res) => {
  try {
    const data = await adminService.getDashboard();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch dashboard');
  }
};

const getAnalytics = async (req, res) => {
  try {
    const data = await adminService.getAnalytics();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch analytics');
  }
};

const uploadStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const result = await adminService.uploadStudents(req.file.path);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to upload students');
  }
};

const updatePathCourses = async (req, res) => {
  try {
    const { courses } = req.body;
    await adminService.updatePathCourses(req.params.id, courses);
    return res.status(200).json({ success: true });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to update path courses');
  }
};

const generateCrudControllers = (serviceGroup) => {
    const getFn = (action, plural = false) => {
        const fnName = `${action}${serviceGroup}${plural ? 's' : ''}`;
        if (typeof adminService[fnName] !== 'function') {
            throw new Error(`Service method ${fnName} is not implemented`);
        }
        return adminService[fnName];
    };

    return {
        getAll: async (req, res) => {
            try {
                const fn = getFn('get', true);
                const data = await fn(req.query);
                return res.status(200).json({ success: true, ...data });
            } catch (error) { return handleControllerError(res, error); }
        },
        getById: async (req, res) => {
            try {
                const fn = getFn('get', false);
                const data = await fn(req.params.id);
                if (!data) return res.status(404).json({ success: false, message: 'Not found' });
                return res.status(200).json({ success: true, data });
            } catch (error) { return handleControllerError(res, error); }
        },
        create: async (req, res) => {
            try {
                const fn = getFn('create', false);
                const data = await fn(req.body);
                return res.status(201).json({ success: true, data });
            } catch (error) { return handleControllerError(res, error); }
        },
        update: async (req, res) => {
            try {
                const fn = getFn('update', false);
                const data = await fn(req.params.id, req.body);
                return res.status(200).json({ success: true, data });
            } catch (error) { return handleControllerError(res, error); }
        },
        delete: async (req, res) => {
            try {
                const fn = getFn('delete', false);
                await fn(req.params.id);
                return res.status(200).json({ success: true, message: 'Deleted successfully' });
            } catch (error) { return handleControllerError(res, error); }
        }
    };
};

module.exports = {
  getDashboard,
  getAnalytics,
  uploadStudents,
  updatePathCourses,
  studentController: generateCrudControllers('Student'),
  professorController: generateCrudControllers('Professor'),
  adminController: generateCrudControllers('Admin'),
  courseController: generateCrudControllers('Course'),
  subjectController: generateCrudControllers('Subject'),
  batchController: generateCrudControllers('Batch'),
  learningPathController: generateCrudControllers('LearningPath')
};
