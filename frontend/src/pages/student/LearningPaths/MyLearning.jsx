import React, { useState } from 'react';
// Import layout structures from your shared dashboard file
import { MainSidebar, Topbar } from '../Dashboard';

const initialCoursesData = [
  {
    title: 'Data Structures',
    progress: 75,
    completedModules: 6,
    totalModules: 8,
    icon: '</>',
    color: 'from-violet-600 to-purple-500',
  },
  {
    title: 'Database Systems',
    progress: 60,
    completedModules: 4,
    totalModules: 7,
    icon: '▣',
    color: 'from-sky-600 to-cyan-500',
  },
  {
    title: 'Digital Logic Design',
    progress: 40,
    completedModules: 4,
    totalModules: 10,
    icon: '▤',
    color: 'from-emerald-500 to-green-600',
  },
  {
    title: 'Calculus I',
    progress: 30,
    completedModules: 3,
    totalModules: 10,
    icon: '∫',
    color: 'from-amber-500 to-orange-400',
  },
  {
    title: 'Physics for Engineering',
    progress: 65,
    completedModules: 6,
    totalModules: 9,
    icon: '⚛',
    color: 'from-rose-400 to-pink-500',
  },
  {
    title: 'Python Programming',
    progress: 80,
    completedModules: 7,
    totalModules: 8,
    icon: '⌘',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    title: 'Operating Systems',
    progress: 50,
    completedModules: 4,
    totalModules: 8,
    icon: '▥',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    title: 'Artificial Intelligence',
    progress: 20,
    completedModules: 2,
    totalModules: 8,
    icon: '☼',
    color: 'from-violet-600 to-indigo-500',
  },
];

export default function MyLearning({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [filter, setFilter] = useState('All Courses');

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      {/* Sidebar Component */}
      <MainSidebar currentPage={currentPage} setPage={setPage} />

      {/* Main Container Area */}
      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        {/* Synchronized Dashboard Topbar */}
        <Topbar
          title="MY LEARNING"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        {/* Dashboard Content Panel */}
        <section className="px-10 py-8">
          {/* Header Action Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#0b1a30] tracking-tight">
                Continue Learning
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Pick up where you left off
              </p>
            </div>

            {/* Content Filter Dropdown */}
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

          {/* 2-Column Responsive Card Grid */}
          <div className="grid grid-cols-2 gap-6">
            {initialCoursesData.map((course) => (
              <div
                key={course.title}
                className="rounded-xl border border-[#eadfd8] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                {/* Upper Module Info Area */}
                <div className="flex items-start gap-4">
                  {/* Decorative Gradient Vector Badge */}
                  <div
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${course.color} text-xl font-bold text-white`}
                  >
                    {course.icon}
                  </div>

                  {/* Title & Static Progress Counter Row */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#0b1a30] truncate leading-snug">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between mt-3 text-xs font-semibold text-slate-500">
                      <span>Progress</span>
                      <span className="text-[#0b1a30]">{course.progress}%</span>
                    </div>

                    {/* Progress Track Blueprint */}
                    <div className="h-1.5 w-full bg-[#f1eae2] rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Lower Action Base Frame */}
                <div className="border-t border-[#f1eae2] mt-5 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-sm">📖</span>
                    <span>
                      {course.completedModules} of {course.totalModules} Modules
                      Completed
                    </span>
                  </div>

                  {/* Forward Navigation Anchor Component */}
                  <button className="grid h-9 w-9 place-items-center rounded-lg border border-[#eadfd8] bg-white text-slate-500 transition hover:bg-[#fbf8f5] hover:text-[#0b1a30]">
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
