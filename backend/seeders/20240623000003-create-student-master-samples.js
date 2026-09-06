'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('student_master', [
      {
        college_id: '22ECE101',
        name: 'Karan Jack',
        department: 'ECE',
        semester: 7,
        section: 'A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        college_id: '22ECE102',
        name: 'Rahul Sharma',
        department: 'ECE',
        semester: 7,
        section: 'A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        college_id: '22CSE101',
        name: 'Amit Kumar',
        department: 'CSE',
        semester: 7,
        section: 'B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        college_id: '22CSE102',
        name: 'Priya Singh',
        department: 'CSE',
        semester: 7,
        section: 'B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        college_id: '22ME101',
        name: 'Arjun Das',
        department: 'ME',
        semester: 7,
        section: 'A',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('student_master', {
      college_id: ['22ECE101', '22ECE102', '22CSE101', '22CSE102', '22ME101']
    }, {});
  }
};