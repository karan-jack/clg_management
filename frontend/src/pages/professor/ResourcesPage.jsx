import React, { useState } from "react";
import "./ProfessorDashboard.css";
import { Search, Bell, ChevronDown, ChevronUp, BookOpen, Upload, GraduationCap, Bot, Settings, Circle as HelpCircle, User, LogOut, Users, Plus, Pencil, Trash2, Save, Info, FileText } from "lucide-react";

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

      <button onClick={() => onNavigate("upload-marks")} className="side-item">
        <Upload size={23} />
        Upload Marks
      </button>

      <button className="side-item menu-button" onClick={() => setLearningOpen(!learningOpen)}>
        <span>
          <GraduationCap size={23} /> Learning
        </span>
        {learningOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {learningOpen && (
        <div className="sub-menu">
          <button onClick={() => onNavigate("assigned-courses")}>Assigned Courses</button>
          <button onClick={() => onNavigate("modules")}>Modules</button>
          <button onClick={() => onNavigate("resources")} className="active-sub-side">
            Resources
          </button>
          <button onClick={() => onNavigate("quizzes")}>Quizzes</button>
        </div>
      )}

      <button className="side-item menu-button" onClick={() => setAiOpen(!aiOpen)}>
        <span>
          <Bot size={23} /> AI Tools
        </span>
        {aiOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {aiOpen && (
        <div className="sub-menu">
          <button onClick={() => onNavigate("quiz-generator")}>Quiz Generator</button>
          <button onClick={() => onNavigate("assignment-generator")}>
            Assignment Generator
          </button>
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
      <h2>RESOURCES</h2>

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

const resources = [
  [1, "DSA Previous Year Questions (2023).pdf", "PYQ", "12 May 2024", "Shubhabrata B.", "pdf"],
  [2, "DSA Previous Year Questions (2022).pdf", "PYQ", "12 May 2024", "Shubhabrata B.", "pdf"],
  [3, "Data Structures - Study Notes.pdf", "Notes", "05 May 2024", "Shubhabrata B.", "pdf"],
  [4, "Important Topics & Suggestions.pdf", "Suggestions", "05 May 2024", "Shubhabrata B.", "pdf"],
  [5, "Linked List - Summary.docx", "Notes", "28 Apr 2024", "Shubhabrata B.", "docx"],
  [6, "DSA Previous Year Questions (2021).pdf", "PYQ", "20 Apr 2024", "Shubhabrata B.", "pdf"],
  [7, "Stack and Queue - Study Material.pdf", "Notes", "15 Apr 2024", "Shubhabrata B.", "pdf"],
  [8, "Graph - Important Questions.pdf", "Suggestions", "10 Apr 2024", "Shubhabrata B.", "pdf"],
  [9, "Data Structures - Revision Guide.pptx", "Notes", "02 Apr 2024", "Shubhabrata B.", "pptx"],
];

function typeClass(type) {
  if (type === "PYQ") return "type-pyq";
  if (type === "Suggestions") return "type-suggestion";
  return "type-notes";
}

function fileClass(fileType) {
  if (fileType === "docx") return "file-doc";
  if (fileType === "pptx") return "file-ppt";
  return "file-pdf";
}

export default function ResourcesPage({ onNavigate }) {
  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <div className="resources-course-box">
            <div className="resources-course-left">
              <div className="resources-course-icon">
                <BookOpen size={34} />
              </div>

              <div className="resources-course-info">
                <h3>Data Structures</h3>
                <p>
                  Batch: 2024-2028
                  <span>|</span>
                  Semester: 3
                </p>
              </div>
            </div>

            <div className="resources-stats">
              <div className="resources-stat-card">
                <Users size={28} />
                <div>
                  <p>Students Enrolled</p>
                  <h4>120</h4>
                </div>
              </div>

              <div className="resources-stat-card">
                <BookOpen size={28} />
                <div>
                  <p>Total Resources</p>
                  <h4>18</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="resources-panel">
            <div className="resources-panel-header">
              <div>
                <h3>Course Resources</h3>
                <p>
                  Upload and manage resources such as PYQs, study materials,
                  notes, suggestions and more.
                </p>
              </div>

              <button className="add-resource-btn">
                <Plus size={18} />
                Add Resource
              </button>
            </div>

            <table className="resources-table">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th></th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Uploaded By</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {resources.map((item) => (
                  <tr key={item[0]}>
                    <td>{item[0]}</td>
                    <td>
                      <span className={`file-badge ${fileClass(item[5])}`}>
                        <FileText size={15} />
                      </span>
                    </td>
                    <td>{item[1]}</td>
                    <td>
                      <span className={`resource-type ${typeClass(item[2])}`}>
                        {item[2]}
                      </span>
                    </td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                    <td>
                      <div className="resource-action-buttons">
                        <button className="resource-action-btn edit-btn">
                          <Pencil size={16} />
                        </button>
                        <button className="resource-action-btn save-module-btn">
                          <Save size={16} />
                        </button>
                        <button className="resource-action-btn delete-btn">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="resources-note">
              <Info size={18} />
              <p>
                <b>Note:</b> You can upload files up to 50MB. Supported formats:
                PDF, DOC, DOCX, PPT, PPTX, ZIP.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}