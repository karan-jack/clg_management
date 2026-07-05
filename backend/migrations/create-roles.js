'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // Insert seed values
    await queryInterface.bulkInsert('roles', [
      { id: 1, role_name: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, role_name: 'professor', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, role_name: 'student', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};