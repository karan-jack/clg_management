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
          <button onClick={() => onNavigate("quiz-subject-select")} className="active-sub-side">
            Quiz Generator
          </button>
          <button onClick={() => onNavigate("assignment-subject-select")}>
            Assignment Generator
          </button>
          <button onClick={() => onNavigate("summary-subject-select")}>
            Summary Generator
          </button>
        </div>
      )}

      <div className="help-card quiz-help-card">
        <CircleHelp size={24} />
        <h4>Need help?</h4>
        <p>Generate accurate quizzes faster with AI.</p>
        <button>View Guide</button>
      </div>
    </aside>
  );
}

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="topbar">
      <h2>QUIZ GENERATOR</h2>

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

export default function QuizGenerator({ onNavigate }) {
  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <div className="quiz-gen-breadcrumb">
            <span>AI Tools</span>
            <ChevronRight size={16} />
            <span className="active">Quiz Generator</span>
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

            <div className="quiz-gen-stats">
              <StatCard icon={<BookOpen />} title="Study Materials" value="7" link="View Materials" />
              <StatCard icon={<CircleHelp />} title="Quizzes Generated" value="12" link="View Quizzes" />
              <StatCard icon={<FileText />} title="Questions Generated" value="245" link="View Questions" />
              <StatCard icon={<Clock />} title="Last Generated" value="20 May 2024" link="View History" />
            </div>
          </div>

          <div className="quiz-gen-grid">
            <div className="quiz-gen-panel">
              <h3>Add Study Materials <Info size={15} /></h3>
              <p>Add files and notes to help AI understand the content and generate accurate questions.</p>

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
              <h3>Configure Quiz</h3>

              <div className="form-two">
                <label>
                  Subject
                  <select>
                    <option>Data Structures</option>
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

              <h4 className="form-title">Question Type</h4>

              <div className="check-row">
                <label><input type="checkbox" defaultChecked /> MCQ</label>
                <label><input type="checkbox" defaultChecked /> True / False</label>
                <label><input type="checkbox" /> Short Answer</label>
                <label><input type="checkbox" /> Long Answer</label>
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
                  <select><option>10 Marks</option></select>
                </label>
              </div>

              <label className="full-label">
                Bloom's Taxonomy (Optional)
                <select><option>Select Level</option></select>
              </label>

              <label className="full-label">
                Additional Instructions (Optional)
                <textarea placeholder="E.g. Focus on conceptual understanding, avoid implementation questions."></textarea>
              </label>

              <button className="generate-quiz-btn">
                <Sparkles size={17} />
                Generate Quiz
              </button>
            </div>

            <div className="quiz-gen-panel">
              <div className="preview-head">
                <h3>Preview Questions</h3>
                <button><RefreshCw size={15} /> Regenerate</button>
              </div>

              <div className="question-card">
                <div className="question-top">
                  <strong>Which of the following data structure uses LIFO principle?</strong>
                  <span>1 Mark</span>
                </div>
                <div className="options-grid">
                  <label><input type="radio" /> A. Queue</label>
                  <label><input type="radio" /> C. Tree</label>
                  <label><input type="radio" defaultChecked /> B. Stack</label>
                  <label><input type="radio" /> D. Graph</label>
                </div>
              </div>

              <div className="question-card">
                <div className="question-top">
                  <strong>A linked list is a collection of ______ called nodes.</strong>
                  <span>1 Mark</span>
                </div>
                <input className="short-answer" placeholder="Enter short answer" />
                <p className="expected-answer">Expected Answer: elements / data items</p>
              </div>

              <div className="question-card">
                <div className="question-top">
                  <strong>True or False: In a circular linked list, the last node points to NULL.</strong>
                  <span>1 Mark</span>
                </div>
                <div className="options-grid">
                  <label><input type="radio" /> True</label>
                  <label><input type="radio" defaultChecked /> False</label>
                </div>
              </div>

              <div className="preview-actions">
                <button>View All Questions</button>
                <button className="outline-purple-btn"><Pencil size={16} /> Edit Questions</button>
                <button className="solid-purple-btn"><Plus size={16} /> Save Quiz</button>
              </div>
            </div>
          </div>

          <div className="saved-quiz-panel">
            <div className="saved-quiz-head">
              <h3>Saved Quizzes</h3>
              <button><List size={16} /> View All Quizzes</button>
            </div>

            <table className="saved-quiz-table">
              <thead>
                <tr>
                  <th>Quiz Title</th>
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
                  ["Arrays & Linked Lists - Quiz 1", "Arrays & Linked Lists", "MCQ", 10, 10, "18 May 2024"],
                  ["Stacks & Queues - Quiz 2", "Stacks & Queues", "Mixed", 15, 15, "12 May 2024"],
                  ["Trees - Quiz 3", "Trees", "MCQ", 10, 10, "08 May 2024"],
                ].map((quiz) => (
                  <tr key={quiz[0]}>
                    <td>{quiz[0]}</td>
                    <td>{quiz[1]}</td>
                    <td>{quiz[2]}</td>
                    <td>{quiz[3]}</td>
                    <td>{quiz[4]}</td>
                    <td>{quiz[5]}</td>
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
              <p>AI generates questions based on the study materials, topic and settings you provide. Please review before publishing.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
