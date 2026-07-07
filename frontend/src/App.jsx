import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Landing Page
import LandingPage from './pages/landing/LandingPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAcademicRecords from './pages/student/academics/AcademicRecords';
import BrowseCourses from './pages/student/courses/BrowseCourses';
import LearningPaths from './pages/student/courses/LearningPaths';
import MyLearning from './pages/student/LearningPaths/MyLearning';
import Leaderboard from './pages/student/Gamification/Leaderboard';
import Badges from './pages/student/Gamification/Badges';
import Certificates from './pages/student/portfolio/Certificates';
import Publications from './pages/student/portfolio/Publications';
import ResumeGenerator from './pages/student/tools/ResumeGenerator';

// Professor Pages
import ProfessorDashboard from './pages/professor/ProfessorDashboard';
import ProfessorAcademicRecords from './pages/professor/AcademicRecords';
import UploadMarks from './pages/professor/UploadMarks';
import AssignedCourses from './pages/professor/AssignedCourses';
import ResourcesPage from './pages/professor/ResourcesPage';
import ModulesPage from './pages/professor/ModulesPage';

// Helper component to adapt the legacy `setPage` routing to react-router
function PageAdapter({ component: Component, role, pageName }) {
  const navigate = useNavigate();
  const setPage = (page) => {
    // Navigate to the correct route based on the page string
    if (page === 'dashboard') {
      navigate(`/${role}`);
    } else {
      navigate(`/${role}/${page}`);
    }
  };

  return <Component currentPage={pageName} setPage={setPage} onNavigate={setPage} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<PageAdapter component={StudentDashboard} role="student" pageName="dashboard" />} />
        <Route path="/student/academic-records" element={<PageAdapter component={StudentAcademicRecords} role="student" pageName="academic-records" />} />
        <Route path="/student/browse-courses" element={<PageAdapter component={BrowseCourses} role="student" pageName="browse-courses" />} />
        <Route path="/student/learning-paths" element={<PageAdapter component={LearningPaths} role="student" pageName="learning-paths" />} />
        <Route path="/student/my-learning" element={<PageAdapter component={MyLearning} role="student" pageName="my-learning" />} />
        <Route path="/student/leaderboard" element={<PageAdapter component={Leaderboard} role="student" pageName="leaderboard" />} />
        <Route path="/student/badges" element={<PageAdapter component={Badges} role="student" pageName="badges" />} />
        <Route path="/student/certificates" element={<PageAdapter component={Certificates} role="student" pageName="certificates" />} />
        <Route path="/student/publications" element={<PageAdapter component={Publications} role="student" pageName="publications" />} />
        <Route path="/student/resume-generator" element={<PageAdapter component={ResumeGenerator} role="student" pageName="resume-generator" />} />
        {/* Professor Routes */}
        <Route path="/professor" element={<PageAdapter component={ProfessorDashboard} role="professor" pageName="dashboard" />} />
        <Route path="/professor/academic-records" element={<PageAdapter component={ProfessorAcademicRecords} role="professor" pageName="academic-records" />} />
        <Route path="/professor/upload-marks" element={<PageAdapter component={UploadMarks} role="professor" pageName="upload-marks" />} />
        <Route path="/professor/assigned-courses" element={<PageAdapter component={AssignedCourses} role="professor" pageName="assigned-courses" />} />
        <Route path="/professor/resources" element={<PageAdapter component={ResourcesPage} role="professor" pageName="resources" />} />
        <Route path="/professor/modules" element={<PageAdapter component={ModulesPage} role="professor" pageName="modules" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<PageAdapter component={AdminDashboard} role="admin" pageName="dashboard" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
