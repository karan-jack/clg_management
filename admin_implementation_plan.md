# Full Stack Implementation Plan: Connecting the Admin Dashboard

Just like the Professor section, the Admin Dashboard and its various management tabs are currently displaying hardcoded data. Because the Admin is essentially the "superuser" of the platform, the admin controller needs endpoints to query and manage almost every table in the database.

Here is the exact roadmap to make the Admin section fully dynamic.

## 1. Database Schema & Models
The Admin section manages Users (Students, Professors), Academics (Courses, Batches), and Learning Paths. 

You already have the core User/Profile models. You will use the `Course` and `Activity` models we discussed in the Professor plan. However, you need to add a few more for the Admin's specific tabs:

### `LearningPath.js`
- `id` (Primary Key)
- `title` (String) - e.g., "Full Stack Web Development"
- `description` (String)
- `status` (Enum: 'Active', 'Draft')

### `Batch.js`
*(Optional: You can either store batches as a string in the Course/Student models, or create a dedicated model for better management).*
- `id` (Primary Key)
- `name` (String) - e.g., "2024-2028"
- `status` (String) - e.g., "Ongoing", "Completed"

---

## 2. The Backend Controller (`adminController.js`)
Currently, your `adminController.js` only handles `signup`, `login`, and `me`. You need to expand it with CRUD (Create, Read, Update, Delete) operations for the management tabs.

```javascript
const { User, StudentProfile, ProfessorProfile, Course, Activity, Role } = require('../models');

// 1. Admin Dashboard Overview
const getDashboardStats = async (req, res) => {
  try {
    // Run parallel count queries
    const totalStudents = await StudentProfile.count();
    const totalProfessors = await ProfessorProfile.count();
    const totalCourses = await Course.count();
    // const totalLearningPaths = await LearningPath.count();

    const recentActivities = await Activity.findAll({ 
      order: [['createdAt', 'DESC']], 
      limit: 5 
    });

    const stats = {
      counts: { students: totalStudents, professors: totalProfessors, courses: totalCourses },
      recentActivity: recentActivities,
      // You can also aggregate monthly registration data here for the Sparkline charts
    };

    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 2. User Management: Students
const getStudents = async (req, res) => {
  try {
    const { search, department, semester } = req.query; // For filtering
    
    let whereClause = {}; // Build dynamic filters based on query params
    if (department && department !== 'All Departments') whereClause.branch = department;
    if (semester && semester !== 'All Semesters') whereClause.semester = semester;

    const students = await StudentProfile.findAll({ where: whereClause });
    return res.status(200).json({ success: true, data: students });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// (You would write similar getProfessors, updateStudentStatus, deleteUser functions)

// 3. Academic Management: Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res.status(200).json({ success: true, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
```

---

## 3. Backend Routes (`adminRoutes.js`)
You will map these new controller functions to endpoints. Notice that we protect these with an `adminMiddleware` to ensure only users with the Admin role can access them.

```javascript
const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware'); // Ensures req.user.role === 'admin'
const adminController = require('../controllers/adminController');

// Auth (Already exists)
router.post('/signup', adminController.signup);
router.post('/login', adminController.login);

// Dashboard
router.get('/dashboard-stats', adminMiddleware, adminController.getDashboardStats);

// User Management
router.get('/students', adminMiddleware, adminController.getStudents);
router.get('/professors', adminMiddleware, adminController.getProfessors);
// router.patch('/students/:id/status', adminMiddleware, adminController.updateStudentStatus);

// Academic Management
router.get('/courses', adminMiddleware, adminController.getAllCourses);

module.exports = router;
```

---

## 4. Frontend Modifications

Currently, in files like `AdminDashboard.jsx` and `StudentsManagement.jsx`, you have hardcoded variables at the top of the file:
```javascript
const students = [
  { id: "ENR2021001", name: "Aarav Sharma", dept: "Computer Science", ... },
  // ...
];
```

You need to replace these with React state and `useEffect` hooks.

### Example: Modifying `StudentsManagement.jsx`
```javascript
import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentsManagement() {
  const [students, setStudents] = useState([]); // Replaces the hardcoded array
  const [loading, setLoading] = useState(true);

  // Filters state
  const [department, setDepartment] = useState("All Departments");
  const [semester, setSemester] = useState("All Semesters");

  useEffect(() => {
    // Build the query string based on filters
    let query = `/api/admin/students?`;
    if (department !== "All Departments") query += `department=${department}&`;
    if (semester !== "All Semesters") query += `semester=${semester}`;

    // Fetch from backend
    axios.get(query, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setStudents(response.data.data);
      setLoading(false);
    })
    .catch(error => console.error("Error fetching students:", error));

  }, [department, semester]); // Re-run whenever a filter changes

  // ... the rest of the UI rendering remains the same, but it now loops over your dynamic `students` state!
}
```

## Summary of Action Plan
To completely build out the Admin section:
1. Ensure the `Course`, `LearningPath`, and `Activity` models (and their migrations) are created.
2. Add the CRUD functions to `adminController.js` utilizing Sequelize (`findAll`, `count`, `update`, `destroy`).
3. Set up the routes in `adminRoutes.js` and protect them with an admin authorization middleware.
4. Go through every `.jsx` file in `frontend/src/pages/admin/` and replace the hardcoded arrays with `useState` and `useEffect` API calls.
