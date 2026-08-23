'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('learning_paths', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      difficulty: { type: Sequelize.STRING, allowNull: true, defaultValue: 'Beginner' },
      estimated_hours: { type: Sequelize.INTEGER, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });

    await queryInterface.createTable('learning_path_courses', {
      learning_path_id: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'learning_paths', key: 'id' }, onDelete: 'CASCADE' },
      course_id: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE' }
    });

    await queryInterface.createTable('badges', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      icon: { type: Sequelize.STRING, allowNull: true },
      xp_reward: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      criteria: { type: Sequelize.STRING, allowNull: true }
    });

    await queryInterface.createTable('student_badges', {
      student_id: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      badge_id: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'badges', key: 'id' }, onDelete: 'CASCADE' },
      earned_date: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
    });

    await queryInterface.createTable('certificates', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      student_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      course_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING, allowNull: false },
      issue_date: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      status: { type: Sequelize.STRING, allowNull: true, defaultValue: 'Issued' },
      certificate_id: { type: Sequelize.STRING, allowNull: true, unique: true }
    });

    await queryInterface.createTable('publications', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      student_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING, allowNull: false },
      authors: { type: Sequelize.STRING, allowNull: true },
      venue: { type: Sequelize.STRING, allowNull: true },
      publication_date: { type: Sequelize.DATE, allowNull: true },
      status: { type: Sequelize.STRING, allowNull: true, defaultValue: 'Published' },
      citation_count: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 }
    });

    await queryInterface.createTable('activities', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      type: { type: Sequelize.STRING, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      subtitle: { type: Sequelize.STRING, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('activities');
    await queryInterface.dropTable('publications');
    await queryInterface.dropTable('certificates');
    await queryInterface.dropTable('student_badges');
    await queryInterface.dropTable('badges');
    await queryInterface.dropTable('learning_path_courses');
    await queryInterface.dropTable('learning_paths');
  }
};
