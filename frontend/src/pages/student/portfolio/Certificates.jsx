import React, { useState, useMemo } from 'react';
import { MainSidebar, Topbar } from '../Dashboard';

const initialCertificatesData = [
  {
    id: 'c1',
    title: 'Data Structures',
    date: 'Completed on May 12, 2024',
    status: 'Verified',
    category: 'Computer Science',
    year: '2024',
    borderColor: 'border-purple-300',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'c2',
    title: 'Python Programming',
    date: 'Completed on Apr 28, 2024',
    status: 'Verified',
    category: 'Computer Science',
    year: '2024',
    borderColor: 'border-blue-300',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'c3',
    title: 'Database Systems',
    date: 'Completed on Mar 20, 2024',
    status: 'Verified',
    category: 'Computer Science',
    year: '2024',
    borderColor: 'border-emerald-300',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'c4',
    title: 'Algorithms',
    date: 'Completed on Feb 15, 2024',
    status: 'Verified',
    category: 'Computer Science',
    year: '2024',
    borderColor: 'border-amber-300',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'c5',
    title: 'Operating Systems',
    date: 'Completed on Jan 10, 2024',
    status: 'Verified',
    category: 'Computer Science',
    year: '2024',
    borderColor: 'border-purple-300',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'c6',
    title: 'Computer Networks',
    date: 'Completed on Dec 22, 2023',
    status: 'Verified',
    category: 'Computer Science',
    year: '2023',
    borderColor: 'border-teal-300',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'c7',
    title: 'Machine Learning Basics',
    date: 'In Progress',
    status: 'In Progress',
    category: 'Data Science',
    year: '2023',
    borderColor: 'border-amber-300',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'c8',
    title: 'Web Development',
    date: 'Expired on Oct 05, 2023',
    status: 'Expired',
    category: 'Web Development',
    year: '2023',
    borderColor: 'border-slate-300',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
  },
];

export default function Certificates({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [activeTab, setActiveTab] = useState('All Certificates'); // 'All Certificates' | 'Verified' | 'In Progress' | 'Expired'

  // Filter States
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredCertificates = useMemo(() => {
    return initialCertificatesData.filter((cert) => {
      const matchesTab =
        activeTab === 'All Certificates' || cert.status === activeTab;
      const matchesCategory =
        categoryFilter === 'All Categories' || cert.category === categoryFilter;
      const matchesStatus =
        statusFilter === 'All Status' || cert.status === statusFilter;
      const matchesYear =
        yearFilter === 'All Years' || cert.year === yearFilter;
      const matchesSearch = cert.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return (
        matchesTab &&
        matchesCategory &&
        matchesStatus &&
        matchesYear &&
        matchesSearch
      );
    });
  }, [activeTab, categoryFilter, statusFilter, yearFilter, searchQuery]);

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      {/* Replaced outdated CustomSidebar with your live central MainSidebar layout */}
      <MainSidebar currentPage={currentPage} setPage={setPage} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <Topbar
          title="CERTIFICATES"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-6">
          <p className="text-sm text-slate-500 font-medium">
            Showcasing your achievements and milestones in your learning
            journey.
          </p>

          {/* Top Metric Cards Row Grid */}
          <div className="mt-6 grid grid-cols-4 gap-5">
            <SummaryCard
              title="Total Certificates"
              val="12"
              sub="Overall Certificates Earned"
              icon="📜"
              color="bg-purple-50 text-purple-600"
            />
            <SummaryCard
              title="Completed Courses"
              val="12"
              sub="Certificates from courses"
              icon="🏅"
              color="bg-emerald-50 text-emerald-600"
            />
            <SummaryCard
              title="This Year"
              val="7"
              sub="Certificates earned in 2024"
              icon="📅"
              color="bg-orange-50 text-orange-600"
            />
            <SummaryCard
              title="Verified Certificates"
              val="10"
              sub="Shareable & Verified"
              icon="🛡️"
              color="bg-sky-50 text-sky-600"
            />
          </div>

          {/* Filters Toolbar Row */}
          <div className="mt-8 flex items-end justify-between gap-4">
            <div className="flex gap-4">
              <ToolbarSelect
                label="Categories"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                options={[
                  'All Categories',
                  'Computer Science',
                  'Data Science',
                  'Web Development',
                ]}
              />
              <ToolbarSelect
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={['All Status', 'Verified', 'In Progress', 'Expired']}
              />
              <ToolbarSelect
                label="Years"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                options={['All Years', '2023', '2024']}
              />
            </div>

            <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
              <div className="relative w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#ebdcd0] bg-white py-2 pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ⌕
                </span>
              </div>
              <button className="flex h-9 items-center gap-2 rounded-xl border border-[#ebdcd0] bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
                📤 Export All
              </button>
            </div>
          </div>

          {/* Tab Navigation Navigation Filter Row */}
          <div className="mt-8 flex items-center justify-between border-b border-[#ebdcd0] pb-px">
            <div className="flex gap-8 text-sm font-bold">
              {['All Certificates', 'Verified', 'In Progress', 'Expired'].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 transition-all relative ${activeTab === tab
                      ? 'text-violet-600 font-extrabold'
                      : 'text-slate-400 hover:text-slate-600'
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
                    )}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Sort by:
              </span>
              <select className="appearance-none rounded-xl border border-[#ebdcd0] bg-white py-2 pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
            </div>
          </div>

          {/* Core Grid Matrix Layout Panel */}
          <div className="mt-6 grid grid-cols-4 gap-5">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-xl border border-[#eadfd8] bg-white p-4 flex flex-col justify-between transition hover:shadow-md"
              >
                {/* Visual Representation Graphic Canvas Block */}
                <div
                  className={`relative aspect-[1.4/1] rounded-lg border-4 ${cert.borderColor} bg-amber-50/20 p-4 flex flex-col justify-between items-center text-center overflow-hidden`}
                >
                  <span
                    className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full border ${cert.badgeColor}`}
                  >
                    {cert.status === 'Verified' && '✓ '} {cert.status}
                  </span>

                  <div className="mt-3">
                    <p className="text-[7px] tracking-widest font-serif font-bold text-slate-400 uppercase">
                      Certificate of Completion
                    </p>
                    <p className="text-[6px] text-slate-400 mt-0.5">
                      This is to certify that
                    </p>
                    <h4 className="font-serif font-bold text-xs text-[#0b1a30] mt-1">
                      Student
                    </h4>
                    <p className="text-[5px] text-slate-400 border-t border-slate-200 pt-1 w-20 mx-auto mt-1">
                      has successfully completed
                    </p>
                    <p className="text-[9px] font-bold text-[#0b1a30] leading-tight px-2 mt-1 truncate max-w-[140px]">
                      {cert.title}
                    </p>
                  </div>

                  <div className="w-full flex justify-between items-end text-[5px] text-slate-400 px-1">
                    <span>{cert.year}</span>
                    <span className="text-[12px] text-amber-600/60 leading-none">
                      🎖️
                    </span>
                    <span className="italic font-serif">Instructor</span>
                  </div>
                </div>

                {/* Information Descriptive Metas */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-[#0b1a30] truncate">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {cert.date}
                  </p>
                </div>

                {/* Operations Interactivity Button Drawer Line */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  {cert.status === 'In Progress' ? (
                    <>
                      <button
                        className="flex-1 h-8 rounded-lg bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed"
                        disabled
                      >
                        View
                      </button>
                      <button className="flex-1 h-8 rounded-lg border border-sky-200 text-sky-600 text-xs font-bold hover:bg-sky-50 transition">
                        🔄 Continue
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 h-8 rounded-lg bg-[#06275b] text-white text-xs font-bold hover:bg-[#0b1a30] transition">
                        View
                      </button>
                      <button className="flex-1 h-8 rounded-lg border border-[#ebdcd0] text-slate-600 text-xs font-bold hover:bg-slate-50 transition">
                        📥 Download
                      </button>
                    </>
                  )}
                  <button className="h-8 w-8 rounded-lg border border-[#ebdcd0] bg-white grid place-items-center text-slate-400 hover:text-slate-600 transition">
                    🔗
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Security Banner */}
          <div className="mt-8 flex items-center justify-between rounded-xl border border-[#ebdcd0] bg-sky-50/40 p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-100 text-sky-600 text-lg">
                🛡️
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0b1a30]">
                  Verify Your Certificate
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  All verified certificates are securely issued and can be
                  shared on LinkedIn or other platforms.
                </p>
              </div>
            </div>
            <button className="h-9 rounded-lg bg-[#06275b] px-5 text-xs font-bold text-white hover:bg-[#0b1a30] transition">
              Verify Certificate ↗
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// Internal Utility Layout Elements
function SummaryCard({ title, val, sub, icon, color }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#eae1d8] bg-white p-4.5 shadow-sm">
      <div
        className={`grid h-11 w-11 place-items-center rounded-full text-base ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <h3 className="text-lg font-black text-[#0b1a30] mt-0.5">{val}</h3>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

// Dropdown Helper Component
function ToolbarSelect({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col min-w-[140px]">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-[#ebdcd0] bg-white py-2 px-4 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}