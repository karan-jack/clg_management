import React, { useState } from 'react';
import './ProfessorDashboard.css';
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
  MoreVertical,
  Database,
  Cpu,
  Activity,
  RadioTower,
  Wifi,
  Code2,
  CalendarDays,
  Users,
  FileText,
  ArrowRight,
  Lightbulb,
  Headphones,
} from 'lucide-react';

function Sidebar({ onNavigate, activeTool }) {
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
          <Bot size={23} /> AI Tools <small className="new-label">New</small>
        </span>
        {aiOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {aiOpen && (
        <div className="sub-menu">
          <button
            onClick={() => onNavigate('quiz-subject-select')}
            className={activeTool === 'quiz' ? 'active-sub-side' : ''}
          >
            Quiz Generator
          </button>

          <button
            onClick={() => onNavigate('assignment-subject-select')}
            className={activeTool === 'assignment' ? 'active-sub-side' : ''}
          >
            Assignment Generator
          </button>

          <button
            onClick={() => onNavigate('summary-subject-select')}
            className={activeTool === 'summary' ? 'active-sub-side' : ''}
          >
            Summary Generator
          </button>
        </div>
      )}

      <div className="help-card">
        <Headphones size={26} />
        <h4>Need Help?</h4>
        <p>Visit the help center or contact support.</p>
        <button>
          Help Center <ArrowRight size={15} />
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="topbar">
      <h2>SELECT SUBJECT</h2>

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

const subjects = [
  {
    id: 'data-structures',
    title: 'Data Structures',
    course: 'B.Tech - ECE',
    semester: 'Semester 3',
    batches: 3,
    students: 120,
    modules: 8,
    color: '#6d28d9',
    bg: '#f4ecff',
    icon: <Database />,
  },
  {
    id: 'digital-electronics',
    title: 'Digital Electronics',
    course: 'B.Tech - ECE',
    semester: 'Semester 3',
    batches: 2,
    students: 85,
    modules: 6,
    color: '#1267e8',
    bg: '#eef6ff',
    icon: <Cpu />,
  },
  {
    id: 'signals-systems',
    title: 'Signals & Systems',
    course: 'B.Tech - ECE',
    semester: 'Semester 4',
    batches: 2,
    students: 78,
    modules: 7,
    color: '#159947',
    bg: '#f0fbef',
    icon: <Activity />,
  },
  {
    id: 'em-fields',
    title: 'Electromagnetic Fields',
    course: 'B.Tech - ECE',
    semester: 'Semester 4',
    batches: 1,
    students: 60,
    modules: 5,
    color: '#ea6a0a',
    bg: '#fff7e8',
    icon: <RadioTower />,
  },
  {
    id: 'wireless-communication',
    title: 'Wireless Communication',
    course: 'B.Tech - ECE',
    semester: 'Semester 5',
    batches: 2,
    students: 95,
    modules: 6,
    color: '#e91e63',
    bg: '#fff0f6',
    icon: <Wifi />,
  },
  {
    id: 'computer-organization',
    title: 'Computer Organization',
    course: 'B.Tech - ECE',
    semester: 'Semester 5',
    batches: 1,
    students: 50,
    modules: 5,
    color: '#0f9a9a',
    bg: '#effcfc',
    icon: <Code2 />,
  },
];

function SubjectCard({ subject, onNavigate, activeTool }) {
  return (
    <div
      className="subject-card"
      style={{
        background: subject.bg,
        borderColor: subject.color + '33',
      }}
    >
      <div className="subject-card-top">
        <div
          className="subject-icon"
          style={{
            background: subject.color + '18',
            color: subject.color,
          }}
        >
          {subject.icon}
        </div>

        <div>
          <h3>{subject.title}</h3>
          <p>{subject.course}</p>
          <span
            style={{
              background: subject.color + '18',
              color: subject.color,
            }}
          >
            {subject.semester}
          </span>
        </div>

        <MoreVertical size={19} />
      </div>

      <div className="subject-divider"></div>

      <div className="subject-stats">
        <div style={{ color: subject.color }}>
          <CalendarDays size={18} />
          <strong>{subject.batches}</strong>
          <p>{subject.batches === 1 ? 'Batch' : 'Batches'}</p>
        </div>

        <div style={{ color: subject.color }}>
          <Users size={18} />
          <strong>{subject.students}</strong>
          <p>Students</p>
        </div>

        <div style={{ color: subject.color }}>
          <FileText size={18} />
          <strong>{subject.modules}</strong>
          <p>Modules</p>
        </div>
      </div>

      <button
        className="select-subject-btn"
        style={{ color: subject.color }}
        onClick={() => {
          if (activeTool === 'assignment') {
            onNavigate('assignment-generator');
          } else if (activeTool === 'summary') {
            onNavigate('summary-generator');
          } else {
            onNavigate('quiz-generator');
          }
        }}
      >
        Select Subject <ArrowRight size={20} />
      </button>
    </div>
  );
}

export default function QuizSubjectSelect({ onNavigate, activeTool = 'quiz' }) {
  let toolName = 'Quiz Generator';

  if (activeTool === 'assignment') {
    toolName = 'Assignment Generator';
  }

  if (activeTool === 'summary') {
    toolName = 'Summary Generator';
  }

  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} activeTool={activeTool} />

      <main className="main">
        <Topbar />

        <section className="content">
          <div className="ai-breadcrumb">
            <span>AI Tools</span>
            <ChevronRight size={16} />
            <span>{toolName}</span>
            <ChevronRight size={16} />
            <span className="active">Select Subject</span>
          </div>

          <p className="ai-subtitle">
            Choose a subject to continue with {toolName.toLowerCase()}.
          </p>

          <div className="subject-info-box">
            <BookOpen size={25} />
            <p>
              Select any subject from the list below to continue to the{' '}
              {toolName}.
            </p>
          </div>

          <div className="subject-search-row">
            <p>6 Subjects Found</p>

            <div className="subject-search-box">
              <input placeholder="Search subjects..." />
              <Search size={20} />
            </div>
          </div>

          <div className="subject-grid">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onNavigate={onNavigate}
                activeTool={activeTool}
              />
            ))}
          </div>

          <div className="subject-tip-box">
            <Lightbulb size={22} />
            <div>
              <h4>Tip</h4>
              <p>
                Select a subject to continue using its content, modules and
                study materials.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
