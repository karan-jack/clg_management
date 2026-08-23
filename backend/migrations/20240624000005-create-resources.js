'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
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
      file_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING
      },
      file_type: {
        type: Sequelize.STRING
      },
      upload_date: {
        type: Sequelize.STRING
      },
      uploaded_by: {
        type: Sequelize.STRING
      },
      file_path: {
        type: Sequelize.STRING
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

    await queryInterface.addIndex('resources', ['course_id'], {
      name: 'idx_resources_course_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('resources');
  }
};
