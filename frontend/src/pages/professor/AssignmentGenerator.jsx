import React, { useState } from "react";
import "./ProfessorDashboard.css";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  BookOpen,
  Upload,
  GraduationCap,
  Bot,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Sparkles,
  FileText,
  CircleHelp,
  Clock,
  UploadCloud,
  Eye,
  Trash2,
  Plus,
  RefreshCw,
  Pencil,
  Save,
  List,
  Download,
  Copy,
  Info,
} from "lucide-react";

function Sidebar({ onNavigate }) {
  const [learningOpen, setLearningOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <aside className="sidebar">
      <h1>NAME</h1>



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
          <button onClick={() => onNavigate("quiz-subject-select")}>
            Quiz Generator
          </button>
          <button onClick={() => onNavigate("assignment-subject-select")} className="active-sub-side">
            Assignment Generator
          </button>
          <button onClick={() => onNavigate("summary-subject-select")}>
            Summary Generator
          </button>
        </div>
      )}

      <div className="help-card quiz-help-card">
        <CircleHelp size={24} />
        <h4>Need Help?</h4>
        <p>Generate accurate assignments faster with AI.</p>
        <button>View Guide</button>
      </div>
    </aside>
  );
}

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="topbar">
      <h2>ASSIGNMENT GENERATOR</h2>

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

function StatCard({ icon, title, value, link }) {
  return (
    <div className="quiz-gen-stat">
      {icon}
      <div>
        <p>{title}</p>
        <h4>{value}</h4>
        <button>{link}</button>
      </div>
    </div>
  );
}

export default function AssignmentGenerator({ onNavigate }) {
  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <div className="quiz-gen-breadcrumb">
            <span>AI Tools</span>
            <ChevronRight size={16} />
            <span className="active">Assignment Generator</span>
          </div>

          <div className="quiz-gen-course-box">
            <div className="quiz-gen-course-left">
              <div className="quiz-gen-course-icon">
                <Sparkles size={32} />
              </div>

              <div>
                <h3>Data Structures</h3>
                <p>Batch: 2024-2028 <span>|</span> Semester: 3</p>
              </div>
            </div>

            <div className="quiz-gen-stats assignment-stats">
              <StatCard icon={<BookOpen />} title="Study Materials" value="7" link="View Materials" />
              <StatCard icon={<FileText />} title="Assignments Generated" value="18" link="View Assignments" />
              <StatCard icon={<FileText />} title="Questions Generated" value="245" link="View Questions" />
              <StatCard icon={<Clock />} title="Last Generated" value="20 May 2024" link="View History" />
            </div>
          </div>

          <div className="quiz-gen-grid">
            <div className="quiz-gen-panel">
              <h3>Add Study Materials <Info size={15} /></h3>
              <p>Add files and notes to help AI understand the content and generate relevant assignments.</p>

              <div className="upload-drop-box">
                <UploadCloud size={26} />
                <h4>Drag & drop files here</h4>
                <span>or</span>
                <button>Upload Files</button>
              </div>

              <small>Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT (Max size: 50MB)</small>

              <div className="materials-head">
                <h4>Uploaded Materials (7)</h4>
                <button>View All</button>
              </div>

              {[
                ["Data Structures - Complete Notes.pdf", "2.4 MB • Uploaded on 18 May 2024"],
                ["Arrays & Linked Lists - Study Material.pdf", "1.8 MB • Uploaded on 16 May 2024"],
                ["Important Topics - Data Structures.pptx", "3.6 MB • Uploaded on 15 May 2024"],
              ].map((file) => (
                <div className="material-row" key={file[0]}>
                  <FileText size={22} />
                  <div>
                    <h5>{file[0]}</h5>
                    <p>{file[1]}</p>
                  </div>
                  <button><Eye size={15} /></button>
                  <button><Trash2 size={15} /></button>
                </div>
              ))}

              <button className="outline-purple-btn">
                <Plus size={17} />
                Add More Materials
              </button>
            </div>

            <div className="quiz-gen-panel">
              <h3>Configure Assignment</h3>

              <div className="form-two">
                <label>
                  Assignment Type
                  <select>
                    <option>Homework</option>
                    <option>Classwork</option>
                    <option>Practice Set</option>
                  </select>
                </label>

                <label>
                  Topic / Module
                  <select>
                    <option>Select Topic</option>
                    <option>Arrays</option>
                    <option>Linked Lists</option>
                  </select>
                </label>
              </div>

              <h4 className="form-title">Assignment Format</h4>

              <div className="check-row assignment-check-row">
                <label><input type="checkbox" defaultChecked /> Theory Questions</label>
                <label><input type="checkbox" defaultChecked /> Problem Solving</label>
                <label><input type="checkbox" defaultChecked /> Case Study</label>
                <label><input type="checkbox" defaultChecked /> Programming</label>
              </div>

              <div className="form-three">
                <label>
                  Difficulty Level
                  <select><option>Medium</option></select>
                </label>
                <label>
                  No. of Questions
                  <select><option>10</option></select>
                </label>
                <label>
                  Total Marks
                  <select><option>20 Marks</option></select>
                </label>
              </div>

              <label className="full-label">
                Bloom's Taxonomy (Optional)
                <select><option>Select Level</option></select>
              </label>

              <label className="full-label">
                Additional Instructions (Optional)
                <textarea placeholder="E.g. Focus on problem solving and application based questions."></textarea>
              </label>

              <button className="generate-quiz-btn">
                <Sparkles size={17} />
                Generate Assignment
              </button>
            </div>

            <div className="quiz-gen-panel">
              <div className="preview-head">
                <h3>Preview Assignment</h3>
                <button><RefreshCw size={15} /> Regenerate</button>
              </div>

              {[
                ["Explain the difference between Stack and Queue with examples.", "2 Marks"],
                ["Write a program to implement a circular linked list.", "4 Marks"],
                ["Solve the following: Convert the infix expression A + B * (C - D) / E to postfix.", "4 Marks"],
                ["Design a stack using linked list. Write push() and pop() operations.", "5 Marks"],
              ].map((question, index) => (
                <div className="assignment-question-card" key={question[0]}>
                  <div className="question-number">{index + 1}</div>
                  <p>{question[0]}</p>
                  <span>{question[1]}</span>
                </div>
              ))}

              <div className="assignment-question-card">
                <div className="question-number">5</div>
                <div>
                  <p>Answer any two of the following:</p>
                  <ul>
                    <li>Applications of Trees</li>
                    <li>Types of Sorting Algorithms</li>
                    <li>Graph Traversal Techniques</li>
                  </ul>
                </div>
                <span>5 Marks</span>
              </div>

              <div className="preview-actions">
                <button>View All Questions</button>
                <button className="outline-purple-btn"><Pencil size={16} /> Edit Questions</button>
                <button className="solid-purple-btn"><Save size={16} /> Save Assignment</button>
              </div>
            </div>
          </div>

          <div className="saved-quiz-panel">
            <div className="saved-quiz-head">
              <h3>Saved Assignments</h3>
              <button><List size={16} /> View All Assignments</button>
            </div>

            <table className="saved-quiz-table">
              <thead>
                <tr>
                  <th>Assignment Title</th>
                  <th>Topic / Module</th>
                  <th>Type</th>
                  <th>Questions</th>
                  <th>Marks</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["Arrays & Linked Lists - Assignment 1", "Arrays & Linked Lists", "Homework", 10, 20, "18 May 2024"],
                  ["Stacks & Queues - Assignment 2", "Stacks & Queues", "Homework", 15, 30, "12 May 2024"],
                  ["Trees - Assignment 3", "Trees", "Homework", 10, 20, "08 May 2024"],
                ].map((item) => (
                  <tr key={item[0]}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                    <td>{item[5]}</td>
                    <td>
                      <div className="saved-actions">
                        <button><Eye size={15} /></button>
                        <button><Download size={15} /></button>
                        <button><Copy size={15} /></button>
                        <button><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="quiz-gen-note">
              <Info size={18} />
              <p>AI generates assignments based on the study materials, topic and settings you provide. Please review before publishing.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
