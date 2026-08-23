const {
  sequelize,
  User,
  Role,
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
  Activity
} = require('../models');
const { Op } = require('sequelize');

const getDashboard = async () => {
  const studentsCount = await User.count({ where: { role_id: 3 } });
  const professorsCount = await User.count({ where: { role_id: 2 } });
  const adminsCount = await User.count({ where: { role_id: 1 } });
  const coursesCount = await Course.count();
  const departmentsCount = await Course.count({ distinct: true, col: 'department' });
  const modulesCount = await Module.count();
  const resourcesCount = await Resource.count();
  const assignmentsCount = await Assignment.count();
  const quizzesCount = await Quiz.count();
  const learningPathsCount = await LearningPath.count();
  
  // Dummy data for batches since model isn't mapped
  const batchesCount = 0; 
  
  const recentActivities = await Activity.findAll({ order: [['created_at', 'DESC']], limit: 5 });
  const recentRegistrations = await User.findAll({ order: [['created_at', 'DESC']], limit: 5, attributes: ['id', 'email', 'created_at'] });
  const recentCourseCreation = await Course.findAll({ order: [['created_at', 'DESC']], limit: 5 });
  const recentResourceUploads = await Resource.findAll({ order: [['created_at', 'DESC']], limit: 5 });

  return {
      totalStudents: studentsCount,
      totalProfessors: professorsCount,
      totalAdmins: adminsCount,
      totalCourses: coursesCount,
      totalDepartments: departmentsCount,
      totalBatches: batchesCount,
      totalModules: modulesCount,
      totalResources: resourcesCount,
      totalAssignments: assignmentsCount,
      totalQuizzes: quizzesCount,
      totalLearningPaths: learningPathsCount,
      recentActivities,
      recentRegistrations,
      recentCourseCreation,
      recentResourceUploads,
      monthlyStatistics: {}
  };
};

const getAnalytics = async () => {
    return { data: 'Analytics Data' };
};

// --- CRUD Helpers ---
const paginate = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    return { offset: (page - 1) * limit, limit };
};

// --- Students ---
const getStudents = async (query) => {
    const { offset, limit } = paginate(query);
    return await User.findAndCountAll({
        where: { role_id: 3 },
        include: [{ model: Studentprofile }],
        offset,
        limit,
        order: [['created_at', 'DESC']]
    });
};
const getStudentById = async (id) => await User.findOne({ where: { id, role_id: 3 }, include: [{ model: Studentprofile }] });
const createStudent = async (data) => {
    const t = await sequelize.transaction();
    try {
        const user = await User.create({ ...data, role_id: 3 }, { transaction: t });
        await Studentprofile.create({ user_id: user.id }, { transaction: t });
        await t.commit();
        return user;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};
const updateStudent = async (id, data) => await User.update(data, { where: { id, role_id: 3 } });
const deleteStudent = async (id) => await User.destroy({ where: { id, role_id: 3 } });

// --- Professors ---
const getProfessors = async (query) => {
    const { offset, limit } = paginate(query);
    return await User.findAndCountAll({
        where: { role_id: 2 },
        include: [{ model: Professorprofile }],
        offset,
        limit,
        order: [['created_at', 'DESC']]
    });
};
const getProfessorById = async (id) => await User.findOne({ where: { id, role_id: 2 }, include: [{ model: Professorprofile }] });
const createProfessor = async (data) => {
    const t = await sequelize.transaction();
    try {
        const user = await User.create({ ...data, role_id: 2 }, { transaction: t });
        await Professorprofile.create({ user_id: user.id, department: data.department, designation: data.designation }, { transaction: t });
        await t.commit();
        return user;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};
const updateProfessor = async (id, data) => await User.update(data, { where: { id, role_id: 2 } });
const deleteProfessor = async (id) => await User.destroy({ where: { id, role_id: 2 } });

// --- Admins ---
const getAdmins = async (query) => {
    const { offset, limit } = paginate(query);
    return await User.findAndCountAll({
        where: { role_id: 1 },
        offset,
        limit,
        order: [['created_at', 'DESC']]
    });
};
const getAdminById = async (id) => await User.findOne({ where: { id, role_id: 1 } });
const createAdmin = async (data) => await User.create({ ...data, role_id: 1 });
const updateAdmin = async (id, data) => await User.update(data, { where: { id, role_id: 1 } });
const deleteAdmin = async (id) => await User.destroy({ where: { id, role_id: 1 } });

// --- Courses ---
const getCourses = async (query) => {
    const { offset, limit } = paginate(query);
    return await Course.findAndCountAll({
        offset,
        limit,
        order: [['created_at', 'DESC']]
    });
};
const getCourseById = async (id) => await Course.findByPk(id);
const createCourse = async (data) => await Course.create(data);
const updateCourse = async (id, data) => await Course.update(data, { where: { id } });
const deleteCourse = async (id) => await Course.destroy({ where: { id } });

// --- Subjects ---
const getSubjects = async (query) => ({ count: 0, rows: [] }); // Stubbed
const getSubjectById = async (id) => null;
const createSubject = async (data) => ({});
const updateSubject = async (id, data) => ({});
const deleteSubject = async (id) => ({});

// --- Batches ---
const getBatches = async (query) => ({ count: 0, rows: [] }); // Stubbed
const getBatchById = async (id) => null;
const createBatch = async (data) => ({});
const updateBatch = async (id, data) => ({});
const deleteBatch = async (id) => ({});

// --- Learning Paths ---
const getLearningPaths = async (query) => {
    const { offset, limit } = paginate(query);
    return await LearningPath.findAndCountAll({
        offset,
        limit,
        order: [['created_at', 'DESC']]
    });
};
const getLearningPathById = async (id) => await LearningPath.findByPk(id);
const createLearningPath = async (data) => await LearningPath.create(data);
const updateLearningPath = async (id, data) => await LearningPath.update(data, { where: { id } });
const deleteLearningPath = async (id) => await LearningPath.destroy({ where: { id } });

module.exports = {
  getDashboard, getAnalytics,
  getStudents, getStudentById, createStudent, updateStudent, deleteStudent,
  getProfessors, getProfessorById, createProfessor, updateProfessor, deleteProfessor,
  getAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin,
  getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
  getSubjects, getSubjectById, createSubject, updateSubject, deleteSubject,
  getBatches, getBatchById, createBatch, updateBatch, deleteBatch,
  getLearningPaths, getLearningPathById, createLearningPath, updateLearningPath, deleteLearningPath
};
