import React, { useState } from 'react';
import { MainSidebar, Topbar } from '../Dashboard';

import { Loader2 } from "lucide-react";
import api from "../../../services/api";

export default function MyLearning({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [filter, setFilter] = useState('All Courses');
  const [activeCourse, setActiveCourse] = useState(null);

  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.getStudentMyLearning();
        setCourses(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getCourseStyle = (index) => {
    const styles = [
      { icon: '</>', color: 'from-violet-600 to-purple-500' },
      { icon: '▣', color: 'from-sky-600 to-cyan-500' },
      { icon: '▤', color: 'from-emerald-500 to-green-600' },
      { icon: '∫', color: 'from-amber-500 to-orange-400' },
    ];
    return styles[index % styles.length];
  };

  const totalCount = courses.length;
  const inProgressCount = courses.filter((c) => c.status === 'In Progress').length;
  const completedCount = courses.filter((c) => c.status === 'Completed').length;

  const filteredCourses = courses.filter((course) => {
    if (filter === 'In Progress') return course.status === 'In Progress';
    if (filter === 'Completed') return course.status === 'Completed';
    return true; 
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
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${filter === 'All Courses'
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
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${filter === 'In Progress'
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
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${filter === 'Completed'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center p-12">
                <Loader2 className="animate-spin text-slate-400" size={32} />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full flex justify-center p-12 text-slate-500">
                No courses found.
              </div>
            ) : filteredCourses.map((course, idx) => {
              const { icon, color } = getCourseStyle(idx);
              const progressPct = course.progress || 0;
              return (
              <div
                key={idx}
                className="group flex flex-col bg-white rounded-xl border border-[#eadfd8] overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`h-24 w-full bg-gradient-to-r ${color} relative`}
                >
                  <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-slate-100">
                    {icon}
                  </div>
                </div>

                <div className="p-6 pt-10 flex-1 flex flex-col">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {course.department || course.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#0b1a30] mt-1 leading-tight group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-semibold text-[#0b1a30]">
                        {progressPct}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#f0f4f9] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 text-right">
                      {course.completed_modules || course.completedModules} / {course.total_modules || course.totalModules} Modules
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveCourse({...course, icon, color})}
                    className="w-full py-2.5 rounded-lg border border-[#eadfd8] text-sm font-semibold text-slate-700 hover:bg-[#f0f4f9] hover:border-slate-300 transition-colors"
                  >
                    {course.status === 'Completed' ? 'Review Course' : 'Continue Learning'}
                  </button>
                </div>
              </div>
            )})}
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
        {(course.lessons || []).map(([title, items], index) => (
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
