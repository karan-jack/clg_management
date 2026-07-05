'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Studentprofile', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      student_master_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'student_master',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      total_xp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      current_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      streak_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: true
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Studentprofile');
  }
};