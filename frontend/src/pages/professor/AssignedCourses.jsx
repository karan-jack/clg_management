import React, { useState } from 'react';
import './ProfessorDashboard.css';
import { Search, Bell, ChevronDown, ChevronUp, BookOpen, Upload, GraduationCap, Bot, Settings, Circle as HelpCircle, User, LogOut, MoveVertical as MoreVertical, ArrowRight, Code as Code2, BrainCircuit, Database, Monitor, Info } from 'lucide-react';

function Sidebar({ onNavigate }) {
  const [learningOpen, setLearningOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <aside className="sidebar">
      <h1>NAME</h1>

      <div className="search-box">
        <input placeholder="Search" />
        <Search size={20} />
      </div>

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
          <button onClick={() => onNavigate('quiz-generator')}>
            Quiz Generator
          </button>
          <button onClick={() => onNavigate('assignment-generator')}>
            Assignment Generator
          </button>
          <button onClick={() => onNavigate('summary-generator')}>
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
  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <h3 className="section-heading">Your Assigned Courses</h3>

          <div className="course-grid">
            <CourseCard
              icon={<Code2 />}
              title="Data Structures"
              batch="2024-2028"
              semester="3"
              modules="8"
              students="120"
              color="#7b35d4"
              bg="#f0e7fb"
              onNavigate={onNavigate}
            />

            <CourseCard
              icon={<BrainCircuit />}
              title="Algorithms"
              batch="2024-2028"
              semester="4"
              modules="7"
              students="115"
              color="#1267c5"
              bg="#eaf4fb"
              onNavigate={onNavigate}
            />

            <CourseCard
              icon={<Database />}
              title="Database Systems"
              batch="2024-2028"
              semester="5"
              modules="6"
              students="110"
              color="#27965b"
              bg="#edf5ea"
              onNavigate={onNavigate}
            />

            <CourseCard
              icon={<Monitor />}
              title="Operating Systems"
              batch="2023-2027"
              semester="6"
              modules="7"
              students="105"
              color="#f15a16"
              bg="#fff0e8"
              onNavigate={onNavigate}
            />
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
