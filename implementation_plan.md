# Full Stack Implementation Plan: Connecting the Professor Dashboard

Based on the analysis of the frontend `professor` folder (Dashboard, Courses, Quizzes, Upload Marks, etc.) and the current backend controllers, here is the exact roadmap to make the Professor Dashboard fully dynamic and connected to the database.

## 1. Database Schema & Models
Currently, your database has User, Role, and basic Profiles. To support the professor dashboard, you need to create the following new Sequelize models in `backend/src/models`:

### `Course.js` (or `Subject.js`)
Stores details about the subjects.
- `id` (Primary Key)
- `title` (String) - e.g., "Data Structures"
- `batch` (String) - e.g., "2024-2028"
- `department` (String) - e.g., "ECE"
- `semester` (Integer) - e.g., 3
- `modules_count` (Integer) - Total modules
- `color` & `bg` (String) - For frontend UI rendering

### `ProfessorCourse.js` (Junction Table)
Links a professor to the courses they teach.
- `professor_id` (Foreign Key -> User/ProfessorProfile)
- `course_id` (Foreign Key -> Course)

### `StudentCourse.js` (Junction Table)
Links students to courses they are enrolled in.
- `student_id` (Foreign Key -> User/StudentProfile)
- `course_id` (Foreign Key -> Course)

### `Mark.js`
Stores the marks given by a professor to a student.
- `id` (Primary Key)
- `student_id` (Foreign Key -> Student)
- `course_id` (Foreign Key -> Course)
- `professor_id` (Foreign Key -> Professor)
- `lab_marks` (Integer)
- `theory_marks` (Integer)
- `semester` (Integer)

### `Activity.js`
Stores the recent activity for the dashboard timeline.
- `id` (Primary Key)
- `professor_id` (Foreign Key)
- `type` (Enum: 'quiz', 'assignment', 'resource')
- `title` (String)
- `subtitle` (String)
- `status` (String)

*(You will also eventually need models for `Quiz`, `Assignment`, and `Resource` following the same pattern).*

---

## 2. The Backend Controller (`professorController.js`)
Your controller needs to move from returning hardcoded data to querying the database using Sequelize. Here is what it will look like:

```javascript
const { Course, ProfessorCourse, StudentCourse, StudentProfile, Mark, Activity } = require('../models');

// 1. Dashboard Overview
const getDashboard = async (req, res) => {
  try {
    const professorId = req.user.id;

    // Fetch real stats from DB
    const activeCoursesCount = await ProfessorCourse.count({ where: { professor_id: professorId } });
    const recentActivities = await Activity.findAll({ where: { professor_id: professorId }, limit: 5 });
    
    // (Add queries for total students in their courses, quizzes created, etc.)

    const dashboardData = {
      batches: [/* Query distinct batches from courses */],
      overview: {
        totalStudents: 1248, // Replace with DB count
        activeCourses: activeCoursesCount,
        // ...
      },
      recentActivity: recentActivities
    };

    return res.status(200).json({ success: true, data: dashboardData });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 2. Fetch Assigned Courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{
        model: ProfessorCourse,
        where: { professor_id: req.user.id }
      }]
    });
    return res.status(200).json({ success: true, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 3. Fetch Students for the Upload Marks Tab
const getStudentsForMarks = async (req, res) => {
  try {
    const { courseId } = req.query; // Passed from frontend filter
    
    // Fetch students enrolled in this course
    const students = await StudentProfile.findAll({
      include: [{
        model: StudentCourse,
        where: { course_id: courseId }
      }]
    });
    
    // Format data for frontend table
    const formattedData = students.map(s => [
      s.enrollment_no, s.name, s.batch, s.branch, s.semester, 0, 0 // Defaults for Lab/Theory
    ]);

    return res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 4. Save Uploaded Marks
const saveMarks = async (req, res) => {
  try {
    const { marks, courseId } = req.body;
    const professorId = req.user.id;

    // `marks` is the array from frontend: [enrollment, name, batch, dept, sem, lab, theory]
    for (const studentData of marks) {
       // Look up student by enrollment no
       const student = await StudentProfile.findOne({ where: { enrollment_no: studentData[0] } });
       
       if (student) {
         // Upsert (Update or Insert) the mark record
         await Mark.upsert({
           student_id: student.id,
           course_id: courseId,
           professor_id: professorId,
           lab_marks: studentData[5],
           theory_marks: studentData[6]
         });
       }
    }
    
    return res.status(200).json({ success: true, message: 'Marks saved successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
```

---

## 3. Backend Routes (`professorRoutes.js`)
You will need to map these controller functions to endpoints, protected by your authentication middleware (so `req.user.id` is populated).

```javascript
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const professorController = require('../controllers/professorController');

router.get('/dashboard', authMiddleware, professorController.getDashboard);
router.get('/courses', authMiddleware, professorController.getCourses);
router.get('/students-for-marks', authMiddleware, professorController.getStudentsForMarks);
router.post('/marks', authMiddleware, professorController.saveMarks);

module.exports = router;
```

---

## 4. Frontend Modifications
Right now, your React components (like `UploadMarks.jsx`, `AssignedCourses.jsx`) have hardcoded arrays like `const students = [...]` or `const courses = [...]` at the top of the file. 

You need to change them to use React state and `useEffect` to fetch data from your new backend routes.

### Example: Modifying `UploadMarks.jsx`
```javascript
import React, { useState, useEffect } from "react";
import axios from "axios"; // or your custom fetch wrapper

export default function UploadMarks({ onNavigate }) {
  const [marks, setMarks] = useState([]); // Start empty
  const [selectedSubject, setSelectedSubject] = useState("");
  
  // 1. Fetch Students when subject changes
  useEffect(() => {
    if (selectedSubject) {
      axios.get(`/api/professor/students-for-marks?courseId=${selectedSubject}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => setMarks(res.data.data))
      .catch(err => console.error(err));
    }
  }, [selectedSubject]);

  // 2. Submit Marks to Backend
  const handleSaveMarks = async () => {
    try {
      await axios.post('/api/professor/marks', {
        courseId: selectedSubject,
        marks: marks
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert("Marks saved successfully!");
    } catch (err) {
      alert("Failed to save marks.");
    }
  };

  // ... rest of your render logic ...
  // Change the save button to trigger handleSaveMarks:
  // <button className="save-btn" onClick={handleSaveMarks}>Save Marks</button>
}
```

## Summary of Action Plan
To completely build this out, you will:
1. Define the SQL tables via Sequelize models.
2. Run database migrations to create the tables.
3. Update `professorController.js` to query the database instead of returning static JSON.
4. Set up the Express routes.
5. In every Professor frontend page, swap the hardcoded arrays with `useEffect` Axios calls.
