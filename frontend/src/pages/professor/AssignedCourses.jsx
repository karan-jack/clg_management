import React, { useState, useEffect } from 'react';
import './ProfessorDashboard.css';
import { Search, Bell, ChevronDown, ChevronUp, BookOpen, Upload, GraduationCap, Bot, Settings, Circle as HelpCircle, User, LogOut, MoveVertical as MoreVertical, ArrowRight, Code as Code2, BrainCircuit, Database, Monitor, Info } from 'lucide-react';
import api from "../../services/api";
import { Loader2 } from "lucide-react";

function Sidebar({ onNavigate }) {
  const [learningOpen, setLearningOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <aside className="sidebar">
      <h1>NAME</h1>



      <button
        onClick={() => onNavigate('academic-records')}
        className="side-item"
      >
        <BookOpen size={23} />
        Academic Records
      </button>

      <button onClick={() => onNavigate('upload-marks')} className="side-item">
        <Upload size={23} />
        Upload Marks
      </button>

      <button
        className="side-item menu-button"
        onClick={() => setLearningOpen(!learningOpen)}
      >
        <span>
          <GraduationCap size={23} /> Learning
        </span>
        {learningOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {learningOpen && (
        <div className="sub-menu">
          <button
            onClick={() => onNavigate('assigned-courses')}
            className="active-sub-side"
          >
            Assigned Courses
          </button>
          <button onClick={() => onNavigate('resources')}>Resources</button>
          <button onClick={() => onNavigate('quizzes')}>Quizzes</button>
        </div>
      )}

      <button
        className="side-item menu-button"
        onClick={() => setAiOpen(!aiOpen)}
      >
        <span>
          <Bot size={23} /> AI Tools
        </span>
        {aiOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {aiOpen && (
        <div className="sub-menu">
          <button onClick={() => onNavigate("quiz-subject-select")}>Quiz Generator</button>
<button onClick={() => onNavigate("assignment-subject-select")}>
  Assignment Generator
</button>
<button onClick={() => onNavigate("summary-subject-select")}>
  Summary Generator
</button>
        </div>
      )}
    </aside>
  );
}

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="topbar">
      <h2>ASSIGNED COURSES</h2>

      <div className="top-actions">
        <div className="bell">
          <Bell size={24} />
          <span>3</span>
        </div>

        <div className="avatar">SB</div>

        <div className="welcome-text">
          <p>Welcome,</p>
          <h4>Shubhjabrata B.</h4>
        </div>

        <button
          className="profile-toggle"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          {profileOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </button>

        {profileOpen && (
          <div className="profile-menu">
            <div className="profile-head">
              <div className="avatar">SB</div>
              <div>
                <p>Welcome,</p>
                <h4>Shubhjabrata B.</h4>
              </div>
            </div>

            <button>
              <User size={18} /> Profile
            </button>
            <button>
              <Settings size={18} /> Settings
            </button>
            <button>
              <HelpCircle size={18} /> Help & Support
            </button>
            <hr />
            <button>
              <LogOut size={18} /> Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function CourseCard({
  icon,
  title,
  batch,
  semester,
  modules,
  students,
  color,
  bg,
  onNavigate,
}) {
  return (
    <div className="course-card" style={{ background: bg }}>
      <div className="course-card-top">
        <div className="course-icon" style={{ background: color }}>
          {icon}
        </div>

        <div className="course-title-area">
          <h4>{title}</h4>
          <p>Batch: {batch}</p>
          <p>Semester: {semester}</p>
        </div>

        <MoreVertical size={20} />
      </div>

      <div className="course-divider"></div>

      <div className="course-stats">
        <div>
          <p>Modules</p>
          <h3 style={{ color }}>{modules}</h3>
        </div>

        <div>
          <p>Students Enrolled</p>
          <h3 style={{ color }}>{students}</h3>
        </div>
      </div>

      <button
        className="view-course-btn"
        style={{ color, borderColor: color }}
        onClick={() => onNavigate('modules')}
      >
        View Course <ArrowRight size={17} />
      </button>
    </div>
  );
}

export default function AssignedCourses({ onNavigate }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.getProfessorCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIconAndColors = (index) => {
    const configs = [
      { icon: <Code2 />, color: "#7b35d4", bg: "#f0e7fb" },
      { icon: <BrainCircuit />, color: "#1267c5", bg: "#eaf4fb" },
      { icon: <Database />, color: "#27965b", bg: "#edf5ea" },
      { icon: <Monitor />, color: "#f15a16", bg: "#fff0e8" },
    ];
    return configs[index % configs.length];
  };

  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <h3 className="section-heading">Your Assigned Courses</h3>

          <div className="course-grid">
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', gridColumn: '1 / -1', padding: '40px' }}>
                <Loader2 className="animate-spin text-[#7b35d4]" size={32} />
              </div>
            ) : courses.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                No assigned courses found.
              </div>
            ) : courses.map((course, idx) => {
              const { icon, color, bg } = getIconAndColors(idx);
              return (
                <CourseCard
                  key={course.id}
                  icon={icon}
                  title={course.title}
                  batch={course.department || "General"}
                  semester={course.semester || "1"}
                  modules={course.modules_count || 0}
                  students={course.student_count || 0}
                  color={color}
                  bg={bg}
                  onNavigate={onNavigate}
                />
              );
            })}
          </div>

          <div className="manage-box">
            <div className="manage-icon">
              <Info size={24} />
            </div>

            <div>
              <h4>Manage Your Courses</h4>
              <p>
                Click on any course card to view and manage its modules, upload
                assignments, edit content, and more.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
