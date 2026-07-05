'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_master', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      college_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      department: {
        type: Sequelize.STRING
      },
      semester: {
        type: Sequelize.INTEGER
      },
      section: {
        type: Sequelize.STRING
      },
      created_At: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_At: {
        allowNull: false,
        type: Sequelize.DATE
      }
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_master');
  }
};