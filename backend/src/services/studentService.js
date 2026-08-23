const {
  sequelize,
  Course,
  StudentCourse,
  ProfessorCourse,
  Module,
  Resource,
  Mark,
  Quiz,
  Assignment,
  User,
  Studentprofile,
  Studentmaster,
  Professorprofile,
  Professormaster,
  LearningPath,
  Badge,
  Certificate,
  Publication,
  Activity
} = require('../models');
const { Op } = require('sequelize');

const getDashboard = async (userId) => {
  const profile = await Studentprofile.findOne({ where: { user_id: userId } });
  const master = await Studentmaster.findOne({ where: { id: profile ? profile.student_master_id : null } });
  const user = await User.findByPk(userId);

  const studentName = master ? master.name : (profile ? `Student ${userId}` : 'Student');
  const department = master ? master.department : 'General';
  const semester = master ? master.semester : 1;
  const currentXp = profile ? profile.total_xp : 0;
  const streak = profile ? profile.streak_count : 0;
  
  const studentCourses = await StudentCourse.findAll({ where: { student_id: userId } });
  const enrolledCourseCount = studentCourses.length;
  const completedCourseCount = studentCourses.filter(c => c.status === 'Completed').length;
  
  // Calculate GPA/CGPA if marks exist
  const marks = await Mark.findAll({ where: { student_id: userId } });
  let totalGradePoints = 0;
  let totalCoursesWithMarks = marks.length;
  marks.forEach(m => {
      const total = (m.lab_marks || 0) + (m.theory_marks || 0);
      if (total >= 90) totalGradePoints += 10;
      else if (total >= 80) totalGradePoints += 9;
      else if (total >= 70) totalGradePoints += 8;
      else if (total >= 60) totalGradePoints += 7;
      else if (total >= 50) totalGradePoints += 6;
      else totalGradePoints += 0;
  });
  const gpa = totalCoursesWithMarks > 0 ? (totalGradePoints / totalCoursesWithMarks).toFixed(2) : 0;

  // Rank calculation (simple approach, based on XP)
  let rank = 0;
  if (profile) {
      const higherXpCount = await Studentprofile.count({
          where: { total_xp: { [Op.gt]: currentXp } }
      });
      rank = higherXpCount + 1;
  }
  
  return {
    studentInfo: {
        name: studentName,
        email: user ? user.email : '',
        department,
        semester,
        gpa,
        enrolledCourseCount,
        completedCourseCount,
        currentXp,
        rank,
        streak
    },
    earnedBadges: await getBadges(userId),
    recentActivities: await Activity.findAll({ where: { user_id: userId }, order: [['created_at', 'DESC']], limit: 5 }),
    upcomingAssignments: [], // Stubbed: Assignment deadlines
    recentQuizzes: [], // Stubbed: Recent Quizzes
    courseProgressSummary: studentCourses.map(sc => ({ course_id: sc.course_id, progress: sc.progress, status: sc.status }))
  };
};

const getAcademicRecords = async (userId, query = {}) => {
  const { semester, search, page = 1, limit = 10 } = query;
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const offset = (parsedPage - 1) * parsedLimit;

  let whereClause = { student_id: userId };
  if (semester) {
    whereClause.semester = semester;
  }

  const { rows: marks, count: totalRecords } = await Mark.findAndCountAll({
    where: whereClause,
    include: [
      { model: Course, attributes: ['id', 'title', 'code'] }
    ],
    limit: parsedLimit,
    offset,
    order: [['created_at', 'DESC']]
  });
  
  const records = marks.map((mark) => {
    const labMarks = mark.lab_marks || 0;
    const theoryMarks = mark.theory_marks || 0;
    const totalMarks = labMarks + theoryMarks;
    let grade = 'F';
    if (totalMarks >= 90) grade = 'A+';
    else if (totalMarks >= 80) grade = 'A';
    else if (totalMarks >= 70) grade = 'B+';
    else if (totalMarks >= 60) grade = 'B';
    else if (totalMarks >= 50) grade = 'C';

    return {
      id: mark.id,
      course_id: mark.course_id,
      course_title: mark.Course ? mark.Course.title : '',
      course_code: mark.Course ? mark.Course.code : '',
      semester: mark.semester,
      lab_marks: labMarks,
      theory_marks: theoryMarks,
      total: totalMarks,
      grade,
      credits: 3 // Defaulting credits to 3 as it's not in DB
    };
  });

  return {
    records,
    totalRecords,
    totalPages: Math.ceil(totalRecords / parsedLimit),
    currentPage: parsedPage
  };
};

const getCourses = async (userId, query = {}) => {
  // Return all available courses, with enrollment status for this student
  const allCourses = await Course.findAll({
    include: [
        { model: User, as: 'Professors', attributes: ['id', 'email'] },
        { model: Module, attributes: ['id'] }
    ]
  });

  const studentCourses = await StudentCourse.findAll({ where: { student_id: userId } });
  const enrolledCourseIds = studentCourses.map(sc => sc.course_id);

  const formattedCourses = allCourses.map(course => {
      const professor = course.Professors && course.Professors.length > 0 ? course.Professors[0].email : 'Unassigned';
      return {
          id: course.id,
          title: course.title,
          code: course.code,
          department: course.department,
          semester: course.semester,
          moduleCount: course.Modules ? course.Modules.length : course.modules_count,
          professor,
          enrollmentStatus: enrolledCourseIds.includes(course.id) ? 'Enrolled' : 'Not Enrolled',
          description: `Learn fundamental concepts of ${course.title}.`,
          color: course.color,
          bg: course.bg
      };
  });
  return formattedCourses;
};

const getMyLearning = async (userId) => {
  const studentCourses = await StudentCourse.findAll({
    where: { student_id: userId },
    include: [
      { model: Course, include: [
          { model: Module, attributes: ['id'] },
          { model: Resource, attributes: ['id'] },
          { model: Quiz, attributes: ['id'] },
          { model: Assignment, attributes: ['id'] }
      ] }
    ]
  });

  const formattedCourses = studentCourses.map(sc => {
      const course = sc.Course;
      if (!course) return null;
      
      const totalModules = course.Modules ? course.Modules.length : course.modules_count;
      const completedModules = sc.completed_modules;
      const remainingModules = Math.max(0, totalModules - completedModules);

      return {
          id: course.id,
          title: course.title,
          code: course.code,
          department: course.department,
          semester: course.semester,
          progress: sc.progress,
          completedModules,
          remainingModules,
          lastAccessed: sc.updated_at,
          resourcesCount: course.Resources ? course.Resources.length : 0,
          quizCount: course.Quizzes ? course.Quizzes.length : 0,
          assignmentCount: course.Assignments ? course.Assignments.length : 0,
          status: sc.status
      };
  }).filter(c => c !== null);

  return formattedCourses;
};

const getLearningPaths = async () => {
    return await LearningPath.findAll({
        include: [{
            model: Course,
            as: 'Courses',
            attributes: ['id', 'title', 'code']
        }]
    });
};

const getLeaderboard = async () => {
    // Generate leaderboard based on StudentProfile total_xp
    const profiles = await Studentprofile.findAll({
        order: [['total_xp', 'DESC']],
        limit: 10,
        include: [
            { model: User, attributes: ['id', 'email'] },
            { model: Studentmaster, attributes: ['name', 'department'] }
        ]
    });

    return await Promise.all(profiles.map(async (p, index) => {
        const completedCourses = await StudentCourse.count({
            where: { student_id: p.user_id, status: 'Completed' }
        });
        return {
            rank: index + 1,
            xp: p.total_xp,
            completedCourses,
            badgesEarned: 0, // Stubbed
            studentName: p.Studentmaster ? p.Studentmaster.name : `Student ${p.user_id}`,
            department: p.Studentmaster ? p.Studentmaster.department : 'General'
        };
    }));
};

const getBadges = async (userId) => {
    const user = await User.findByPk(userId, {
        include: [{
            model: Badge,
            as: 'Badges'
        }]
    });
    return user && user.Badges ? user.Badges : [];
};

const getCertificates = async (userId) => {
    return await Certificate.findAll({
        where: { student_id: userId },
        include: [{ model: Course, attributes: ['id', 'title'] }]
    });
};

const getPublications = async (userId) => {
    return await Publication.findAll({
        where: { student_id: userId }
    });
};

const getProfile = async (userId) => {
    const user = await User.findByPk(userId);
    const profile = await Studentprofile.findOne({ where: { user_id: userId } });
    const master = await Studentmaster.findOne({ where: { id: profile ? profile.student_master_id : null } });

    return {
        name: master ? master.name : `Student ${userId}`,
        email: user ? user.email : '',
        department: master ? master.department : '',
        semester: master ? master.semester : 1,
        phone: '', // Not in schema
        profilePicture: profile ? profile.profile_picture : '',
        bio: '', // Not in schema
        skills: [] // Not in schema
    };
};

const updateProfile = async (userId, data) => {
    // We only allow updating certain fields.
    // For now, if we had phone, bio, skills, we'd update them in StudentProfile.
    // We'll just update profile picture if provided.
    
    let profile = await Studentprofile.findOne({ where: { user_id: userId } });
    if (!profile) {
        // Can't really update if no profile, but normally one exists.
        const error = new Error('Profile not found');
        error.status = 404;
        throw error;
    }

    if (data.profilePicture) {
        await profile.update({ profile_picture: data.profilePicture });
    }
    
    return await getProfile(userId);
};

module.exports = {
  getDashboard,
  getAcademicRecords,
  getCourses,
  getMyLearning,
  getLearningPaths,
  getLeaderboard,
  getBadges,
  getCertificates,
  getPublications,
  getProfile,
  updateProfile
};
