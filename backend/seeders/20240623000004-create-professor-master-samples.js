'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('professor_master', [
      {
        employee_id: 'PROF101',
        name: 'Dr. John Doe',
        designation: 'Head of Department',
        department: 'CSE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        employee_id: 'PROF102',
        name: 'Dr. Jane Smith',
        designation: 'Assistant Professor',
        department: 'ECE',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { updateOnDuplicate: ['name', 'designation', 'department', 'updated_at'] });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professor_master', {
      employee_id: ['PROF101', 'PROF102']
    }, {});
  }
};
