import React, { useState, useMemo } from 'react';
import { MainSidebar, Topbar } from '../Dashboard';

const allBadgesData = [
  // Earned Badges
  {
    id: 'b1',
    title: 'Data Master',
    desc: 'Complete the Data Structures course',
    status: 'earned',
    date: 'Earned on May 12, 2024',
    xp: '+250 XP',
    icon: '🎓',
    color: 'from-purple-600 to-indigo-600',
  },
  {
    id: 'b2',
    title: 'Code Explorer',
    desc: 'Complete 5 programming courses',
    status: 'earned',
    date: 'Earned on Apr 28, 2024',
    xp: '+200 XP',
    icon: 'Code',
    color: 'from-emerald-600 to-teal-500',
  },
  {
    id: 'b3',
    title: 'Top Performer',
    desc: 'Rank in top 10 on the leaderboard',
    status: 'earned',
    date: 'Earned on Apr 15, 2024',
    xp: '+300 XP',
    icon: '🏆',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'b4',
    title: 'Consistent Learner',
    desc: 'Maintain a 7-day learning streak',
    status: 'earned',
    date: 'Earned on Apr 10, 2024',
    xp: '+150 XP',
    icon: '⏱',
    color: 'from-sky-600 to-blue-500',
  },
  {
    id: 'b5',
    title: 'Quick Learner',
    desc: 'Complete 3 courses in 30 days',
    status: 'earned',
    date: 'Earned on Mar 30, 2024',
    xp: '+200 XP',
    icon: '📖',
    color: 'from-fuchsia-600 to-pink-500',
  },

  // Locked Badges
  {
    id: 'b6',
    title: 'AI Enthusiast',
    desc: 'Complete all AI related courses',
    status: 'locked',
    xp: '+300 XP',
    icon: '🧠',
    progress: 40,
    label: '2 / 5 courses',
  },
  {
    id: 'b7',
    title: 'Perfect Score',
    desc: 'Score 100% in 5 quizzes',
    status: 'locked',
    xp: '+250 XP',
    icon: '⭐',
    progress: 40,
    label: '2 / 5 quizzes',
  },
  {
    id: 'b8',
    title: 'Full Stack Learner',
    desc: 'Complete Full Stack Developer path',
    status: 'locked',
    xp: '+500 XP',
    icon: '💻',
    progress: 40,
    label: '40% completed',
  },
  {
    id: 'b9',
    title: 'Streak Master',
    desc: 'Maintain a 30-day learning streak',
    status: 'locked',
    xp: '+250 XP',
    icon: '🔥',
    progress: 40,
    label: '12 / 30 days',
  },
  {
    id: 'b10',
    title: 'Course Collector',
    desc: 'Complete 20 courses',
    status: 'locked',
    xp: '+200 XP',
    icon: '🏅',
    progress: 55,
    label: '11 / 20 courses',
  },
];

export default function Badges({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [activeTab, setActiveTab] = useState('All Badges'); // 'All Badges' | 'Earned' | 'Locked'
  const [sortBy, setSortBy] = useState('Recently Earned');

  // Filter badges data dynamically based on horizontal context bar choice
  const filteredBadges = useMemo(() => {
    let result = [...allBadgesData];
    if (activeTab === 'Earned')
      result = result.filter((b) => b.status === 'earned');
    if (activeTab === 'Locked')
      result = result.filter((b) => b.status === 'locked');
    return result;
  }, [activeTab]);

  const earnedList = filteredBadges.filter((b) => b.status === 'earned');
  const lockedList = filteredBadges.filter((b) => b.status === 'locked');

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      <MainSidebar currentPage={currentPage} setPage={setPage} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <Topbar
          title="BADGES"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-6">
          <p className="text-sm text-slate-500 font-medium">
            Earn badges by completing courses, achieving milestones, and showing
            consistency in your learning journey.
          </p>

          {/* Top Grid Highlight Metrics Row Panel */}
          <div className="mt-6 grid grid-cols-4 gap-5">
            <MetricCard
              title="Badges Earned"
              val="23 / 48"
              sub="48% of all badges"
              icon="🏅"
              color="bg-indigo-50 text-indigo-600"
            />
            <MetricCard
              title="Total XP from Badges"
              val="2,450 XP"
              sub="Keep earning!"
              icon="⭐"
              color="bg-amber-50 text-amber-600"
            />
            <MetricCard
              title="Recently Earned"
              val="3 Badges"
              sub="In the last 30 days"
              icon="📅"
              color="bg-emerald-50 text-emerald-600"
            />
            <MetricCard
              title="Next Badge"
              val="350 XP away"
              sub=""
              icon="🎯"
              color="bg-sky-50 text-sky-600"
              hasProgress={true}
            />
          </div>

          {/* Filtering Sub-Header Interface Row */}
          <div className="mt-8 flex items-center justify-between border-b border-[#ebdcd0] pb-px">
            <div className="flex gap-8 text-sm font-bold">
              {['All Badges', 'Earned', 'Locked'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 transition-all relative ${
                    activeTab === tab
                      ? 'text-violet-600 font-extrabold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-[#ebdcd0] bg-white py-2 pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option>Recently Earned</option>
                <option>XP Value</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>

          {/* SECTION: Earned Badges Carousel Grid Window */}
          {earnedList.length > 0 && (
            <div className="mt-6 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0b1a30]">
                  Earned Badges ({earnedList.length})
                </h3>
                <button className="grid h-7 w-7 place-items-center rounded-full border border-[#ebdcd0] bg-white text-slate-500 hover:bg-slate-50 shadow-sm text-xs">
                  ➔
                </button>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-5 overflow-x-auto pb-2">
                {earnedList.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center justify-between text-center rounded-xl border border-[#eadfd8] bg-white p-5 transition hover:shadow-sm shrink-0 min-w-[190px]"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`grid h-[58px] w-[58px] place-items-center rounded-2xl bg-gradient-to-br ${badge.color} text-2xl text-white shadow-md font-bold mb-4`}
                      >
                        {badge.icon === 'Code' ? '</>' : badge.icon}
                      </div>
                      <h4 className="text-sm font-bold text-[#0b1a30] leading-tight px-1">
                        {badge.title}
                      </h4>
                      <p className="mt-1.5 text-[11px] leading-4 text-slate-400 font-medium px-2 min-h-[32px]">
                        {badge.desc}
                      </p>
                    </div>
                    <div className="w-full mt-4 pt-3 border-t border-slate-100 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400/80">
                        ✓ {badge.date}
                      </span>
                      <span className="inline-block text-[10px] font-black tracking-wide text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
                        {badge.xp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: Locked Badges Carousel Grid Window */}
          {lockedList.length > 0 && (
            <div className="mt-8 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0b1a30]">
                  Locked Badges ({lockedList.length})
                </h3>
                <button className="grid h-7 w-7 place-items-center rounded-full border border-[#ebdcd0] bg-white text-slate-500 hover:bg-slate-50 shadow-sm text-xs">
                  ➔
                </button>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-5 overflow-x-auto pb-2">
                {lockedList.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center justify-between text-center rounded-xl border border-[#eadfd8] bg-white p-5 transition hover:shadow-sm shrink-0 min-w-[190px]"
                  >
                    <div className="flex flex-col items-center w-full">
                      <div className="grid h-[58px] w-[58px] place-items-center rounded-2xl bg-slate-100 text-slate-400 border border-slate-200 text-xl font-bold mb-4 relative">
                        {badge.icon}
                        <span className="absolute -bottom-1 -right-1 bg-white text-[9px] rounded-full border border-slate-300 h-4 w-4 grid place-items-center shadow-sm">
                          🔒
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-400 leading-tight px-1">
                        {badge.title}
                      </h4>
                      <p className="mt-1.5 text-[11px] leading-4 text-slate-400 font-medium px-2 min-h-[32px]">
                        {badge.desc}
                      </p>
                    </div>
                    <div className="w-full mt-4 pt-3 border-t border-slate-100 flex flex-col items-center gap-2">
                      {/* Linear Slider Bar Layout for Goals Progression tracking */}
                      <div className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 px-1 mb-px">
                        <div className="h-1.5 bg-slate-100 rounded-full w-16 overflow-hidden">
                          <div
                            className="h-full bg-slate-400 rounded-full"
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                        <span>{badge.label}</span>
                      </div>
                      <span className="inline-block text-[10px] font-bold tracking-wide text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                        {badge.xp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informational Help Desk Callout Footer Bar banner */}
          <div className="mt-8 flex items-center justify-between rounded-xl border border-[#ebdcd0] bg-violet-50/40 p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-600 text-lg">
                💡
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0b1a30]">
                  How do I earn badges?
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Complete courses, score well in quizzes, maintain streaks, and
                  achieve milestones to earn badges and XP.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPage('learning-paths')}
              className="h-9 rounded-lg bg-[#06275b] px-5 text-xs font-bold text-white hover:bg-[#0b1a30]"
            >
              View Learning Paths
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// Sub-Component file utility widget for top metrics indicators
function MetricCard({ title, val, sub, icon, color, hasProgress = false }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#eae1d8] bg-white p-4.5 shadow-sm">
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-base font-bold ${color}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <h3 className="text-lg font-black text-[#0b1a30] mt-1">{val}</h3>
        {hasProgress ? (
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden w-4/5">
            <div
              className="h-full bg-slate-800 rounded-full"
              style={{ width: '65%' }}
            />
          </div>
        ) : (
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</p>
        )}
      </div>
    </div>
  );
}
