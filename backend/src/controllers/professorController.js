// src/controllers/professorController.js
const professorService = require('../services/professorService');

const getProfile = async (req, res) => {
  try {
    const result = await professorService.getProfile(req.user.userId);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('getProfile error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getDashboard = async (req, res) => {
  try {
    const result = await professorService.getDashboard(req.user.userId);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('getDashboard error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getCourses = async (req, res) => {
  try {
    const result = await professorService.getCourses(req.user.userId);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('getCourses error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getStudentsForMarks = async (req, res) => {
  try {
    // Pass query params as filters (department, semester)
    const result = await professorService.getStudentsForMarks(req.user.userId, req.query);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('getStudentsForMarks error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const saveMarks = async (req, res) => {
  try {
    const result = await professorService.saveMarks(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('saveMarks error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getAcademicRecords = async (req, res) => {
  try {
    // Pass query params as filters (department, semester, page, limit)
    const result = await professorService.getAcademicRecords(req.user.userId, req.query);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('getAcademicRecords error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getProfile,
  getDashboard,
  getCourses,
  getStudentsForMarks,
  saveMarks,
  getAcademicRecords,
};
