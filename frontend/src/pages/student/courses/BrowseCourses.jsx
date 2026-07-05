import React, { useState } from 'react';
const courses = [
  {
    title: 'Data Structures',
    category: 'Computer Science',
    professor: 'Dr. Arindam Chatterjee',
    department: 'Computer Science Department',
    desc: 'Learn fundamental data structures and algorithms.',
    longDesc:
      'This course introduces arrays, linked lists, stacks, queues, trees, graphs, and hash tables with practical problem-solving applications.',
    modules: 8,
    duration: '10-12 Hours',
    level: 'Intermediate',
    xp: 1200,
    badge: 'Data Master',
    icon: '</>',
    color: 'from-violet-600 to-purple-500',
    outcomes: [
      'Implement linear and non-linear data structures',
      'Analyze time and space complexity',
      'Solve problems using trees and graphs',
      'Apply hashing and searching techniques',
    ],
    lessons: [
      ['Introduction', ['Course overview', 'Why data structures matter']],
      ['Module 1', ['Arrays and Strings', 'Searching techniques']],
      ['Module 2', ['Linked Lists', 'Stacks and Queues']],
      ['Module 3', ['Trees', 'Graphs', 'Hash Tables']],
    ],
  },
  {
    title: 'Database Systems',
    category: 'Computer Science',
    professor: 'Dr. Meera Nair',
    department: 'Computer Science Department',
    desc: 'Understand database design, SQL, and normalization.',
    longDesc:
      'This course covers relational databases, SQL queries, normalization, indexing, transactions, and database design for real-world systems.',
    modules: 7,
    duration: '9-11 Hours',
    level: 'Beginner',
    xp: 1000,
    badge: 'Query Expert',
    icon: '▣',
    color: 'from-sky-600 to-cyan-500',
    outcomes: [
      'Design relational database schemas',
      'Write SQL queries for data retrieval',
      'Understand normalization and keys',
      'Work with transactions and indexing',
    ],
    lessons: [
      ['Introduction', ['Database basics', 'Relational model']],
      ['Module 1', ['Tables and keys', 'ER diagrams']],
      ['Module 2', ['SQL queries', 'Joins and filters']],
      ['Module 3', ['Normalization', 'Transactions']],
    ],
  },
  {
    title: 'Digital Logic Design',
    category: 'Electrical Engineering',
    professor: 'Prof. R. Menon',
    department: 'Electrical Engineering Department',
    desc: 'Explore digital circuits and logic design principles.',
    longDesc:
      'Learn number systems, Boolean algebra, logic gates, combinational circuits, sequential circuits, and digital system design.',
    modules: 6,
    duration: '8-10 Hours',
    level: 'Intermediate',
    xp: 950,
    badge: 'Logic Builder',
    icon: '▤',
    color: 'from-emerald-500 to-green-600',
    outcomes: [
      'Simplify Boolean expressions',
      'Design logic gate circuits',
      'Understand flip-flops and counters',
      'Build combinational and sequential systems',
    ],
    lessons: [
      ['Introduction', ['Digital systems', 'Number systems']],
      ['Module 1', ['Boolean algebra', 'Logic gates']],
      ['Module 2', ['Combinational circuits', 'K-maps']],
      ['Module 3', ['Flip-flops', 'Counters']],
    ],
  },
  {
    title: 'Calculus I',
    category: 'Mathematics',
    professor: 'Dr. Kavita Rao',
    department: 'Mathematics Department',
    desc: 'Differential and integral calculus for beginners.',
    longDesc:
      'Study limits, derivatives, applications of differentiation, integrals, and basic techniques used in engineering mathematics.',
    modules: 10,
    duration: '12-14 Hours',
    level: 'Beginner',
    xp: 1100,
    badge: 'Calculus Starter',
    icon: '∫',
    color: 'from-amber-500 to-orange-400',
    outcomes: [
      'Understand limits and continuity',
      'Differentiate standard functions',
      'Apply derivatives to real problems',
      'Solve basic integration problems',
    ],
    lessons: [
      ['Introduction', ['Functions', 'Limits and continuity']],
      ['Module 1', ['Derivatives', 'Rules of differentiation']],
      ['Module 2', ['Applications of derivatives', 'Maxima and minima']],
      ['Module 3', ['Integrals', 'Area under curves']],
    ],
  },
  {
    title: 'Physics for Engineering',
    category: 'Physics',
    professor: 'Dr. Nandita Sen',
    department: 'Physics Department',
    desc: 'Mechanics, electricity, and modern physics concepts.',
    longDesc:
      'This course introduces engineering physics through mechanics, waves, electricity, magnetism, optics, and modern physics foundations.',
    modules: 9,
    duration: '11-13 Hours',
    level: 'Beginner',
    xp: 1050,
    badge: 'Physics Explorer',
    icon: '⚛',
    color: 'from-rose-400 to-pink-500',
    outcomes: [
      'Understand mechanics and motion',
      'Apply electricity and magnetism concepts',
      'Learn wave and optics principles',
      'Connect physics to engineering systems',
    ],
    lessons: [
      ['Introduction', ['Measurements', 'Vectors']],
      ['Module 1', ['Newtonian mechanics', 'Work and energy']],
      ['Module 2', ['Electricity', 'Magnetism']],
      ['Module 3', ['Waves', 'Optics']],
    ],
  },
  {
    title: 'Python Programming',
    category: 'Computer Science',
    professor: 'Ms. Priya Kapoor',
    department: 'Computer Science Department',
    desc: 'Learn Python programming from basics to advanced.',
    longDesc:
      'Learn Python syntax, control flow, functions, data structures, file handling, and practical programming patterns.',
    modules: 8,
    duration: '10-12 Hours',
    level: 'Beginner',
    xp: 1150,
    badge: 'Python Coder',
    icon: '⌘',
    color: 'from-yellow-300 to-orange-300',
    outcomes: [
      'Write clean Python programs',
      'Use lists, dictionaries, and functions',
      'Handle files and errors',
      'Build small practical applications',
    ],
    lessons: [
      ['Introduction', ['Python setup', 'Syntax basics']],
      ['Module 1', ['Variables', 'Conditionals', 'Loops']],
      ['Module 2', ['Functions', 'Lists and dictionaries']],
      ['Module 3', ['Files', 'Error handling']],
    ],
  },
  {
    title: 'Operating Systems',
    category: 'Computer Science',
    professor: 'Dr. Sameer Iqbal',
    department: 'Computer Science Department',
    desc: 'Study processes, memory management and OS concepts.',
    longDesc:
      'Explore process scheduling, memory management, file systems, synchronization, deadlocks, and operating system services.',
    modules: 7,
    duration: '9-12 Hours',
    level: 'Intermediate',
    xp: 1250,
    badge: 'OS Analyst',
    icon: '▥',
    color: 'from-teal-500 to-cyan-600',
    outcomes: [
      'Understand processes and threads',
      'Analyze CPU scheduling algorithms',
      'Learn memory management techniques',
      'Identify deadlock handling strategies',
    ],
    lessons: [
      ['Introduction', ['OS overview', 'System calls']],
      ['Module 1', ['Processes', 'Threads']],
      ['Module 2', ['Scheduling', 'Synchronization']],
      ['Module 3', ['Memory', 'File systems']],
    ],
  },
  {
    title: 'Artificial Intelligence',
    category: 'Computer Science',
    professor: 'Dr. Rohan Sethi',
    department: 'Computer Science Department',
    desc: 'Introduction to AI concepts and machine learning.',
    longDesc:
      'This course introduces intelligent agents, search algorithms, knowledge representation, machine learning basics, and AI applications.',
    modules: 8,
    duration: '12-15 Hours',
    level: 'Advanced',
    xp: 1400,
    badge: 'AI Thinker',
    icon: '☼',
    color: 'from-violet-600 to-indigo-500',
    outcomes: [
      'Understand intelligent agents',
      'Apply search algorithms',
      'Learn machine learning basics',
      'Explore AI use cases and ethics',
    ],
    lessons: [
      ['Introduction', ['What is AI?', 'Intelligent agents']],
      ['Module 1', ['Search algorithms', 'Problem solving']],
      ['Module 2', ['Knowledge representation', 'Reasoning']],
      ['Module 3', ['Machine learning basics', 'AI ethics']],
    ],
  },
];

export default function BrowseCourses({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);

  if (activeCourse) {
    return (
      <CoursePage
        course={activeCourse}
        onBack={() => setActiveCourse(null)}
        showProfileCard={showProfileCard}
        setShowProfileCard={setShowProfileCard}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      <MainSidebar currentPage={currentPage} setPage={setPage} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <Topbar
          title="BROWSE COURSES"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-7">
          <div className="flex h-[54px] items-center gap-4 rounded-xl border border-[#eadfd8] bg-white px-5">
            <span className="text-xl text-slate-400">⌕</span>
            <input
              type="text"
              placeholder="Search for courses..."
              className="flex-1 bg-transparent text-sm font-medium text-slate-600 outline-none placeholder:text-slate-400"
            />
            <button className="h-11 rounded-lg bg-[#06275b] px-10 text-sm font-bold text-white">
              Search
            </button>
          </div>

          <h2 className="mt-7 text-lg font-bold text-[#0b1a30]">All Courses</h2>

          <div className="mt-4 grid grid-cols-4 gap-5">
            {courses.map((course) => (
              <CourseCard
                key={course.title}
                course={course}
                onView={() => setSelectedCourse(course)}
              />
            ))}
          </div>
        </section>
      </main>

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onOpenPage={() => {
            setActiveCourse(selectedCourse);
            setSelectedCourse(null);
          }}
        />
      )}
    </div>
  );
}

function Topbar({ title, showProfileCard, setShowProfileCard }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#eaddd3] px-10">
      <h1 className="font-serif text-[34px] font-black tracking-wide text-[#0b1a30]">
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
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0b1a30] text-sm font-bold text-white">
            ST
          </div>

          <div>
            <small className="block text-[11px] text-slate-500">Welcome,</small>
            <h4 className="text-[13px] font-bold text-[#0b1a30]">Student</h4>
          </div>

          <span className="text-slate-500">⌄</span>
        </div>

        {showProfileCard && (
          <div className="profile-card absolute right-0 top-[70px] z-50 flex w-[260px] flex-col items-center rounded-[14px] border border-[#eaddd3] bg-white p-6 text-center shadow-xl">
            <div className="mb-3 grid h-[54px] w-[54px] place-items-center rounded-full bg-[#0b1a30] text-lg font-bold text-white">
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

function MainSidebar({ currentPage, setPage }) {
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

function CourseCard({ course, onView }) {
  return (
    <div
      className={`flex min-h-[210px] flex-col justify-between rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-md ${
        course.title === 'Data Structures'
          ? 'border-[#0b1a30]'
          : 'border-[#eadfd8]'
      }`}
    >
      <div>
        <div className="flex items-start gap-4">
          <div
            className={`grid h-[58px] w-[58px] shrink-0 place-items-center rounded-xl bg-gradient-to-br ${course.color} text-xl font-bold text-white`}
          >
            {course.icon}
          </div>

          <div>
            <h3 className="text-sm font-bold leading-5 text-[#0b1a30]">
              {course.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{course.category}</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-5 text-slate-600">{course.desc}</p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">
          ▥ {course.modules} Modules
        </p>

        <button
          onClick={onView}
          className="h-9 rounded-md bg-[#06275b] px-4 text-xs font-bold text-white"
        >
          View Course
        </button>
      </div>
    </div>
  );
}

function CourseModal({ course, onClose, onOpenPage }) {
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-slate-950/30 px-6">
      <div className="modal-card w-full max-w-4xl rounded-2xl border border-[#eadfd8] bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className={`grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${course.color} text-2xl font-bold text-white`}
            >
              {course.icon}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0b1a30]">
                {course.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Professor: {course.professor}
              </p>
              <p className="mt-1 text-sm text-slate-500">{course.department}</p>
            </div>
          </div>

          <button onClick={onClose} className="text-2xl text-slate-400">
            ×
          </button>
        </div>

        <div className="mt-7 grid grid-cols-[1.2fr_0.8fr] gap-7">
          <div>
            <h3 className="font-bold text-[#0b1a30]">Course Description</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {course.longDesc}
            </p>

            <h3 className="mt-6 font-bold text-[#0b1a30]">What You'll Learn</h3>
            <ul className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600">
              {course.outcomes.map((item) => (
                <li key={item}>◎ {item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <InfoBox label="Total XP" value={course.xp} icon="XP" />
            <InfoBox label="Badge to Earn" value={course.badge} icon="🏆" />
            <InfoBox label="Level" value={course.level} icon="▦" />
            <InfoBox label="Duration" value={course.duration} icon="◷" />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-[#eee5df] pt-5">
          <button
            onClick={onClose}
            className="h-11 rounded-lg border border-[#e3d2c4] px-6 text-sm font-bold text-slate-600"
          >
            Close
          </button>

          <button
            onClick={onOpenPage}
            className="h-11 rounded-lg bg-[#06275b] px-8 text-sm font-bold text-white"
          >
            Open Course Page
          </button>
        </div>
      </div>
    </div>
  );
}

function CoursePage({ course, onBack, showProfileCard, setShowProfileCard }) {
  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      <CourseLessonSidebar course={course} onBack={onBack} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <Topbar
          title={course.title.toUpperCase()}
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-7">
          <button
            onClick={onBack}
            className="mb-8 text-sm font-semibold text-slate-500 hover:text-[#0b1a30]"
          >
            ‹ Back to Browse Courses
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div
                className={`grid h-[110px] w-[110px] place-items-center rounded-2xl bg-gradient-to-br ${course.color} text-4xl font-bold text-white`}
              >
                {course.icon}
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#0b1a30]">
                  {course.title}
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Professor: {course.professor}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {course.department}
                </p>

                <div className="mt-6 flex gap-8 text-sm text-slate-600">
                  <span>▥ {course.modules} Modules</span>
                  <span>▥ {course.level}</span>
                  <span>◷ {course.duration}</span>
                </div>
              </div>
            </div>

            <button className="h-12 rounded-lg bg-[#06275b] px-10 text-sm font-bold text-white">
              Enroll Now
            </button>
          </div>

          <div className="mt-10 min-h-[560px] rounded-xl border border-[#eadfd8] bg-white"></div>
        </section>
      </main>
    </div>
  );
}

function CourseLessonSidebar({ course, onBack }) {
  return (
    <aside className="w-[280px] shrink-0 border-r border-[#ebdcd0] bg-[#f3eae2] px-6 py-8">
      <h2 className="font-serif text-2xl font-black tracking-wide text-[#0b1a30]">
        NAME
      </h2>

      <button
        onClick={onBack}
        className="mt-8 text-sm font-bold text-slate-500 hover:text-[#0b1a30]"
      >
        ‹ Browse Courses
      </button>

      <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-[#0b1a30]">
        {course.title}
      </h3>

      <nav className="mt-5 flex flex-col gap-4">
        {course.lessons.map(([title, items], index) => (
          <LessonGroup
            key={title}
            title={title}
            items={items}
            defaultOpen={index < 2}
          />
        ))}
      </nav>
    </aside>
  );
}

function MenuGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

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

function LessonGroup({ title, items, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-bold text-[#0b1a30] hover:bg-[#e7d9cf]"
      >
        <span>{title}</span>
        <span className="text-xs text-slate-500">{open ? '⌃' : '⌄'}</span>
      </button>

      {open && (
        <div className="mt-1 flex flex-col gap-1 pl-4">
          {items.map((item) => (
            <button
              key={item}
              className="rounded-md px-3 py-2 text-left text-xs font-medium text-slate-500 hover:bg-white hover:text-[#0b1a30]"
            >
              {item}
            </button>
          ))}
        </div>
      )}
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

function InfoBox({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#fbf8f5] p-4">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-bold text-[#0b1a30]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <h4 className="font-bold text-[#0b1a30]">{value}</h4>
      </div>
    </div>
  );
}
