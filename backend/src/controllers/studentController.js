const studentService = require('../services/studentService');

const handleControllerError = (res, error, defaultMessage = 'Internal server error') => {
  const status = error.status || 500;
  return res.status(status).json({
    success: false,
    message: error.message || defaultMessage
  });
};

const getDashboard = async (req, res) => {
  try {
    const data = await studentService.getDashboard(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch dashboard');
  }
};

const getAcademicRecords = async (req, res) => {
  try {
    const data = await studentService.getAcademicRecords(req.user.userId, req.query);
    return res.status(200).json({ success: true, ...data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch academic records');
  }
};

const getCourses = async (req, res) => {
  try {
    const data = await studentService.getCourses(req.user.userId, req.query);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch courses');
  }
};

const getMyLearning = async (req, res) => {
  try {
    const data = await studentService.getMyLearning(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch my learning');
  }
};

const getLearningPaths = async (req, res) => {
  try {
    const data = await studentService.getLearningPaths();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch learning paths');
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const data = await studentService.getLeaderboard();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch leaderboard');
  }
};

const getBadges = async (req, res) => {
  try {
    const data = await studentService.getBadges(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch badges');
  }
};

const getCertificates = async (req, res) => {
  try {
    const data = await studentService.getCertificates(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch certificates');
  }
};

const getPublications = async (req, res) => {
  try {
    const data = await studentService.getPublications(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch publications');
  }
};

const getProfile = async (req, res) => {
  try {
    const data = await studentService.getProfile(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch profile');
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = await studentService.updateProfile(req.user.userId, req.body);
    return res.status(200).json({ success: true, message: 'Profile updated successfully', data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to update profile');
  }
};

module.exports = {
  getDashboard,
  getAcademicRecords,
  getCourses,
  getMyLearning,
  getLearningPaths,
  getLeaderboard,
  getBadges,
  getCertificates,
  getPublications,
  getProfile,
  updateProfile
};
