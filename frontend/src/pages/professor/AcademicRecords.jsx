import React, { useState, useEffect } from 'react';
import './ProfessorDashboard.css';
import { Search, Bell, ChevronDown, ChevronUp, BookOpen, Upload, GraduationCap, Bot, Users, ClipboardList, Clock, Download, MoveVertical as MoreVertical, Settings, Circle as HelpCircle, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

function Sidebar({ onNavigate }) {
  const [learningOpen, setLearningOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <aside className="sidebar">
      <h1>NAME</h1>



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

export default function AcademicRecords({ onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [batch, setBatch] = useState("All Batches");
  const [department, setDepartment] = useState("All Departments");
  const [semester, setSemester] = useState("All Semesters");
  
  useEffect(() => {
    fetchRecords();
  }, [batch, department, semester]);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (batch !== "All Batches") params.append('batch', batch);
      if (department !== "All Departments") params.append('department', department);
      if (semester !== "All Semesters") params.append('semester', semester);
      
      const res = await window.api?.getProfessorAcademicRecords?.(`?${params.toString()}`) || await import('../../services/api').then(m => m.default.getProfessorAcademicRecords(`?${params.toString()}`));
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <h3 className="section-heading">Overview</h3>

          <div className="overview-grid academic-overview">
            <OverviewBox icon={<BookOpen />} title="Total Students" value={data?.stats?.totalStudents || 0} color="#0957c4" />
            <OverviewBox icon={<Users />} title="Total Courses" value={data?.stats?.totalCourses || 0} color="#7d35cf" />
            <OverviewBox icon={<ClipboardList />} title="Marks Submitted" value={data?.stats?.marksSubmitted || 0} color="#2f9b5c" />
            <OverviewBox icon={<Clock />} title="Pending Submissions" value={data?.stats?.pendingSubmissions || 0} color="#f26a12" />
          </div>

          <div className="filter-box">
            <div className="filter-field">
              <label>Select Batch</label>
              <select value={batch} onChange={e => setBatch(e.target.value)}>
                <option>All Batches</option>
                <option>2024-2028</option>
                <option>2023-2027</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Select Department</label>
              <select value={department} onChange={e => setDepartment(e.target.value)}>
                <option>All Departments</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Electronics</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Select Semester</label>
              <select value={semester} onChange={e => setSemester(e.target.value)}>
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
      {loading ? (
        <tr>
          <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Loading...</td>
        </tr>
      ) : data?.students && data.students.length > 0 ? (
        data.students.map((row, index) => (
          <tr key={index}>
            <td>{row.enrollment_no || row.id}</td>
            <td>{row.name || row.User?.name}</td>
            <td>{row.batch || row.batch_year}</td>
            <td>{row.department || row.dept}</td>
            <td>{row.semester || row.current_semester}</td>
            <td className="cgpa-col">{row.cgpa || '-'}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>No student records found.</td>
        </tr>
      )}
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
