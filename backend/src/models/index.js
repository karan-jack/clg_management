const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const Role = require('./Role')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const Studentprofile = require('./StudentProfile')(sequelize, DataTypes);
const Studentmaster = require('./StudentMaster')(sequelize, DataTypes);
const Professorprofile = require('./ProfessorProfile')(sequelize, DataTypes);
const Professormaster = require('./ProfessorMaster')(sequelize, DataTypes);
const Course = require('./Course')(sequelize, DataTypes);
const Module = require('./Module')(sequelize, DataTypes);
const Resource = require('./Resource')(sequelize, DataTypes);
const Assignment = require('./Assignment')(sequelize, DataTypes);
const Quiz = require('./Quiz')(sequelize, DataTypes);
const LearningPath = require('./LearningPath')(sequelize, DataTypes);
const Activity = require('./Activity')(sequelize, DataTypes);
const Mark = require('./Mark')(sequelize, DataTypes);

User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });
Studentprofile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Studentprofile, { foreignKey: 'user_id' });
Studentmaster.hasOne(Studentprofile, { foreignKey: 'student_master_id' });
Studentprofile.belongsTo(Studentmaster, { foreignKey: 'student_master_id' });
Professorprofile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Professorprofile, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  Role,
  User,
  Studentprofile,
  Studentmaster,
  Professorprofile,
  Professormaster,
  Course,
  Module,
  Resource,
  Assignment,
  Quiz,
  LearningPath,
  Activity,
  Mark
};