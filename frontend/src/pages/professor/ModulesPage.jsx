import React, { useState } from "react";
import "./ProfessorDashboard.css";
import { Search, Bell, ChevronDown, ChevronUp, ChevronRight, BookOpen, Upload, GraduationCap, Bot, Settings, Circle as HelpCircle, User, LogOut, Code as Code2, Users, BookOpenCheck, CloudUpload as UploadCloud, Plus, Pencil, Trash2, Save, Info } from "lucide-react";

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
          <button onClick={() => onNavigate("assigned-courses")} className="active-sub-side">
            Assigned Courses
          </button>
          <button onClick={() => onNavigate("modules")}>Modules</button>
          <button onClick={() => onNavigate("resources")}>Resources</button>
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
      <h2>MODULES - DATA STRUCTURES</h2>

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

const modules = [
  [1, "Introduction to Data Structures", "Overview of data structures and their types.", "Published"],
  [2, "Arrays", "Concept of arrays, operations and applications.", "Published"],
  [3, "Linked Lists", "Singly, doubly and circular linked lists.", "Published"],
  [4, "Stacks", "Stack operations and implementations.", "Published"],
  [5, "Queues", "Queue operations and types.", "Draft"],
  [6, "Trees", "Introduction to trees and binary trees.", "Draft"],
  [7, "Graphs", "Graph representations and traversals.", "Draft"],
  [8, "Searching & Sorting", "Basic searching and sorting algorithms.", "Draft"],
];

export default function ModulesPage({ onNavigate }) {
  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <div className="modules-breadcrumb">
            <button onClick={() => onNavigate("assigned-courses")}>Assigned Courses</button>
            <ChevronRight size={16} />
            <span>Data Structures</span>
            <ChevronRight size={16} />
            <span className="active">Modules</span>
          </div>

          <div className="modules-course-box">
            <div className="modules-course-left">
              <div className="modules-course-icon">
                <Code2 size={32} />
              </div>

              <div className="modules-course-info">
                <h3>Data Structures</h3>
                <p>
                  Batch: 2024-2028 <span>|</span> Semester: 3
                </p>
              </div>
            </div>

            <div className="modules-course-stats">
              <div className="modules-stat-card">
                <Users size={28} />
                <div>
                  <p>Students Enrolled</p>
                  <h4>120</h4>
                </div>
              </div>

              <div className="modules-stat-card">
                <BookOpenCheck size={28} />
                <div>
                  <p>Total Modules</p>
                  <h4>8</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="modules-panel">
            <div className="modules-panel-header">
              <div>
                <h3>Course Modules</h3>
                <p>Manage and organize the learning modules for this course.</p>
              </div>

              <div className="modules-actions">
                <button className="upload-assignment-btn">
                  <UploadCloud size={17} />
                  Upload Assignments
                </button>

                <button className="add-module-btn">
                  <Plus size={18} />
                  Add New Module
                </button>
              </div>
            </div>

            <table className="modules-table">
              <thead>
                <tr>
                  <th>Module No.</th>
                  <th>Module Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {modules.map((item) => (
                  <tr key={item[0]}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>
                      <span className={item[3] === "Published" ? "status-published" : "status-draft"}>
                        {item[3]}
                      </span>
                    </td>
                    <td>
                      <div className="module-action-buttons">
                        <button className="module-action-btn edit-btn">
                          <Pencil size={16} />
                        </button>
                        <button className="module-action-btn delete-btn">
                          <Trash2 size={16} />
                        </button>
                        <button className="module-action-btn save-module-btn">
                          <Save size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modules-note">
              <Info size={18} />
              <p>
                <b>Note:</b> Click on the edit icon to modify module details. Don't forget to save your changes.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}