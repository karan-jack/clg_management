import React, { useState, useEffect } from 'react';
import './ProfessorDashboard.css';
import { Search, Bell, ChevronDown, ChevronUp, ChevronRight, MoveVertical as MoreVertical, BookOpen, Upload, GraduationCap, Bot, Users, ClipboardList, BookOpenCheck, Wand as Wand2, LogOut, Settings, Circle as HelpCircle, User, Folder, CalendarDays, FileQuestionMark as FileQuestion, FileText, Loader2 } from 'lucide-react';
import api from '../../services/api';

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

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.getProfessorDashboard();
      setData(res.data);
    } catch (err) {
      if (err.status === 401) window.location.href = '/login';
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h1>NAME</h1>

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
              <h4>{data?.professorName || 'Professor'}</h4>
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
                    <h4>{data?.professorName || 'Professor'}</h4>
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
                <button onClick={handleLogout}>
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

          {loading ? (
            <div style={{ display:"flex", justifyContent:"center", padding: 40 }}>
              <Loader2 size={32} className="animate-spin" color="#8b35d8" />
            </div>
          ) : error ? (
            <div style={{ color: 'red', padding: 20 }}>{error}</div>
          ) : (
            <>
              <div className="batch-grid">
                {data?.assignedCourses && data.assignedCourses.length > 0 ? data.assignedCourses.map((c, i) => {
                  const colors = [
                    { color: "#ded4f2", ring: "#b49adf" },
                    { color: "#d3d8ee", ring: "#7e91d4" },
                    { color: "#c8ebe8", ring: "#72c9c3" },
                    { color: "#ffe4e1", ring: "#ffb6c1" }
                  ];
                  const scheme = colors[i % colors.length];
                  return (
                    <BatchCard
                      key={c.id}
                      batch={c.code}
                      percent={Math.floor(Math.random() * 40) + 40} // Mock progress
                      color={scheme.color} 
                      ring={scheme.ring} 
                    />
                  );
                }) : (
                  <p style={{ padding: '0 20px', color: '#6B7280' }}>No courses assigned yet.</p>
                )}
              </div>

              <h3 className="section-heading">Overview</h3>

              <div className="overview-grid">
                <OverviewCard
                  icon={<Users />}
                  title="Total Students"
                  value={data?.stats?.totalStudents || 0}
                  color="#0957c4"
                />
                <OverviewCard
                  icon={<BookOpenCheck />}
                  title="Active Courses"
                  value={data?.stats?.activeCourses || 0}
                  color="#8b35d8"
                />
                <OverviewCard
                  icon={<ClipboardList />}
                  title="Quizzes Created"
                  value={data?.stats?.quizzesCreated || 0}
                  color="#0867bb"
                />
                <OverviewCard
                  icon={<Wand2 />}
                  title="Assignments"
                  value={data?.stats?.assignmentsCreated || 0}
                  color="#4aa7df"
                />
              </div>

              <h3 className="section-heading">
                Recent Activity <ChevronRight size={24} />
              </h3>

              <div className="activity-list">
                {data?.recentActivity && data.recentActivity.length > 0 ? (
                  data.recentActivity.map((a, i) => (
                    <ActivityRow
                      key={i}
                      icon={a.type === 'Quiz' ? <ClipboardList /> : a.type === 'Assignment' ? <FileText /> : <BookOpen />}
                      color={a.type === 'Quiz' ? "#8a35d8" : "#fb5a00"}
                      title={a.title || 'Activity'}
                      subtitle={a.subtitle || 'Updated'}
                      status={a.status || 'Done'}
                      time={new Date(a.date || Date.now()).toLocaleDateString()}
                    />
                  ))
                ) : (
                  <p style={{ padding: '0 20px', color: '#6B7280' }}>No recent activity.</p>
                )}
              </div>
            </>
          )}




        </section>
      </main>
    </div>
  );
}
