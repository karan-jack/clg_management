// src/controllers/professorController.js
const professorService = require('../services/professorService');

const handleControllerError = (res, error, defaultMessage = 'Internal server error') => {
  const status = error.status || 500;
  return res.status(status).json({
    success: false,
    message: error.message || defaultMessage
  });
};

const getDashboard = async (req, res) => {
  try {
    const data = await professorService.getDashboard(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch dashboard');
  }
};

const getAcademicRecords = async (req, res) => {
  try {
    const data = await professorService.getAcademicRecords(req.user.userId, req.query);
    return res.status(200).json({ success: true, ...data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch academic records');
  }
};

const getStudents = async (req, res) => {
  try {
    const data = await professorService.getStudents(req.user.userId, req.query);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch students');
  }
};

const saveMarks = async (req, res) => {
  try {
    const data = await professorService.saveMarks(req.user.userId, req.body);
    return res.status(200).json({ success: true, message: 'Marks saved successfully', data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to save marks');
  }
};

const getCourses = async (req, res) => {
  try {
    const data = await professorService.getCourses(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch courses');
  }
};

const getModules = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = await professorService.getModules(req.user.userId, courseId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch modules');
  }
};

const createModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = await professorService.createModule(req.user.userId, courseId, req.body);
    return res.status(201).json({ success: true, message: 'Module created successfully', data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to create module');
  }
};

const updateModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const data = await professorService.updateModule(req.user.userId, moduleId, req.body);
    return res.status(200).json({ success: true, message: 'Module updated successfully', data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to update module');
  }
};

const deleteModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const data = await professorService.deleteModule(req.user.userId, moduleId);
    return res.status(200).json({ success: true, ...data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to delete module');
  }
};

const getResources = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = await professorService.getResources(req.user.userId, courseId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch resources');
  }
};

const createResource = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = await professorService.createResource(req.user.userId, courseId, req.body);
    return res.status(201).json({ success: true, message: 'Resource created successfully', data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to create resource');
  }
};

const deleteResource = async (req, res) => {
  try {
    const { resourceId } = req.params;
    const data = await professorService.deleteResource(req.user.userId, resourceId);
    return res.status(200).json({ success: true, ...data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to delete resource');
  }
};

const getQuizzes = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = await professorService.getQuizzes(req.user.userId, courseId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch quizzes');
  }
};

const createQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = await professorService.createQuiz(req.user.userId, courseId, req.body);
    return res.status(201).json({ success: true, message: 'Quiz created successfully', data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to create quiz');
  }
};

const getAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = await professorService.getAssignments(req.user.userId, courseId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch assignments');
  }
};

const createAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = await professorService.createAssignment(req.user.userId, courseId, req.body);
    return res.status(201).json({ success: true, message: 'Assignment created successfully', data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to create assignment');
  }
};

module.exports = {
  getDashboard,
  getAcademicRecords,
  getStudents,
  saveMarks,
  getCourses,
  getModules,
  createModule,
  updateModule,
  deleteModule,
  getResources,
  createResource,
  deleteResource,
  getQuizzes,
  createQuiz,
  getAssignments,
  createAssignment
};
