// src/services/professorService.js
const {
  sequelize,
  Course,
  ProfessorCourse,
  StudentCourse,
  Module,
  Resource,
  Mark,
  Quiz,
  Assignment,
  User,
  Professorprofile,
  Professormaster,
  Studentprofile,
  Studentmaster
} = require('../models');
const { Op } = require('sequelize');

/**
 * Helper to check if a course is assigned to a professor
 */
const verifyProfessorCourse = async (userId, courseId) => {
  const assignment = await ProfessorCourse.findOne({
    where: { professor_id: userId, course_id: courseId }
  });
  return !!assignment;
};

/**
 * Helper to calculate letter grade from total marks
 */
const calculateGrade = (total) => {
  if (total >= 90) return 'A+';
  if (total >= 80) return 'A';
  if (total >= 70) return 'B+';
  if (total >= 60) return 'B';
  if (total >= 50) return 'C';
  return 'F';
};

/**
 * 1. GET Dashboard Data
 */
const getDashboard = async (userId) => {
  const profile = await Professorprofile.findOne({ where: { user_id: userId } });
  const master = await Professormaster.findOne({ where: { user_id: userId } });

  const professorName = profile ? profile.name : master ? master.name : 'Professor';
  const department = profile ? profile.department : master ? master.department : 'General';

  // Fetch assigned courses
  const professorCourses = await ProfessorCourse.findAll({ where: { professor_id: userId } });
  const courseIds = professorCourses.map((pc) => pc.course_id);

  const totalAssignedCourses = courseIds.length;

  let totalStudents = 0;
  let totalModules = 0;
  let recentResources = [];
  let recentQuizzes = [];
  let recentAssignments = [];

  if (courseIds.length > 0) {
    // Total distinct students enrolled in professor's courses
    totalStudents = await StudentCourse.count({
      where: { course_id: { [Op.in]: courseIds } },
      distinct: true,
      col: 'student_id'
    });

    // Total modules across courses
    totalModules = await Module.count({
      where: { course_id: { [Op.in]: courseIds } }
    });

    // Recent resources
    recentResources = await Resource.findAll({
      where: { course_id: { [Op.in]: courseIds } },
      order: [['created_at', 'DESC']],
      limit: 5
    });

    // Recent quizzes
    recentQuizzes = await Quiz.findAll({
      where: { professor_id: userId },
      order: [['created_at', 'DESC']],
      limit: 5
    });

    // Recent assignments
    recentAssignments = await Assignment.findAll({
      where: { professor_id: userId },
      order: [['created_at', 'DESC']],
      limit: 5
    });
  }

  // Assigned courses list for frontend
  const assignedCourses = await Course.findAll({
    where: { id: { [Op.in]: courseIds.length > 0 ? courseIds : [0] } }
  });

  return {
    professorName,
    department,
    totalAssignedCourses,
    totalStudents,
    totalModules,
    assignedCourses,
    recentResources,
    recentQuizzes,
    recentAssignments
  };
};

/**
 * 2. GET Academic Records
 */
const getAcademicRecords = async (userId, query = {}) => {
  const { search, semester, courseId, page = 1, limit = 10 } = query;

  const professorCourses = await ProfessorCourse.findAll({ where: { professor_id: userId } });
  const assignedCourseIds = professorCourses.map((pc) => pc.course_id);

  if (assignedCourseIds.length === 0) {
    return { records: [], totalRecords: 0, totalPages: 0, currentPage: parseInt(page) };
  }

  const whereClause = {
    course_id: { [Op.in]: assignedCourseIds }
  };

  if (courseId) {
    if (!assignedCourseIds.includes(parseInt(courseId))) {
      const error = new Error('Unauthorized access to course records');
      error.status = 403;
      throw error;
    }
    whereClause.course_id = courseId;
  }

  if (semester) {
    whereClause.semester = semester;
  }

  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const offset = (parsedPage - 1) * parsedLimit;

  const { rows: marks, count: totalRecords } = await Mark.findAndCountAll({
    where: whereClause,
    include: [
      { model: Course, attributes: ['id', 'title', 'code'] },
      {
        model: User,
        as: 'Student',
        attributes: ['id', 'email'],
        include: [
          {
            model: Studentprofile,
            include: [{ model: Studentmaster }]
          }
        ]
      }
    ],
    limit: parsedLimit,
    offset,
    order: [['created_at', 'DESC']]
  });

  const records = marks.map((mark) => {
    const studentUser = mark.Student;
    const studentProfile = studentUser ? studentUser.Studentprofile : null;
    const studentMaster = studentProfile ? studentProfile.Studentmaster : null;

    const labMarks = mark.lab_marks || 0;
    const theoryMarks = mark.theory_marks || 0;
    const totalMarks = labMarks + theoryMarks;
    const grade = calculateGrade(totalMarks);

    return {
      id: mark.id,
      student_id: mark.student_id,
      student_name: studentMaster ? studentMaster.name : 'Student',
      college_id: studentMaster ? studentMaster.college_id : `STU${mark.student_id}`,
      course_id: mark.course_id,
      course_title: mark.Course ? mark.Course.title : '',
      semester: mark.semester,
      lab_marks: labMarks,
      theory_marks: theoryMarks,
      total_marks: totalMarks,
      grade
    };
  });

  return {
    records,
    totalRecords,
    totalPages: Math.ceil(totalRecords / parsedLimit),
    currentPage: parsedPage
  };
};

/**
 * 3. GET Students Enrolled
 */
const getStudents = async (userId, query = {}) => {
  const { courseId, search } = query;

  const professorCourses = await ProfessorCourse.findAll({ where: { professor_id: userId } });
  const assignedCourseIds = professorCourses.map((pc) => pc.course_id);

  if (assignedCourseIds.length === 0) {
    return [];
  }

  let targetCourseIds = assignedCourseIds;
  if (courseId) {
    if (!assignedCourseIds.includes(parseInt(courseId))) {
      const error = new Error('Unauthorized access to course students');
      error.status = 403;
      throw error;
    }
    targetCourseIds = [parseInt(courseId)];
  }

  const studentCourses = await StudentCourse.findAll({
    where: { course_id: { [Op.in]: targetCourseIds } },
    include: [
      { model: Course, attributes: ['id', 'title', 'code', 'department', 'semester'] },
      {
        model: User,
        as: 'Students',
        attributes: ['id', 'email'],
        include: [
          {
            model: Studentprofile,
            include: [{ model: Studentmaster }]
          }
        ]
      }
    ]
  });

  const studentsList = studentCourses.map((sc) => {
    const studentUser = sc.Students;
    const studentProfile = studentUser ? studentUser.Studentprofile : null;
    const studentMaster = studentProfile ? studentProfile.Studentmaster : null;

    return {
      student_id: sc.student_id,
      name: studentMaster ? studentMaster.name : 'Student',
      college_id: studentMaster ? studentMaster.college_id : `STU${sc.student_id}`,
      department: studentMaster ? studentMaster.department : (sc.Course ? sc.Course.department : ''),
      semester: studentMaster ? studentMaster.semester : (sc.Course ? sc.Course.semester : ''),
      course_id: sc.course_id,
      course_title: sc.Course ? sc.Course.title : '',
      progress: sc.progress,
      status: sc.status,
      completed_modules: sc.completed_modules
    };
  });

  if (search) {
    const lowerSearch = search.toLowerCase();
    return studentsList.filter(
      (s) => s.name.toLowerCase().includes(lowerSearch) || s.college_id.toLowerCase().includes(lowerSearch)
    );
  }

  return studentsList;
};

/**
 * 4. POST / Upsert Marks
 */
const saveMarks = async (userId, data) => {
  const { student_id, course_id, lab_marks, theory_marks, semester } = data;

  if (!student_id || !course_id) {
    const error = new Error('student_id and course_id are required');
    error.status = 400;
    throw error;
  }

  const isAssigned = await verifyProfessorCourse(userId, course_id);
  if (!isAssigned) {
    const error = new Error('Unauthorized to upload marks for this course');
    error.status = 403;
    throw error;
  }

  const parsedLab = parseInt(lab_marks || 0);
  const parsedTheory = parseInt(theory_marks || 0);

  if (parsedLab < 0 || parsedLab > 100 || parsedTheory < 0 || parsedTheory > 100) {
    const error = new Error('Marks must be between 0 and 100');
    error.status = 400;
    throw error;
  }

  const t = await sequelize.transaction();

  try {
    let markRecord = await Mark.findOne({
      where: { student_id, course_id },
      transaction: t
    });

    if (markRecord) {
      await markRecord.update(
        {
          professor_id: userId,
          lab_marks: parsedLab,
          theory_marks: parsedTheory,
          semester: semester || markRecord.semester
        },
        { transaction: t }
      );
    } else {
      markRecord = await Mark.create(
        {
          student_id,
          course_id,
          professor_id: userId,
          lab_marks: parsedLab,
          theory_marks: parsedTheory,
          semester: semester || 1
        },
        { transaction: t }
      );
    }

    await t.commit();

    const totalMarks = parsedLab + parsedTheory;
    const grade = calculateGrade(totalMarks);

    return {
      ...markRecord.toJSON(),
      total_marks: totalMarks,
      grade
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

/**
 * 5. GET Assigned Courses
 */
const getCourses = async (userId) => {
  const professorCourses = await ProfessorCourse.findAll({ where: { professor_id: userId } });
  const courseIds = professorCourses.map((pc) => pc.course_id);

  if (courseIds.length === 0) {
    return [];
  }

  const courses = await Course.findAll({
    where: { id: { [Op.in]: courseIds } }
  });

  const enrichedCourses = await Promise.all(
    courses.map(async (course) => {
      const modulesCount = await Module.count({ where: { course_id: course.id } });
      const resourcesCount = await Resource.count({ where: { course_id: course.id } });
      const studentCount = await StudentCourse.count({ where: { course_id: course.id } });
      const quizCount = await Quiz.count({ where: { course_id: course.id } });
      const assignmentCount = await Assignment.count({ where: { course_id: course.id } });

      return {
        ...course.toJSON(),
        modules_count: modulesCount,
        resources_count: resourcesCount,
        student_count: studentCount,
        quiz_count: quizCount,
        assignment_count: assignmentCount
      };
    })
  );

  return enrichedCourses;
};

/**
 * 6. GET Course Modules
 */
const getModules = async (userId, courseId) => {
  const isAssigned = await verifyProfessorCourse(userId, courseId);
  if (!isAssigned) {
    const error = new Error('Unauthorized to access modules for this course');
    error.status = 403;
    throw error;
  }

  const modules = await Module.findAll({
    where: { course_id: courseId },
    order: [['order', 'ASC']]
  });

  return modules;
};

/**
 * 7. POST Create Module
 */
const createModule = async (userId, courseId, data) => {
  const isAssigned = await verifyProfessorCourse(userId, courseId);
  if (!isAssigned) {
    const error = new Error('Unauthorized to create module for this course');
    error.status = 403;
    throw error;
  }

  const { title, description, status, order } = data;
  if (!title) {
    const error = new Error('Module title is required');
    error.status = 400;
    throw error;
  }

  const t = await sequelize.transaction();

  try {
    const count = await Module.count({ where: { course_id: courseId }, transaction: t });
    const moduleOrder = order || count + 1;

    const newModule = await Module.create(
      {
        course_id: courseId,
        title,
        description: description || '',
        status: status || 'Draft',
        order: moduleOrder
      },
      { transaction: t }
    );

    // Update modules_count on Course
    const newCount = await Module.count({ where: { course_id: courseId }, transaction: t });
    await Course.update({ modules_count: newCount }, { where: { id: courseId }, transaction: t });

    await t.commit();
    return newModule;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

/**
 * 8. PUT Update Module
 */
const updateModule = async (userId, moduleId, data) => {
  const moduleItem = await Module.findByPk(moduleId);
  if (!moduleItem) {
    const error = new Error('Module not found');
    error.status = 404;
    throw error;
  }

  const isAssigned = await verifyProfessorCourse(userId, moduleItem.course_id);
  if (!isAssigned) {
    const error = new Error('Unauthorized to update this module');
    error.status = 403;
    throw error;
  }

  await moduleItem.update(data);
  return moduleItem;
};

/**
 * 9. DELETE Module
 */
const deleteModule = async (userId, moduleId) => {
  const moduleItem = await Module.findByPk(moduleId);
  if (!moduleItem) {
    const error = new Error('Module not found');
    error.status = 404;
    throw error;
  }

  const isAssigned = await verifyProfessorCourse(userId, moduleItem.course_id);
  if (!isAssigned) {
    const error = new Error('Unauthorized to delete this module');
    error.status = 403;
    throw error;
  }

  const courseId = moduleItem.course_id;
  const t = await sequelize.transaction();

  try {
    await moduleItem.destroy({ transaction: t });
    const newCount = await Module.count({ where: { course_id: courseId }, transaction: t });
    await Course.update({ modules_count: newCount }, { where: { id: courseId }, transaction: t });
    await t.commit();

    return { message: 'Module deleted successfully' };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

/**
 * 10. GET Resources
 */
const getResources = async (userId, courseId) => {
  const isAssigned = await verifyProfessorCourse(userId, courseId);
  if (!isAssigned) {
    const error = new Error('Unauthorized to access resources for this course');
    error.status = 403;
    throw error;
  }

  const resources = await Resource.findAll({
    where: { course_id: courseId },
    order: [['created_at', 'DESC']]
  });

  return resources;
};

/**
 * 11. POST Create Resource Metadata
 */
const createResource = async (userId, courseId, data) => {
  const isAssigned = await verifyProfessorCourse(userId, courseId);
  if (!isAssigned) {
    const error = new Error('Unauthorized to upload resource for this course');
    error.status = 403;
    throw error;
  }

  const { file_name, type, file_type, upload_date, uploaded_by, file_path } = data;
  if (!file_name) {
    const error = new Error('file_name is required');
    error.status = 400;
    throw error;
  }

  const profile = await Professorprofile.findOne({ where: { user_id: userId } });
  const uploaderName = uploaded_by || (profile ? profile.name : 'Professor');

  const resource = await Resource.create({
    course_id: courseId,
    file_name,
    type: type || 'Notes',
    file_type: file_type || 'pdf',
    upload_date: upload_date || new Date().toLocaleDateString(),
    uploaded_by: uploaderName,
    file_path: file_path || '/uploads/resources/' + file_name
  });

  return resource;
};

/**
 * 12. DELETE Resource
 */
const deleteResource = async (userId, resourceId) => {
  const resource = await Resource.findByPk(resourceId);
  if (!resource) {
    const error = new Error('Resource not found');
    error.status = 404;
    throw error;
  }

  const isAssigned = await verifyProfessorCourse(userId, resource.course_id);
  if (!isAssigned) {
    const error = new Error('Unauthorized to delete this resource');
    error.status = 403;
    throw error;
  }

  await resource.destroy();
  return { message: 'Resource deleted successfully' };
};

/**
 * 13. GET Quizzes
 */
const getQuizzes = async (userId, courseId) => {
  const isAssigned = await verifyProfessorCourse(userId, courseId);
  if (!isAssigned) {
    const error = new Error('Unauthorized to access quizzes for this course');
    error.status = 403;
    throw error;
  }

  const quizzes = await Quiz.findAll({
    where: { course_id: courseId, professor_id: userId },
    order: [['created_at', 'DESC']]
  });

  return quizzes;
};

/**
 * 14. POST Create Quiz
 */
const createQuiz = async (userId, courseId, data) => {
  const isAssigned = await verifyProfessorCourse(userId, courseId);
  if (!isAssigned) {
    const error = new Error('Unauthorized to create quiz for this course');
    error.status = 403;
    throw error;
  }

  const { title, questions } = data;
  if (!title) {
    const error = new Error('Quiz title is required');
    error.status = 400;
    throw error;
  }

  const quiz = await Quiz.create({
    course_id: courseId,
    professor_id: userId,
    title,
    questions: questions || []
  });

  return quiz;
};

/**
 * 15. GET Assignments
 */
const getAssignments = async (userId, courseId) => {
  const isAssigned = await verifyProfessorCourse(userId, courseId);
  if (!isAssigned) {
    const error = new Error('Unauthorized to access assignments for this course');
    error.status = 403;
    throw error;
  }

  const assignments = await Assignment.findAll({
    where: { course_id: courseId, professor_id: userId },
    order: [['created_at', 'DESC']]
  });

  return assignments;
};

/**
 * 16. POST Create Assignment
 */
const createAssignment = async (userId, courseId, data) => {
  const isAssigned = await verifyProfessorCourse(userId, courseId);
  if (!isAssigned) {
    const error = new Error('Unauthorized to create assignment for this course');
    error.status = 403;
    throw error;
  }

  const { title, content, due_date } = data;
  if (!title) {
    const error = new Error('Assignment title is required');
    error.status = 400;
    throw error;
  }

  const assignment = await Assignment.create({
    course_id: courseId,
    professor_id: userId,
    title,
    content: content || '',
    due_date: due_date || null
  });

  return assignment;
};

module.exports = {
  getDashboard,
  getAcademicRecords,
  getStudents,
  saveMarks,
  getCourses,
  getModules,
  createModule,
  updateModule,
  deleteModule,
  getResources,
  createResource,
  deleteResource,
  getQuizzes,
  createQuiz,
  getAssignments,
  createAssignment
};
