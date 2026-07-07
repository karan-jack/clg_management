import React, { useState } from 'react';
import './ProfessorDashboard.css';
import { Search, Bell, ChevronDown, ChevronUp, ChevronRight, MoveVertical as MoreVertical, BookOpen, Upload, GraduationCap, Bot, Users, ClipboardList, BookOpenCheck, Wand as Wand2, LogOut, Settings, Circle as HelpCircle, User, Folder, CalendarDays, FileQuestionMark as FileQuestion, FileText } from 'lucide-react';

function BatchCard({ batch, percent, color, ring }) {
  return (
    <div className="batch-card" style={{ background: color }}>
      <div className="batch-top">
        <div>
          <p>Batch</p>
          <h3>{batch}</h3>
        </div>
        <MoreVertical size={22} />
      </div>

      <div className="progress-wrap">
        <div
          className="progress-ring"
          style={{
            background: `conic-gradient(${ring} ${percent * 3.6}deg, #fff ${
              percent * 3.6
            }deg)`,
          }}
        >
          <div className="progress-inner">{percent}%</div>
        </div>
      </div>

      <h4>Semester:3</h4>
    </div>
  );
}

function OverviewCard({ icon, title, value, color }) {
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

function ActivityRow({ icon, color, title, subtitle, status, time }) {
  return (
    <div className="activity-row">
      <div className="activity-icon" style={{ background: color }}>
        {icon}
      </div>
      <div className="activity-main">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
      <span className="status">{status}</span>
      <span className="time">{time}</span>
    </div>
  );
}

export default function ProfessorDashboard({ onNavigate }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="dashboard-page">
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

        <button
          onClick={() => onNavigate('upload-marks')}
          className="side-item"
        >
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

      <main className="main">
        <header className="topbar">
          <h2>WELCOME BACK</h2>

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
              {profileOpen ? (
                <ChevronUp size={22} />
              ) : (
                <ChevronDown size={22} />
              )}
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

        <section className="content">
          <h3 className="section-heading">
            Assigned Batches <ChevronRight size={24} />
          </h3>

          <div className="batch-grid">
          <BatchCard
           batch="2025-2029"
           percent={30} 
           color="#ded4f2" 
           ring="#b49adf" 
          />
          <BatchCard 
          batch="2024-2028" 
          percent={50} 
          color="#d3d8ee" 
          ring="#7e91d4" 
          />
          <BatchCard 
          batch="2025-2029" 
          percent={30} 
          color="#c8ebe8" 
          ring="#72c9c3" 
          />
          </div>

          <h3 className="section-heading">Overview</h3>

          <div className="overview-grid">
            <OverviewCard
              icon={<Users />}
              title="Total Students"
              value="1,248"
              color="#0957c4"
            />
            <OverviewCard
              icon={<BookOpenCheck />}
              title="Active Courses"
              value="42"
              color="#8b35d8"
            />
            <OverviewCard
              icon={<ClipboardList />}
              title="Quizzes Created"
              value="156"
              color="#0867bb"
            />
            <OverviewCard
              icon={<Wand2 />}
              title="AI Tools Used"
              value="89"
              color="#4aa7df"
            />
          </div>

          <h3 className="section-heading">
            Recent Activity <ChevronRight size={24} />
          </h3>

          <div className="activity-list">
            <ActivityRow
              icon={<ClipboardList />}
              color="#8a35d8"
              title="Quiz on Machine Learning"
              subtitle="Created by you"
              status="Quiz Created"
              time="2 hours ago"
            />
            <ActivityRow
              icon={<CalendarDays />}
              color="#fb5a00"
              title="Assignment: Neural Networks"
              subtitle="Due on 25 May 2025"
              status="Due Soon"
              time="3 hours ago"
            />
            <ActivityRow
              icon={<FileQuestion />}
              color="#3b9ce0"
              title="Quiz on Operating Systems"
              subtitle="Attempted by 45 students"
              status="Quiz Viewed"
              time="5 hours ago"
            />
            <ActivityRow
              icon={<FileText />}
              color="#f2b000"
              title="Data Structures Assignment"
              subtitle="23 Submissions Pending"
              status="Pending"
              time="1 day ago"
            />
            <ActivityRow
              icon={<Folder />}
              color="#e32d36"
              title="Advanced Algorithms"
              subtitle="3 resources needed"
              status="Resources"
              time="1 day ago"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
