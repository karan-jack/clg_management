// src/controllers/professorController.js

const getDashboard = async (req, res) => {
  try {
    // Mock data for the Professor Dashboard
    const dashboardData = {
      batches: [
        { batch: '2025-2029', percent: 30, color: '#ded4f2', ring: '#b49adf', semester: 3 },
        { batch: '2024-2028', percent: 50, color: '#d3d8ee', ring: '#7e91d4', semester: 3 },
        { batch: '2025-2029', percent: 30, color: '#c8ebe8', ring: '#72c9c3', semester: 3 }
      ],
      overview: {
        totalStudents: '1,248',
        activeCourses: '42',
        quizzesCreated: '156',
        aiToolsUsed: '89'
      },
      recentActivity: [
        {
          id: 1,
          type: 'quiz',
          title: 'Quiz on Machine Learning',
          subtitle: 'Created by you',
          status: 'Quiz Created',
          time: '2 hours ago',
          color: '#8a35d8'
        },
        {
          id: 2,
          type: 'assignment',
          title: 'Assignment: Neural Networks',
          subtitle: 'Due on 25 May 2025',
          status: 'Due Soon',
          time: '3 hours ago',
          color: '#fb5a00'
        },
        {
          id: 3,
          type: 'quiz_view',
          title: 'Quiz on Operating Systems',
          subtitle: 'Attempted by 45 students',
          status: 'Quiz Viewed',
          time: '5 hours ago',
          color: '#3b9ce0'
        },
        {
          id: 4,
          type: 'assignment_pending',
          title: 'Data Structures Assignment',
          subtitle: '23 Submissions Pending',
          status: 'Pending',
          time: '1 day ago',
          color: '#f2b000'
        },
        {
          id: 5,
          type: 'resource',
          title: 'Advanced Algorithms',
          subtitle: '3 resources needed',
          status: 'Resources',
          time: '1 day ago',
          color: '#e32d36'
        }
      ]
    };

    return res.status(200).json({ success: true, data: dashboardData });
  } catch (error) {
    console.error('getDashboard error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getCourses = async (req, res) => {
  try {
    // Mock data for Assigned Courses
    const courses = [
      {
        id: 1,
        title: 'Data Structures',
        batch: '2024-2028',
        semester: '3',
        modules: 8,
        students: 120,
        color: '#7b35d4',
        bg: '#f0e7fb'
      },
      {
        id: 2,
        title: 'Algorithms',
        batch: '2024-2028',
        semester: '4',
        modules: 7,
        students: 115,
        color: '#1267c5',
        bg: '#eaf4fb'
      },
      {
        id: 3,
        title: 'Database Systems',
        batch: '2024-2028',
        semester: '5',
        modules: 6,
        students: 110,
        color: '#27965b',
        bg: '#edf5ea'
      },
      {
        id: 4,
        title: 'Operating Systems',
        batch: '2023-2027',
        semester: '6',
        modules: 7,
        students: 105,
        color: '#f15a16',
        bg: '#fff0e8'
      }
    ];

    return res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error('getCourses error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getStudentsForMarks = async (req, res) => {
  try {
    // Mock data for UploadMarks student list
    const students = [
      ["ENR2021001", "Aarav Sharma", "2024-2028", "Electronics", "Semester 3", 35, 78],
      ["ENR2021002", "Diya Patel", "2024-2028", "Electronics", "Semester 3", 40, 85],
      ["ENR2021003", "Rohan Verma", "2024-2028", "Electronics", "Semester 3", 32, 70],
      ["ENR2021004", "Sneha Iyer", "2024-2028", "Electronics", "Semester 3", 45, 92],
      ["ENR2021005", "Karan Mehta", "2024-2028", "Electronics", "Semester 3", 38, 88],
      ["ENR2021006", "Ananya Singh", "2024-2028", "Electronics", "Semester 3", 42, 90],
      ["ENR2021007", "Manav Gupta", "2024-2028", "Electronics", "Semester 3", 30, 65],
      ["ENR2021008", "Pooja Nair", "2024-2028", "Electronics", "Semester 3", 44, 91],
      ["ENR2021009", "Aditya Malhotra", "2024-2028", "Electronics", "Semester 3", 36, 72],
      ["ENR2021010", "Ishita Roy", "2024-2028", "Electronics", "Semester 3", 41, 89]
    ];

    return res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error('getStudentsForMarks error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const saveMarks = async (req, res) => {
  try {
    const { marks, subject } = req.body;
    
    // In a real scenario, we'd update the database here.
    // For now, just return success.
    
    return res.status(200).json({ 
      success: true, 
      message: 'Marks saved successfully', 
      processedCount: marks ? marks.length : 0 
    });
  } catch (error) {
    console.error('saveMarks error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getDashboard,
  getCourses,
  getStudentsForMarks,
  saveMarks
};
