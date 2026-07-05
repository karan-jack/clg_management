const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const Role = require('./Role')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const Studentprofile = require('./StudentProfile')(sequelize, DataTypes);
const Studentmaster = require('./StudentMaster')(sequelize, DataTypes);
const Professorprofile = require('./ProfessorProfile')(sequelize, DataTypes);
const Professormaster = require('./ProfessorMaster')(sequelize, DataTypes);

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
  Professormaster
};