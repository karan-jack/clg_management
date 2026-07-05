'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@college.com',
        password: hashedPassword,
        role_id: 1,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { email: 'admin@college.com' }, {});
  }
};