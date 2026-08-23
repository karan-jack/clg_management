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

const ProfessorCourse = require('./ProfessorCourse')(sequelize, DataTypes);
const StudentCourse = require('./StudentCourse')(sequelize, DataTypes);
const LearningPathCourse = require('./LearningPathCourse')(sequelize, DataTypes);
const Badge = require('./Badge')(sequelize, DataTypes);
const StudentBadge = require('./StudentBadge')(sequelize, DataTypes);
const Certificate = require('./Certificate')(sequelize, DataTypes);
const Publication = require('./Publication')(sequelize, DataTypes);

// Existing Associations
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });
Studentprofile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Studentprofile, { foreignKey: 'user_id' });
Studentmaster.hasOne(Studentprofile, { foreignKey: 'student_master_id' });
Studentprofile.belongsTo(Studentmaster, { foreignKey: 'student_master_id' });
Professorprofile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Professorprofile, { foreignKey: 'user_id' });

// Phase 2 Associations
Course.hasMany(Module, { foreignKey: 'course_id' });
Module.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(Resource, { foreignKey: 'course_id' });
Resource.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(Mark, { foreignKey: 'course_id' });
Mark.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(Quiz, { foreignKey: 'course_id' });
Quiz.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(Assignment, { foreignKey: 'course_id' });
Assignment.belongsTo(Course, { foreignKey: 'course_id' });

// Junction associations
User.belongsToMany(Course, { through: ProfessorCourse, foreignKey: 'professor_id', as: 'AssignedCourses' });
Course.belongsToMany(User, { through: ProfessorCourse, foreignKey: 'course_id', as: 'Professors' });

User.belongsToMany(Course, { through: StudentCourse, foreignKey: 'student_id', as: 'EnrolledCourses' });
Course.belongsToMany(User, { through: StudentCourse, foreignKey: 'course_id', as: 'Students' });

// Mark associations
User.hasMany(Mark, { foreignKey: 'student_id', as: 'StudentMarks' });
Mark.belongsTo(User, { foreignKey: 'student_id', as: 'Student' });

User.hasMany(Mark, { foreignKey: 'professor_id', as: 'ProfessorMarks' });
Mark.belongsTo(User, { foreignKey: 'professor_id', as: 'Professor' });

// Quiz & Assignment associations
User.hasMany(Quiz, { foreignKey: 'professor_id' });
Quiz.belongsTo(User, { foreignKey: 'professor_id' });

User.hasMany(Assignment, { foreignKey: 'professor_id' });
Assignment.belongsTo(User, { foreignKey: 'professor_id' });

// Phase 5 Associations
LearningPath.belongsToMany(Course, { through: LearningPathCourse, foreignKey: 'learning_path_id', as: 'Courses' });
Course.belongsToMany(LearningPath, { through: LearningPathCourse, foreignKey: 'course_id', as: 'LearningPaths' });

User.belongsToMany(Badge, { through: StudentBadge, foreignKey: 'student_id', as: 'Badges' });
Badge.belongsToMany(User, { through: StudentBadge, foreignKey: 'badge_id', as: 'Students' });

User.hasMany(Certificate, { foreignKey: 'student_id', as: 'Certificates' });
Certificate.belongsTo(User, { foreignKey: 'student_id' });
Course.hasMany(Certificate, { foreignKey: 'course_id' });
Certificate.belongsTo(Course, { foreignKey: 'course_id' });

User.hasMany(Publication, { foreignKey: 'student_id', as: 'Publications' });
Publication.belongsTo(User, { foreignKey: 'student_id' });

User.hasMany(Activity, { foreignKey: 'user_id', as: 'Activities' });
Activity.belongsTo(User, { foreignKey: 'user_id' });

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
  ProfessorCourse,
  StudentCourse,
  Module,
  Resource,
  Mark,
  Quiz,
  Assignment,
  LearningPath,
  LearningPathCourse,
  Badge,
  StudentBadge,
  Certificate,
  Publication,
  Activity
};