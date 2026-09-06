import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Landing Page & Auth
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';

// Admin Pages (Lazy loaded)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const StudentsManagement = lazy(() => import('./pages/admin/user management/StudentsManagement'));
const ProfessorsManagement = lazy(() => import('./pages/admin/user management/ProfessorsManagement'));
const AdminsManagement = lazy(() => import('./pages/admin/user management/AdminsManagement (2)'));
const StudentMaster = lazy(() => import('./pages/admin/academic management/StudentMaster'));
const BatchesManagement = lazy(() => import('./pages/admin/academic management/BatchesManagement'));
const SubjectsManagement = lazy(() => import('./pages/admin/academic management/SubjectsManagement'));
const CoursesManagement = lazy(() => import('./pages/admin/academic management/CoursesManagement'));
const LearningPathsManagement = lazy(() => import('./pages/admin/academic management/LearningPathsManagement'));
const AdminProfilePage = lazy(() => import('./pages/admin/AdminProfilePage'));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage'));

// Student Pages (Lazy loaded)
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const StudentAcademicRecords = lazy(() => import('./pages/student/academics/AcademicRecords'));
const BrowseCourses = lazy(() => import('./pages/student/courses/BrowseCourses'));
const LearningPaths = lazy(() => import('./pages/student/courses/LearningPaths'));
const MyLearning = lazy(() => import('./pages/student/LearningPaths/MyLearning'));
const Leaderboard = lazy(() => import('./pages/student/Gamification/Leaderboard'));
const Badges = lazy(() => import('./pages/student/Gamification/Badges'));
const Certificates = lazy(() => import('./pages/student/portfolio/Certificates'));
const Publications = lazy(() => import('./pages/student/portfolio/Publications'));
const ResumeGenerator = lazy(() => import('./pages/student/tools/ResumeGenerator'));

// Professor Pages (Lazy loaded)
const ProfessorDashboard = lazy(() => import('./pages/professor/ProfessorDashboard'));
const ProfessorAcademicRecords = lazy(() => import('./pages/professor/AcademicRecords'));
const UploadMarks = lazy(() => import('./pages/professor/UploadMarks'));
const AssignedCourses = lazy(() => import('./pages/professor/AssignedCourses'));
const ResourcesPage = lazy(() => import('./pages/professor/ResourcesPage'));
const ModulesPage = lazy(() => import('./pages/professor/ModulesPage'));
const QuizzesPage = lazy(() => import('./pages/professor/QuizzesPage'));
const QuizSubjectSelect = lazy(() => import('./pages/professor/QuizSubjectSelect'));
const QuizGenerator = lazy(() => import('./pages/professor/QuizGenerator'));
const AssignmentGenerator = lazy(() => import('./pages/professor/AssignmentGenerator'));

// Protected Route Wrapper
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  const role = parseInt(localStorage.getItem('role'), 10);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role 1 = admin, 2 = professor, 3 = student
  const roleMap = {
    'admin': 1,
    'professor': 2,
    'student': 3
  };

  if (role !== roleMap[allowedRole]) {
    // Redirect to their respective dashboard if they try to access wrong route
    if (role === 1) return <Navigate to="/admin" replace />;
    if (role === 2) return <Navigate to="/professor" replace />;
    if (role === 3) return <Navigate to="/student" replace />;
    return <Navigate to="/login" replace />; // Fallback if invalid role
  }

  return children;
}

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

function AdminPlaceholderPage({ title, description }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 32, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28, color: '#111827' }}>{title}</h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: 15 }}>{description}</p>
      </div>
    </div>
  );
}

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc' }}>
    <div style={{ color: '#0b1a30', fontSize: '1.2rem', fontWeight: 600 }}>Loading...</div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRole="student"><PageAdapter component={StudentDashboard} role="student" pageName="dashboard" /></ProtectedRoute>} />
          <Route path="/student/academic-records" element={<ProtectedRoute allowedRole="student"><PageAdapter component={StudentAcademicRecords} role="student" pageName="academic-records" /></ProtectedRoute>} />
          <Route path="/student/browse-courses" element={<ProtectedRoute allowedRole="student"><PageAdapter component={BrowseCourses} role="student" pageName="browse-courses" /></ProtectedRoute>} />
          <Route path="/student/learning-paths" element={<ProtectedRoute allowedRole="student"><PageAdapter component={LearningPaths} role="student" pageName="learning-paths" /></ProtectedRoute>} />
          <Route path="/student/my-learning" element={<ProtectedRoute allowedRole="student"><PageAdapter component={MyLearning} role="student" pageName="my-learning" /></ProtectedRoute>} />
          <Route path="/student/leaderboard" element={<ProtectedRoute allowedRole="student"><PageAdapter component={Leaderboard} role="student" pageName="leaderboard" /></ProtectedRoute>} />
          <Route path="/student/badges" element={<ProtectedRoute allowedRole="student"><PageAdapter component={Badges} role="student" pageName="badges" /></ProtectedRoute>} />
          <Route path="/student/certificates" element={<ProtectedRoute allowedRole="student"><PageAdapter component={Certificates} role="student" pageName="certificates" /></ProtectedRoute>} />
          <Route path="/student/publications" element={<ProtectedRoute allowedRole="student"><PageAdapter component={Publications} role="student" pageName="publications" /></ProtectedRoute>} />
          <Route path="/student/resume-generator" element={<ProtectedRoute allowedRole="student"><PageAdapter component={ResumeGenerator} role="student" pageName="resume-generator" /></ProtectedRoute>} />
          
          {/* Professor Routes */}
          <Route path="/professor" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={ProfessorDashboard} role="professor" pageName="dashboard" /></ProtectedRoute>} />
          <Route path="/professor/academic-records" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={ProfessorAcademicRecords} role="professor" pageName="academic-records" /></ProtectedRoute>} />
          <Route path="/professor/upload-marks" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={UploadMarks} role="professor" pageName="upload-marks" /></ProtectedRoute>} />
          <Route path="/professor/assigned-courses" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={AssignedCourses} role="professor" pageName="assigned-courses" /></ProtectedRoute>} />
          <Route path="/professor/resources" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={ResourcesPage} role="professor" pageName="resources" /></ProtectedRoute>} />
          <Route path="/professor/modules" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={ModulesPage} role="professor" pageName="modules" /></ProtectedRoute>} />
          <Route path="/professor/quizzes" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={QuizzesPage} role="professor" pageName="quizzes" /></ProtectedRoute>} />
          <Route path="/professor/quiz-subject-select" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={QuizSubjectSelect} role="professor" pageName="quiz-subject-select" /></ProtectedRoute>} />
          <Route path="/professor/quiz-generator" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={QuizGenerator} role="professor" pageName="quiz-generator" /></ProtectedRoute>} />
          <Route path="/professor/assignment-subject-select" element={<ProtectedRoute allowedRole="professor"><PageAdapter component={AssignmentGenerator} role="professor" pageName="assignment-subject-select" /></ProtectedRoute>} />
          <Route path="/professor/summary-subject-select" element={<ProtectedRoute allowedRole="professor"><AdminPlaceholderPage title="Summary Generator" description="Summary generation is coming soon." /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><PageAdapter component={AdminDashboard} role="admin" pageName="dashboard" /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute allowedRole="admin"><StudentsManagement /></ProtectedRoute>} />
          <Route path="/admin/professors" element={<ProtectedRoute allowedRole="admin"><ProfessorsManagement /></ProtectedRoute>} />
          <Route path="/admin/admins" element={<ProtectedRoute allowedRole="admin"><AdminsManagement /></ProtectedRoute>} />
          <Route path="/admin/student-master" element={<ProtectedRoute allowedRole="admin"><StudentMaster /></ProtectedRoute>} />
          <Route path="/admin/batches" element={<ProtectedRoute allowedRole="admin"><BatchesManagement /></ProtectedRoute>} />
          <Route path="/admin/subjects" element={<ProtectedRoute allowedRole="admin"><SubjectsManagement /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute allowedRole="admin"><CoursesManagement /></ProtectedRoute>} />
          <Route path="/admin/learning-paths" element={<ProtectedRoute allowedRole="admin"><LearningPathsManagement /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRole="admin"><AdminAnalyticsPage /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute allowedRole="admin"><AdminProfilePage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
