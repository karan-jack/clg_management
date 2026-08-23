// src/services/admin/index.js
const { User, Role, Studentmaster, Professormaster } = require('../../models');

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Role, attributes: ['id', 'role_name'] }]
    });
    return users;
  } catch (error) {
    console.error('adminService.getAllUsers error:', error);
    return [];
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Role, attributes: ['id', 'role_name'] }]
    });
    return user;
  } catch (error) {
    console.error('adminService.getUserById error:', error);
    return null;
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(data);
    const updated = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Role, attributes: ['id', 'role_name'] }]
    });
    return updated;
  } catch (error) {
    console.error('adminService.updateUser error:', error);
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  } catch (error) {
    console.error('adminService.deleteUser error:', error);
    return false;
  }
};

const getAllStudents = async () => {
  try {
    const students = await Studentmaster.findAll();
    return students;
  } catch (error) {
    console.error('adminService.getAllStudents error:', error);
    return [];
  }
};

const getAllProfessors = async () => {
  try {
    const professors = await Professormaster.findAll();
    return professors;
  } catch (error) {
    console.error('adminService.getAllProfessors error:', error);
    return [];
  }
};

const getAdminUsers = async () => {
  try {
    const admins = await User.findAll({
      where: { role_id: 1 },
      attributes: { exclude: ['password'] },
      include: [{ model: Role, attributes: ['id', 'role_name'] }]
    });
    return admins;
  } catch (error) {
    console.error('adminService.getAdminUsers error:', error);
    return [];
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
