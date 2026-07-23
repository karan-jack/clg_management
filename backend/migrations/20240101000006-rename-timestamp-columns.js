'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // We wrap each in a try-catch just in case some were already migrated
    const renameSafe = async (tableName, oldName, newName) => {
      try {
        const tableDesc = await queryInterface.describeTable(tableName);
        if (tableDesc[oldName]) {
          await queryInterface.renameColumn(tableName, oldName, newName);
        }
      } catch (e) {
        console.warn(`Could not rename ${oldName} to ${newName} on ${tableName}:`, e.message);
      }
    };

    await renameSafe('roles', 'createdAt', 'created_at');
    await renameSafe('roles', 'updatedAt', 'updated_at');

    await renameSafe('users', 'createdAt', 'created_at');
    await renameSafe('users', 'updatedAt', 'updated_at');

    await renameSafe('professor_profiles', 'createdAt', 'created_at');
    await renameSafe('professor_profiles', 'updatedAt', 'updated_at');

    await renameSafe('student_master', 'created_At', 'created_at');
    await renameSafe('student_master', 'updated_At', 'updated_at');

    await renameSafe('Studentprofile', 'createdAt', 'created_at');
    await renameSafe('Studentprofile', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    const renameSafe = async (tableName, oldName, newName) => {
      try {
        const tableDesc = await queryInterface.describeTable(tableName);
        if (tableDesc[oldName]) {
          await queryInterface.renameColumn(tableName, oldName, newName);
        }
      } catch (e) {
        console.warn(`Could not rename ${oldName} to ${newName} on ${tableName}:`, e.message);
      }
    };

    await renameSafe('roles', 'created_at', 'createdAt');
    await renameSafe('roles', 'updated_at', 'updatedAt');

    await renameSafe('users', 'created_at', 'createdAt');
    await renameSafe('users', 'updated_at', 'updatedAt');

    await renameSafe('professor_profiles', 'created_at', 'createdAt');
    await renameSafe('professor_profiles', 'updated_at', 'updatedAt');

    await renameSafe('student_master', 'created_at', 'created_At');
    await renameSafe('student_master', 'updated_at', 'updated_At');

    await renameSafe('Studentprofile', 'created_at', 'createdAt');
    await renameSafe('Studentprofile', 'updated_at', 'updatedAt');
  }
};
