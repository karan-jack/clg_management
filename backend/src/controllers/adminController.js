const adminService = require('../services/admin');

const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await adminService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await adminService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await adminService.getAllStudents();
    res.status(200).json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching students', error: error.message });
  }
};

const getAllProfessors = async (req, res) => {
  try {
    const professors = await adminService.getAllProfessors();
    res.status(200).json({ success: true, professors });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching professors', error: error.message });
  }
};

const getAdminUsers = async (req, res) => {
  try {
    const admins = await adminService.getAdminUsers();
    res.status(200).json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching admin users', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllStudents,
  getAllProfessors,
  getAdminUsers
};
