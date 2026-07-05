// src/services/authService.js
const { User, Role, Studentmaster, Studentprofile, Professormaster, Professorprofile } = require('../models');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

const AuthService = {
  /**
   * Signup (for students and professors)
   * @param {Object} data - { college_id, employee_id, email, password }
   * @returns {Object} - { success, message, token, user }
   */
  signup: async (data) => {
    const { college_id, employee_id, email, password } = data;

    if (!college_id && !employee_id) {
      return { success: false, message: 'Please provide either a College ID or an Employee ID' };
    }
    if (college_id && employee_id) {
      return { success: false, message: 'Please provide either a College ID or an Employee ID, not both' };
    }

    // Step 1: Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    // Step 2: Hash password
    const hashedPassword = await hashPassword(password);

    if (college_id) {
      // --- Student Signup Logic ---
      const studentMaster = await Studentmaster.findOne({ where: { college_id } });
      if (!studentMaster) {
        return { success: false, message: 'Invalid College ID' };
      }

      const role = await Role.findOne({ where: { role_name: 'student' } });
      if (!role) throw new Error('Student role not found');

      const user = await User.create({ email, password: hashedPassword, role_id: role.id, is_active: true });

      await Studentprofile.create({
        user_id: user.id,
        student_master_id: studentMaster.id,
        total_xp: 0,
        current_level: 1,
        streak_count: 0
      });

      const token = generateToken({ userId: user.id, roleId: user.role_id });
      const userResponse = { id: user.id, email: user.email, role_id: user.role_id, is_active: user.is_active };

      return { success: true, message: 'Registration Successful', token, user: userResponse };
    } else {
      // --- Professor Signup Logic ---
      const professorMaster = await Professormaster.findOne({ where: { employee_id } });
      if (!professorMaster) {
        return { success: false, message: 'Invalid Employee ID' };
      }

      const role = await Role.findOne({ where: { role_name: 'professor' } });
      if (!role) throw new Error('Professor role not found');

      const user = await User.create({ email, password: hashedPassword, role_id: role.id, is_active: true });

      await Professorprofile.create({
        user_id: user.id,
        employee_id: professorMaster.employee_id,
        name: professorMaster.name,
        department: professorMaster.department,
        designation: professorMaster.designation
      });

      // Optional: link user_id back to professor_master table
      await Professormaster.update({ user_id: user.id }, { where: { id: professorMaster.id } });

      const token = generateToken({ userId: user.id, roleId: user.role_id });
      const userResponse = { id: user.id, email: user.email, role_id: user.role_id, is_active: user.is_active };

      return { success: true, message: 'Registration Successful', token, user: userResponse };
    }
  },

  /**
   * Login (for all roles)
   * @param {Object} data - { email, password }
   * @returns {Object} - { success, token, role, user }
   */
  login: async (data) => {
    const { email, password } = data;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id, roleId: user.role_id });

    // Prepare user object
    const userResponse = {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
      is_active: user.is_active
    };

    return {
      success: true,
      token,
      role: user.role_id, // Include role in response as per requirements
      user: userResponse
    };
  }
};

module.exports = AuthService;