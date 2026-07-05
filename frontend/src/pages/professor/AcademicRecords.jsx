import React, { useState } from 'react';
import './ProfessorDashboard.css';
import { Search, Bell, ChevronDown, ChevronUp, BookOpen, Upload, GraduationCap, Bot, Users, ClipboardList, Clock, Download, MoveVertical as MoreVertical, Settings, Circle as HelpCircle, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

function Sidebar({ onNavigate }) {
  const [learningOpen, setLearningOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <aside className="sidebar">
      <h1>NAME</h1>

      <div className="search-box">
        <input placeholder="Search" />
        <Search size={20} />
      </div>

      <button
        onClick={() => onNavigate('academic-records')}
        className="side-item active-side"
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
          <button onClick={() => onNavigate('assigned-courses')}>
            Assigned Courses
          </button>
          <button onClick={() => onNavigate('modules')}>Modules</button>
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
      <h2>ACADEMIC RECORDS</h2>

      <div className="top-actions">
        <div className="bell">
          <Bell size={24} />
          <span>3</span>
        </div>

        <div className="avatar">SB</div>

        <div className="welcome-text">
          <p>Welcome,</p>
          <h4>Shubhabrata B.</h4>
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
                <h4>Shubhabrata B.</h4>
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

function OverviewBox({ icon, title, value, color }) {
  return (
    <div className="overview-card">
      <div className="overview-icon" style={{ background: color }}>
        {icon}
      </div>
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
}

const studentRecords = [
  ["ENR2021001", "Aarav Sharma", "2024-2028", "Electronics", "Semester 3", "8.72"],
  ["ENR2021002", "Diya Patel", "2024-2028", "Electronics", "Semester 3", "8.45"],
  ["ENR2021003", "Rohan Verma", "2024-2028", "Electronics", "Semester 3", "7.98"],
  ["ENR2021004", "Sneha Iyer", "2024-2028", "Electronics", "Semester 3", "9.12"],
  ["ENR2021005", "Karan Mehta", "2024-2028", "Electronics", "Semester 3", "8.09"],
  ["ENR2021006", "Ananya Singh", "2024-2028", "Electronics", "Semester 3", "8.66"],
  ["ENR2021007", "Manav Gupta", "2024-2028", "Electronics", "Semester 3", "7.75"],
  ["ENR2021008", "Pooja Nair", "2024-2028", "Electronics", "Semester 3", "9.28"],
  ["ENR2021009", "Aditya Malhotra", "2024-2028", "Electronics", "Semester 3", "8.31"],
  ["ENR2021010", "Ishita Roy", "2024-2028", "Electronics", "Semester 3", "8.94"],
];

export default function AcademicRecords({ onNavigate }) {
  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <h3 className="section-heading">Overview</h3>

          <div className="overview-grid academic-overview">
          <OverviewBox
  icon={<BookOpen />}
  title="Total Students"
  value="1,248"
  color="#0957c4"
/>
<OverviewBox
  icon={<Users />}
  title="Total Courses"
  value="42"
  color="#7d35cf"
/>
<OverviewBox
  icon={<ClipboardList />}
  title="Marks Submitted"
  value="35,820"
  color="#2f9b5c"
/>
<OverviewBox
  icon={<Clock />}
  title="Pending Submissions"
  value="2,145"
  color="#f26a12"
/>
          </div>

          <div className="filter-box">
  <div className="filter-field">
    <label>Select Batch</label>
    <select>
      <option>All Batches</option>
      <option>2024-2028</option>
      <option>2023-2027</option>
    </select>
  </div>

  <div className="filter-field">
    <label>Select Department</label>
    <select>
      <option>All Departments</option>
      <option>Computer Science</option>
      <option>Information Technology</option>
      <option>Electronics</option>
    </select>
  </div>

  <div className="filter-field">
    <label>Select Semester</label>
    <select>
      <option>All Semesters</option>
      <option>Semester 3</option>
      <option>Semester 4</option>
      <option>Semester 5</option>
    </select>
  </div>

  <button className="export-btn">
    <Download size={17} />
    Export
  </button>
</div>

<h3 className="section-heading">Student Records</h3>

<div className="records-table-wrap">
  <table className="records-table student-records-table">
    <thead>
      <tr>
        <th>Enrollment No.</th>
        <th>Name</th>
        <th>Batch</th>
        <th>Department</th>
        <th>Semester</th>
        <th>CGPA</th>
      </tr>
    </thead>

    <tbody>
      {studentRecords.map((student) => (
        <tr key={student[0]}>
          <td>{student[0]}</td>
          <td>{student[1]}</td>
          <td>{student[2]}</td>
          <td>{student[3]}</td>
          <td>{student[4]}</td>
          <td>{student[5]}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="table-footer">
    <span>Rows per page:</span>
    <select>
      <option>10</option>
    </select>
    <span>1-10 of 1,248</span>
    <button>
      <ChevronLeft size={18} />
    </button>
    <button>
      <ChevronRight size={18} />
    </button>
  </div>
</div>
</section>
</main>
</div>
);
}