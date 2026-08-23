'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('marks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      student_id: {
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
      professor_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      lab_marks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      theory_marks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      semester: {
        type: Sequelize.INTEGER
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

    await queryInterface.addIndex('marks', ['student_id', 'course_id'], {
      name: 'idx_marks_student_course'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('marks');
  }
};
