import React, { useState } from 'react';
import { MainSidebar, Topbar } from '../Dashboard';

// Courses list containing details needed for the CoursePage view
const initialCoursesData = [
  {
    title: 'Data Structures',
    category: 'Computer Science',
    professor: 'Dr. Arindam Chatterjee',
    department: 'Computer Science Department',
    status: 'In Progress',
    progress: 75,
    completedModules: 6,
    totalModules: 8,
    modules: 8,
    duration: '10-12 Hours',
    level: 'Intermediate',
    xp: 1200,
    badge: 'Data Master',
    icon: '</>',
    color: 'from-violet-600 to-purple-500',
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
    status: 'In Progress',
    progress: 60,
    completedModules: 4,
    totalModules: 7,
    modules: 7,
    duration: '9-11 Hours',
    level: 'Beginner',
    xp: 1000,
    badge: 'Query Expert',
    icon: '▣',
    color: 'from-sky-600 to-cyan-500',
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
    status: 'In Progress',
    progress: 40,
    completedModules: 4,
    totalModules: 10,
    modules: 10,
    duration: '8-10 Hours',
    level: 'Intermediate',
    xp: 950,
    badge: 'Logic Builder',
    icon: '▤',
    color: 'from-emerald-500 to-green-600',
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
    status: 'Completed',
    progress: 100,
    completedModules: 10,
    totalModules: 10,
    modules: 10,
    duration: '12-14 Hours',
    level: 'Beginner',
    xp: 1100,
    badge: 'Calculus Starter',
    icon: '∫',
    color: 'from-amber-500 to-orange-400',
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
    status: 'In Progress',
    progress: 65,
    completedModules: 6,
    totalModules: 9,
    modules: 9,
    duration: '11-13 Hours',
    level: 'Beginner',
    xp: 1050,
    badge: 'Physics Explorer',
    icon: '⚛',
    color: 'from-rose-400 to-pink-500',
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
    status: 'Completed',
    progress: 100,
    completedModules: 8,
    totalModules: 8,
    modules: 8,
    duration: '10-12 Hours',
    level: 'Beginner',
    xp: 1150,
    badge: 'Python Coder',
    icon: '⌘',
    color: 'from-yellow-400 to-orange-400',
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
    status: 'In Progress',
    progress: 50,
    completedModules: 4,
    totalModules: 8,
    modules: 8,
    duration: '9-12 Hours',
    level: 'Intermediate',
    xp: 1250,
    badge: 'OS Analyst',
    icon: '▥',
    color: 'from-teal-500 to-cyan-600',
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
    status: 'In Progress',
    progress: 20,
    completedModules: 2,
    totalModules: 8,
    modules: 8,
    duration: '12-15 Hours',
    level: 'Advanced',
    xp: 1400,
    badge: 'AI Thinker',
    icon: '☼',
    color: 'from-violet-600 to-indigo-500',
    lessons: [
      ['Introduction', ['What is AI?', 'Intelligent agents']],
      ['Module 1', ['Search algorithms', 'Problem solving']],
      ['Module 2', ['Knowledge representation', 'Reasoning']],
      ['Module 3', ['Machine learning basics', 'AI ethics']],
    ],
  },
];

export default function MyLearning({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [filter, setFilter] = useState('All Courses');
  const [activeCourse, setActiveCourse] = useState(null);

  // Compute dynamic counts
  const totalCount = initialCoursesData.length;
  const inProgressCount = initialCoursesData.filter(
    (c) => c.status === 'In Progress'
  ).length;
  const completedCount = initialCoursesData.filter(
    (c) => c.status === 'Completed'
  ).length;

  // Filter courses dynamically based on selection
  const filteredCourses = initialCoursesData.filter((course) => {
    if (filter === 'In Progress') return course.status === 'In Progress';
    if (filter === 'Completed') return course.status === 'Completed';
    return true; // 'All Courses'
  });

  // When a course is selected, render the exact same CoursePage view
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
          title="MY LEARNING"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-8">
          {/* Filter Cards Row */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div
              onClick={() => setFilter('All Courses')}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                filter === 'All Courses'
                  ? 'border-[#06275b] bg-[#f0f4f9] shadow-sm'
                  : 'border-[#eadfd8] bg-white hover:border-slate-400'
              }`}
            >
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Total Courses
              </p>
              <h3 className="text-2xl font-bold text-[#0b1a30] mt-1">
                {totalCount}
              </h3>
            </div>

            <div
              onClick={() => setFilter('In Progress')}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                filter === 'In Progress'
                  ? 'border-[#06275b] bg-[#f0f4f9] shadow-sm'
                  : 'border-[#eadfd8] bg-white hover:border-slate-400'
              }`}
            >
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                In Progress
              </p>
              <h3 className="text-2xl font-bold text-[#0b1a30] mt-1">
                {inProgressCount}
              </h3>
            </div>

            <div
              onClick={() => setFilter('Completed')}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                filter === 'Completed'
                  ? 'border-[#06275b] bg-[#f0f4f9] shadow-sm'
                  : 'border-[#eadfd8] bg-white hover:border-slate-400'
              }`}
            >
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Completed
              </p>
              <h3 className="text-2xl font-bold text-[#0b1a30] mt-1">
                {completedCount}
              </h3>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#0b1a30] tracking-tight">
                {filter === 'All Courses' ? 'Continue Learning' : filter}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Showing {filteredCourses.length} {filter.toLowerCase()} courses
              </p>
            </div>

            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none cursor-pointer rounded-xl border border-[#eadfd8] bg-white pl-4 pr-10 py-2.5 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-400"
              >
                <option value="All Courses">All Courses</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-slate-500">
                ⌄
              </span>
            </div>
          </div>

          {/* Filtered Courses List */}
          <div className="grid grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.title}
                onClick={() => setActiveCourse(course)}
                className="cursor-pointer rounded-xl border border-[#eadfd8] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${course.color} text-xl font-bold text-white`}
                  >
                    {course.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#0b1a30] truncate leading-snug">
                        {course.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          course.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-xs font-semibold text-slate-500">
                      <span>Progress</span>
                      <span className="text-[#0b1a30]">{course.progress}%</span>
                    </div>

                    <div className="h-1.5 w-full bg-[#f1eae2] rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#f1eae2] mt-5 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-sm">📖</span>
                    <span>
                      {course.completedModules} of {course.totalModules} Modules
                      Completed
                    </span>
                  </div>

                  {/* Arrow Button trigger */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCourse(course);
                    }}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#eadfd8] bg-white text-slate-500 transition hover:bg-[#fbf8f5] hover:text-[#0b1a30] cursor-pointer"
                  >
                    <span className="text-base font-medium leading-none pb-0.5">
                      ›
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Course Page Component shared directly in the view
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
            ‹ Back to My Learning
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
              Continue Course
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
        ‹ My Learning
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
