import React, { useState } from 'react';

export default function Dashboard({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);

  // Added target navigation pages to stat cards
  const stats = [
    ['👤', 'Total Courses', '8', 'bg-[#0b1a30]', 'my-learning'],
    ['📖', 'Courses in Progress', '6', 'bg-violet-600', 'my-learning'],
    ['☑', 'Completed Courses', '2', 'bg-sky-600', 'my-learning'],
    ['🕒', 'Total Study Hours', '128', 'bg-blue-600', null],
  ];

  const analytics = [
    ['Electrical Engineering', 24, 'from-violet-800 to-violet-600'],
    ['DBMS', 31, 'from-sky-700 to-sky-500'],
    ['Data Structures', 56, 'from-green-700 to-green-500'],
    ['Operating Systems', 68, 'from-orange-700 to-orange-500'],
  ];

  const tools = [
    ['📅', 'Study Planner', 'Plan your study schedule and stay on track.'],
    ['📋', 'Assignments', 'View and submit your assignments and projects.'],
    ['📄', 'Notes', 'Access your saved notes and important resources.'],
    ['📊', 'Performance', 'Track your progress and improvement over time.'],
  ];

  const activities = [
    ['Physics Module 4 uploaded', '5 hours ago'],
    ['Chemistry module 6 completed', '1 day ago'],
    ['3 new badges earned', '2 days ago'],
    ['Quiz completed: Mathematics - Chapter 3', '3 days ago'],
  ];

  // Extracted layout wrappers to serve navigation globally
  const SharedSidebar = () => (
    <MainSidebar currentPage={currentPage} setPage={setPage} />
  );
  const SharedTopbar = (props) => (
    <Topbar {...props} title="STUDENT DASHBOARD" setPage={setPage} />
  );

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      <SharedSidebar />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <SharedTopbar
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-8">
          <h2 className="font-serif text-2xl font-black text-[#0b1a30]">
            Welcome back, Student !
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Here's your learning overview.
          </p>

          {/* Stats Metrics Grid */}
          <div className="mt-6 grid grid-cols-4 gap-5">
            {stats.map(([icon, title, value, color, targetPage]) => (
              <div
                key={title}
                onClick={() => targetPage && setPage(targetPage)}
                className={`rounded-xl border border-[#eae1d8] bg-white p-5 transition-all duration-200 ${
                  targetPage
                    ? 'cursor-pointer hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-sm'
                    : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-[42px] w-[42px] place-items-center rounded-lg text-white ${color}`}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {title}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-[#0b1a30]">
                      {value}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Progression Blocks */}
          <h2 className="mt-8 font-serif text-lg font-black text-[#0b1a30]">
            Learning Analytics
          </h2>
          <div className="mt-4 grid grid-cols-4 gap-5">
            {analytics.map(([title, percent, color]) => (
              <div
                key={title}
                onClick={() => setPage('my-learning')}
                className={`flex min-h-[180px] cursor-pointer flex-col justify-between rounded-2xl bg-gradient-to-br ${color} p-6 text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-xs opacity-90">
                    {percent}% Completed
                  </p>
                </div>
                <div
                  className="grid h-[86px] w-[86px] place-items-center self-center rounded-full"
                  style={{
                    background: `conic-gradient(rgba(255,255,255,0.9) ${
                      percent * 3.6
                    }deg, rgba(255,255,255,0.2) 0deg)`,
                  }}
                >
                  <div className="grid h-[66px] w-[66px] place-items-center rounded-full bg-black/10 text-sm font-bold">
                    {percent}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tools Grid */}
          <h2 className="mt-8 font-serif text-lg font-black text-[#0b1a30]">
            My Learning Tools
          </h2>
          <div className="mt-4 grid grid-cols-4 gap-5">
            {tools.map(([icon, title, desc]) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-xl border border-[#e5d5c8] bg-[#f1eae2] p-5 cursor-pointer transition hover:bg-[#e8ddd2]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[#e5d5c8] bg-white">
                  {icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[#0b1a30]">{title}</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {desc}
                  </p>
                </div>
                <span className="text-xl text-slate-400">›</span>
              </div>
            ))}
          </div>

          {/* Recent Activity Log */}
          <h2 className="mt-8 font-serif text-lg font-black text-[#0b1a30]">
            Recent Activity
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-[#e3d2c4] bg-[#f3eae2]">
            {activities.map(([title, time]) => (
              <div
                key={title}
                className="flex items-center border-b border-[#e8ddd3] px-6 py-4 last:border-b-0 cursor-pointer transition hover:bg-[#ebdcd0]"
              >
                <div className="mr-4 grid h-[34px] w-[34px] place-items-center rounded-md bg-blue-50 text-blue-600">
                  📄
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#0b1a30]">
                    {title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">{time}</p>
                </div>
                <span className="text-xl text-slate-400">›</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Named layout structure sub-exports to keep standard routing styles uniform
export function MainSidebar({ currentPage, setPage }) {
  return (
    <aside className="w-[250px] shrink-0 border-r border-[#ebdcd0] bg-[#f3eae2] px-6 py-8 flex flex-col justify-between">
      <div>
        <h2
          onClick={() => setPage('dashboard')}
          className="font-serif text-2xl font-black tracking-wide text-[#0b1a30] cursor-pointer"
        >
          NAME
        </h2>
        <div className="mt-8 flex h-10 items-center rounded-lg border border-[#e3d2c4] bg-[#fcf9f6] px-3">
          <input
            placeholder="Search"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <span className="text-slate-500">⌕</span>
        </div>
        <nav className="mt-8 flex flex-col gap-5">
          <MenuGroup title="⚙ Academics">
            <MenuItem
              active={currentPage === 'academic-records'}
              onClick={() => setPage('academic-records')}
            >
              ⌂ Academic Records
            </MenuItem>
          </MenuGroup>

          <MenuGroup title="▣ Learning">
            <MenuItem
              active={currentPage === 'browse-courses'}
              onClick={() => setPage('browse-courses')}
            >
              ⌘ Browse Courses
            </MenuItem>
            <MenuItem
              active={currentPage === 'my-learning'}
              onClick={() => setPage('my-learning')}
            >
              ▧ My Learning
            </MenuItem>
            <MenuItem
              active={currentPage === 'learning-paths'}
              onClick={() => setPage('learning-paths')}
            >
              ⇄ Learning Paths
            </MenuItem>
          </MenuGroup>

          <MenuGroup title="♕ Gamification">
            <MenuItem
              active={currentPage === 'leaderboard'}
              onClick={() => setPage('leaderboard')}
            >
              ⌁ Leaderboard
            </MenuItem>
            <MenuItem
              active={currentPage === 'badges'}
              onClick={() => setPage('badges')}
            >
              ⊙ Badges
            </MenuItem>
          </MenuGroup>

          <MenuGroup title="▤ Portfolio">
            <MenuItem
              active={currentPage === 'certificates'}
              onClick={() => setPage('certificates')}
            >
              ⚙ Certificates
            </MenuItem>
            <MenuItem
              active={currentPage === 'publications'}
              onClick={() => setPage('publications')}
            >
              ✎ Publications
            </MenuItem>
          </MenuGroup>

          <MenuGroup title="⚒ Tools">
            <MenuItem
              active={currentPage === 'resume-generator'}
              onClick={() => setPage('resume-generator')}
            >
              🗇 Resume Generator
            </MenuItem>
          </MenuGroup>
        </nav>
      </div>
    </aside>
  );
}

export function Topbar({
  title,
  showProfileCard,
  setShowProfileCard,
  setPage,
}) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#eaddd3] px-10 bg-white/50">
      <h1 className="font-serif text-[26px] font-black tracking-wide text-[#0b1a30]">
        {title}
      </h1>

      <div className="flex items-center gap-6">
        {/* Independent Notification Bell */}
        <button
          type="button"
          className="relative text-xl cursor-pointer hover:opacity-80 transition"
        >
          🔔
          <span className="absolute -right-1 -top-1 grid h-[15px] w-[15px] place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* Profile Card & Dropdown Trigger */}
        <div className="relative">
          <div
            onClick={() => setShowProfileCard(!showProfileCard)}
            className="flex cursor-pointer items-center gap-3 rounded-full py-1 px-2 hover:bg-slate-100/60 transition"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0b1a30] text-sm font-bold text-white shadow-sm">
              ST
            </div>

            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 leading-tight">
                Welcome,
              </p>
              <h4 className="text-[13px] font-bold text-[#0b1a30] leading-tight">
                Student
              </h4>
            </div>

            <span className="text-slate-500 text-xs ml-1">⌄</span>
          </div>

          {/* Profile Card Overlay */}
          {showProfileCard && (
            <div className="profile-card absolute right-0 top-[60px] z-50 flex w-[280px] flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl text-center">
              {/* Avatar */}
              <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-[#0b1a30] text-xl font-bold text-white shadow-md">
                ST
              </div>

              {/* Student Info */}
              <h3 className="text-lg font-extrabold text-[#0b1a30] mb-0.5">
                Student
              </h3>
              <p className="text-xs font-semibold text-slate-400 mb-5">
                Semester 4 • Electrical Engineering
              </p>

              {/* Level & XP */}
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-slate-700">Level 12</span>
                <span className="text-slate-400">2,450 / 3,000 XP</span>
              </div>

              {/* Level Bar */}
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden mb-5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: '81.6%' }}
                />
              </div>

              {/* Options Below Level Bar */}
              <div className="border-t border-slate-100 pt-3 flex flex-col gap-1 text-left">
                <button
                  onClick={() => {
                    setPage && setPage('settings');
                    setShowProfileCard(false);
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span className="text-slate-400">⚙</span> Account Settings
                </button>

                <button
                  onClick={() => {
                    setPage && setPage('change-password');
                    setShowProfileCard(false);
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span className="text-slate-400">🔒</span> Change Password
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={() => {
                    setPage && setPage('logout');
                    setShowProfileCard(false);
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                >
                  <span className="text-red-500">↳</span> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left text-sm font-bold text-[#0b1a30]"
      >
        <span>{title}</span>
        <span className="text-[10px] text-slate-500">{open ? '⌃' : '⌄'}</span>
      </button>
      {open && <div className="flex flex-col gap-1">{children}</div>}
    </div>
  );
}

function MenuItem({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`block rounded-md py-2 pl-5 text-left text-[13px] transition w-full ${
        active
          ? 'bg-[#d8cdc4] font-bold text-[#0b1a30]'
          : 'text-slate-500 hover:bg-[#0b1a30]/5 hover:text-[#0b1a30]'
      }`}
    >
      {children}
    </button>
  );
}