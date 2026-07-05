import React, { useState } from "react";
import "./ProfessorDashboard.css";
import { Search, Bell, ChevronDown, ChevronUp, BookOpen, Upload, GraduationCap, Bot, Settings, Circle as HelpCircle, User, LogOut, ListFilter as Filter, Save } from "lucide-react";

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

      <button onClick={() => onNavigate("academic-records")} className="side-item">
        <BookOpen size={23} />
        Academic Records
      </button>

      <button onClick={() => onNavigate("upload-marks")} className="side-item active-side">
        <Upload size={23} />
        Upload Marks
      </button>

      <button className="side-item menu-button" onClick={() => setLearningOpen(!learningOpen)}>
        <span><GraduationCap size={23} /> Learning</span>
        {learningOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {learningOpen && (
        <div className="sub-menu">
          <button onClick={() => onNavigate("assigned-courses")}>Assigned Courses</button>
          <button onClick={() => onNavigate("modules")}>Modules</button>
          <button onClick={() => onNavigate("resources")}>Resources</button>
          <button onClick={() => onNavigate("quizzes")}>Quizzes</button>
        </div>
      )}

      <button className="side-item menu-button" onClick={() => setAiOpen(!aiOpen)}>
        <span><Bot size={23} /> AI Tools</span>
        {aiOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {aiOpen && (
        <div className="sub-menu">
          <button onClick={() => onNavigate("quiz-generator")}>Quiz Generator</button>
          <button onClick={() => onNavigate("assignment-generator")}>Assignment Generator</button>
          <button onClick={() => onNavigate("summary-generator")}>Summary Generator</button>
        </div>
      )}
    </aside>
  );
}

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="topbar">
      <h2>UPLOAD MARKS</h2>

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

        <button className="profile-toggle" onClick={() => setProfileOpen(!profileOpen)}>
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

            <button><User size={18} /> Profile</button>
            <button><Settings size={18} /> Settings</button>
            <button><HelpCircle size={18} /> Help & Support</button>
            <hr />
            <button><LogOut size={18} /> Sign out</button>
          </div>
        )}
      </div>
    </header>
  );
}

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
  ["ENR2021010", "Ishita Roy", "2024-2028", "Electronics", "Semester 3", 41, 89],
];

export default function UploadMarks({ onNavigate }) {
  const [marks, setMarks] = useState(students);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectWarning, setSubjectWarning] = useState("");

  function updateMark(index, column, value) {
    if (!selectedSubject) {
      setSubjectWarning("Select your Subject");
      return;
    }
  
    const updated = [...marks];
    updated[index][column] = value;
    setMarks(updated);
  }
  function handleMarksClick() {
    if (!selectedSubject) {
      setSubjectWarning("Select your Subject");
    }
  }

  function resetMarks() {
    setMarks(students);
  }

  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <div className="filter-box upload-filter-box">
            <div className="filter-field">
              <label>Select Batch</label>
              <select>
                <option>All Batches</option>
                <option>2024-2028</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Select Department</label>
              <select>
                <option>All Departments</option>
                <option>Electronics</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Select Semester</label>
              <select>
                <option>All Semesters</option>
                <option>Semester 3</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Select Subject</label>
              <select
  value={selectedSubject}
  onChange={(event) => {
    setSelectedSubject(event.target.value);
    setSubjectWarning("");
  }}
>
  <option value="">Select Subject</option>
  <option value="Data Structures">Data Structures</option>
  <option value="Algorithms">Algorithms</option>
  <option value="Database Systems">Database Systems</option>
</select>
            </div>

            <button className="export-btn">
              <Filter size={17} />
              Clear Filters
            </button>
          </div>
          {subjectWarning && (
  <div className="subject-warning">
    {subjectWarning}
  </div>
)}
          <h3 className="section-heading">Student Marks Entry</h3>

          <div className="records-table-wrap marks-table-wrap">
            <table className="records-table marks-table">
              <thead>
              <tr>
  <th>Enrollment No.</th>
  <th>Name</th>
  <th>Batch</th>
  <th>Department</th>
  <th>Semester</th>
  <th>Marks (Lab) / Max. (50)</th>
  <th>Marks (Theory) / Max. (100)</th>
</tr>
              </thead>

              <tbody>
                {marks.map((student, index) => (
                  <tr key={student[0]}>
                  <td>{student[0]}</td>
                  <td>{student[1]}</td>
                  <td>{student[2]}</td>
                  <td>{student[3]}</td>
                  <td>{student[4]}</td>
                  <td>
                    <input
                      type="number"
                      value={selectedSubject ? student[5] : ""}
                      placeholder={selectedSubject ? "" : "Select your Subject"}
                      min="0"
                      max="50"
                      onClick={handleMarksClick}
                      onChange={(event) => updateMark(index, 5, event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={selectedSubject ? student[6] : ""}
                      placeholder={selectedSubject ? "" : "Select your Subject"}
                      min="0"
                      max="100"
                      onClick={handleMarksClick}
                      onChange={(event) => updateMark(index, 6, event.target.value)}
                    />
                  </td>
                </tr>
                ))}
              </tbody>
            </table>

            <div className="marks-footer">
              <p>Note: Please ensure all marks are entered correctly before saving.</p>

              <div>
                <button className="reset-btn" onClick={resetMarks}>
                  Reset
                </button>

                <button className="save-btn">
                  <Save size={18} />
                  Save Marks
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}