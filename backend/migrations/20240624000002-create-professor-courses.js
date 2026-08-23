'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professor_courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      professor_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      course_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('professor_courses', ['professor_id', 'course_id'], {
      unique: true,
      name: 'idx_professor_course_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('professor_courses');
  }
};
