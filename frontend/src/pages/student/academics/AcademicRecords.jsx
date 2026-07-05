import React from 'react';

export default function AcademicRecords({ currentPage, setPage }) {
  const badges = [
    ['🏅', 'Top Performer', 'Scored in the top 10%', '10 May 2024'],
    ['🏆', 'Consistent Learner', 'Completed 10+ courses', '22 Apr 2024'],
    ['📖', 'Quick Learner', 'Completed a course in record time', '05 Apr 2024'],
    ['🎯', 'High Achiever', 'Scored above 90%', '15 Mar 2024'],
  ];

  const subjects = [
    ['CS301', 'Data Structures', '85', '100', 'A'],
    ['MA301', 'Discrete Mathematics', '78', '100', 'B+'],
    ['PH301', 'Physics for Computing', '82', '100', 'A-'],
    ['CS302', 'Database Management Systems', '88', '100', 'A'],
    ['EE301', 'Digital Logic Design', '75', '100', 'B+'],
    ['HU301', 'Technical Communication', '90', '100', 'A+'],
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      <Sidebar currentPage={currentPage} setPage={setPage} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <Topbar title="ACADEMIC RECORD" />

        <section className="px-10 py-8">
          <div className="grid overflow-hidden rounded-xl border border-[#eae1d8] bg-white lg:grid-cols-[1fr_360px]">
            <div className="flex items-center gap-5 p-6">
              <div className="grid h-[62px] w-[62px] place-items-center rounded-full bg-[#0b1a30] text-xl font-bold text-white">
                ST
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#0b1a30]">Student</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Student ID: 2024001
                </p>
              </div>
            </div>

            <div className="border-t border-[#eae1d8] p-6 lg:border-l lg:border-t-0">
              <label className="mb-2 block text-sm font-semibold text-slate-500">
                Select Semester
              </label>

              <select className="h-[42px] w-full rounded-md border border-[#e3d2c4] bg-[#fcf9f6] px-3 text-sm text-slate-600 outline-none">
                <option>Semester 3</option>
                <option>Semester 2</option>
                <option>Semester 1</option>
              </select>
            </div>
          </div>

          <h2 className="mt-8 font-serif text-lg font-black text-[#0b1a30]">
            Recent Badges
          </h2>

          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {badges.map(([icon, title, desc, date]) => (
              <div
                key={title}
                className="flex min-h-[112px] items-center gap-4 rounded-xl border border-[#eae1d8] bg-white p-5"
              >
                <div className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full bg-[#f1eae2] text-2xl">
                  {icon}
                </div>

                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0b1a30]">
                    {title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">{desc}</p>
                  <small className="mt-1 block text-[11.5px] text-slate-500">
                    {date}
                  </small>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-8 font-serif text-lg font-black text-[#0b1a30]">
            Semester 3
          </h2>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#eae1d8] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-[#fdfaf7]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-extrabold text-[#0b1a30]">
                      Subject Code
                    </th>
                    <th className="px-6 py-4 text-sm font-extrabold text-[#0b1a30]">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-sm font-extrabold text-[#0b1a30]">
                      Marks
                    </th>
                    <th className="px-6 py-4 text-sm font-extrabold text-[#0b1a30]">
                      Maximum Marks
                    </th>
                    <th className="px-6 py-4 text-sm font-extrabold text-[#0b1a30]">
                      Grade
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subjects.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0e7df]">
                      {row.map((cell) => (
                        <td
                          key={cell}
                          className="px-6 py-4 text-sm text-slate-600"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid border-t border-[#eae1d8] md:grid-cols-2">
              <Summary icon="📖" label="Total Credits" value="20" />
              <Summary icon="📊" label="CGPA" value="8.32" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Sidebar({ currentPage, setPage }) {
  return (
    <aside className="w-[250px] shrink-0 border-r border-[#ebdcd0] bg-[#f3eae2] px-6 py-8">
      <h2 className="font-serif text-2xl font-black tracking-wide text-[#0b1a30]">
        NAME
      </h2>

      <div className="mt-8 flex h-10 items-center rounded-lg border border-[#e3d2c4] bg-[#fcf9f6] px-3">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
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
          <MenuItem onClick={() => setPage('browse-courses')}>
            ⌘ Browse Courses
          </MenuItem>
          <MenuItem onClick={() => setPage('my-learning')}>
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
          <MenuItem onClick={() => setPage('leaderboard')}>
            ⌁ Leaderboard
          </MenuItem>
          <MenuItem onClick={() => setPage('badges')}>⊙ Badges</MenuItem>
        </MenuGroup>

        <MenuGroup title="▤ Portfolio">
          <MenuItem onClick={() => setPage('certificates')}>
            ⚙ Certificates
          </MenuItem>
          <MenuItem onClick={() => setPage('publications')}>
            ✎ Publications
          </MenuItem>
        </MenuGroup>
      </nav>
    </aside>
  );
}

function Topbar({ title }) {
  const [showProfileCard, setShowProfileCard] = React.useState(false);

  return (
    <header className="flex h-20 items-center justify-between border-b border-[#eaddd3] px-10">
      <h1 className="font-serif text-[26px] font-black tracking-wide text-[#0b1a30]">
        {title}
      </h1>

      <div
        className="relative py-2"
        onMouseEnter={() => setShowProfileCard(true)}
        onMouseLeave={() => setShowProfileCard(false)}
      >
        <div
          onClick={() => setShowProfileCard(!showProfileCard)}
          className="flex cursor-pointer items-center gap-4"
        >
          <div className="relative text-xl">
            🔔
            <span className="absolute -right-1 -top-1 grid h-[15px] w-[15px] place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              3
            </span>
          </div>

          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0b1a30] text-sm font-bold text-white">
            ST
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-[#0b1a30]">Student</h4>
          </div>

          <span className="text-slate-500">⌄</span>
        </div>

        {showProfileCard && (
          <div className="profile-card absolute right-0 top-[70px] z-50 flex w-[260px] flex-col items-center rounded-[14px] border border-[#eaddd3] bg-white p-6 text-center shadow-xl">
            <div className="mb-3 grid h-[54px] w-[54px] place-items-center rounded-full bg-[#0b1a30] text-lg font-bold text-white shadow">
              ST
            </div>

            <h3 className="text-base font-bold text-[#0b1a30]">Student</h3>

            <p className="mb-5 mt-1 text-xs text-slate-500">
              Semester 3 • Electrical Engineering
            </p>

            <div className="w-full border-t border-[#f1eae2] pt-4">
              <div className="mb-2 flex justify-between text-xs font-bold text-[#0b1a30]">
                <span>Level 12</span>
                <span className="font-medium text-slate-500">
                  2,450 / 3,000 XP
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded bg-[#f1eae2]">
                <div className="h-full w-[81%] rounded bg-gradient-to-r from-violet-600 to-blue-600"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MenuGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
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
      type="button"
      onClick={onClick}
      className={`block rounded-md py-2 pl-5 text-left text-[13px] transition ${
        active
          ? 'bg-[#d8cdc4] font-bold text-[#0b1a30]'
          : 'text-slate-500 hover:bg-[#0b1a30]/5 hover:text-[#0b1a30]'
      }`}
    >
      {children}
    </button>
  );
}

function Summary({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5 p-6">
      <div className="grid h-[54px] w-[54px] place-items-center rounded-full bg-[#eef4ff] text-2xl text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <h2 className="mt-1 text-2xl font-bold text-[#0b1a30]">{value}</h2>
      </div>
    </div>
  );
}
