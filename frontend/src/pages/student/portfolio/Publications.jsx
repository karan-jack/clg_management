import React, { useState, useMemo } from 'react';
import { MainSidebar, Topbar } from '../Dashboard';

const initialPublicationsData = [
  {
    id: 'p1',
    title: 'Efficient Data Structures for Real-time Analytics',
    authors: ['Student', '+2'],
    type: 'Journal Article',
    venue: 'Journal of Computer Science (JCS)',
    date: 'May 12, 2024',
    status: 'Published',
    citations: 34,
  },
  {
    id: 'p2',
    title: 'A Comparative Study of Sorting Algorithms in Big Data',
    authors: ['Student', '+3'],
    type: 'Conference Paper',
    venue: 'IEEE International Conference on Data Engineering (ICDE)',
    date: 'Apr 25, 2024',
    status: 'Published',
    citations: 28,
  },
  {
    id: 'p3',
    title: 'Machine Learning Approaches for Anomaly Detection',
    authors: ['Student', '+1'],
    type: 'Journal Article',
    venue: 'International Journal of Machine Learning',
    date: 'Mar 10, 2024',
    status: 'Published',
    citations: 41,
  },
  {
    id: 'p4',
    title: 'Blockchain Technology: A Systematic Review',
    authors: ['Student', '+2'],
    type: 'Review Paper',
    venue: 'Computing Surveys',
    date: 'Feb 18, 2024',
    status: 'Published',
    citations: 22,
  },
  {
    id: 'p5',
    title: 'Deep Learning for Image Classification: A Survey',
    authors: ['Student', '+4'],
    type: 'Survey Paper',
    venue: 'IEEE Transactions on Neural Networks',
    date: 'Jan 05, 2024',
    status: 'Published',
    citations: 31,
  },
  {
    id: 'p6',
    title: 'Optimization Techniques in Cloud Computing',
    authors: ['Student', '+1'],
    type: 'Conference Paper',
    venue: 'ACM Symposium on Cloud Computing',
    date: 'Dec 12, 2023',
    status: 'In Review',
    citations: null,
  },
  {
    id: 'p7',
    title: 'Natural Language Processing for Sentiment Analysis',
    authors: ['Student', '+2'],
    type: 'Journal Article',
    venue: 'Expert Systems with Applications',
    date: 'May 28, 2024',
    status: 'In Review',
    citations: null,
  },
  {
    id: 'p8',
    title: 'Data Privacy and Security in IoT Networks',
    authors: ['Student', '+1'],
    type: 'Conference Paper',
    venue: 'IEEE IoT Conference',
    date: 'Jun 02, 2024',
    status: 'Draft',
    citations: null,
  },
];

export default function Publications({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [activeTab, setActiveTab] = useState('All Publications');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting state config: { key, direction }
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc',
  });

  // Filter and Sort Processing logic
  const processedData = useMemo(() => {
    let result = [...initialPublicationsData];

    // 1. Tab Status Filter
    if (activeTab !== 'All Publications') {
      result = result.filter((pub) => pub.status === activeTab);
    }

    // 2. Search Query Input Filter
    if (searchQuery.trim() !== '') {
      result = result.filter(
        (pub) =>
          pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pub.venue.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 3. Dynamic Multi-Direction Column Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key] ?? 0; // fallback for null citations
        let valB = b[sortConfig.key] ?? 0;

        if (typeof valA === 'string') {
          // Date parsing helper if sorting by the date string column
          if (sortConfig.key === 'date') {
            valA = new Date(valA);
            valB = new Date(valB);
          } else {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
          }
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [activeTab, searchQuery, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey)
      return (
        <span className="ml-1 text-[10px] text-slate-400 opacity-60">↕</span>
      );
    return sortConfig.direction === 'asc' ? (
      <span className="ml-1 text-[10px] text-[#0b1a30] font-bold">▲</span>
    ) : (
      <span className="ml-1 text-[10px] text-[#0b1a30] font-bold">▼</span>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      <MainSidebar currentPage={currentPage} setPage={setPage} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <Topbar
          title="PUBLICATIONS"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-6">
          <p className="text-sm text-slate-500 font-medium">
            Track and showcase your research publications and contributions.
          </p>

          {/* Top Row Indicators Dashboard Panel */}
          <div className="mt-6 grid grid-cols-5 gap-4">
            <MetricCard
              title="Total Publications"
              val="18"
              sub="Across all years"
              icon="📜"
              color="bg-purple-50 text-purple-600"
            />
            <MetricCard
              title="Published"
              val="14"
              sub="77.8% of total"
              icon="✅"
              color="bg-emerald-50 text-emerald-600"
            />
            <MetricCard
              title="In Review"
              val="3"
              sub="Under review"
              icon="🕒"
              color="bg-amber-50 text-amber-600"
            />
            <MetricCard
              title="Drafts"
              val="1"
              sub="Work in progress"
              icon="📝"
              color="bg-sky-50 text-sky-600"
            />
            <MetricCard
              title="Total Citations"
              val="156"
              sub="Across all publications"
              icon="👁️"
              color="bg-violet-50 text-violet-600"
            />
          </div>

          {/* Search, Tabs & Toolbar Navigation Bar layout row */}
          <div className="mt-8 flex items-center justify-between border-b border-[#ebdcd0] pb-px">
            <div className="flex gap-8 text-sm font-bold">
              {['All Publications', 'Published', 'In Review', 'Drafts'].map(
                (tab) => (
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
                )
              )}
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#ebdcd0] bg-white py-1.5 pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ⌕
                </span>
              </div>
              <button className="flex h-8 items-center gap-1.5 rounded-xl border border-[#ebdcd0] bg-white px-3 text-xs font-bold text-slate-600 hover:bg-slate-50">
                🎛️ Filter
              </button>
              <button className="h-8 rounded-xl bg-[#06275b] px-4 text-xs font-bold text-white hover:bg-[#0b1a30] transition">
                ＋ Add Publication
              </button>
            </div>
          </div>

          {/* Main Publications Database Core Table Context Grid Wrapper */}
          <div className="mt-6 overflow-hidden rounded-xl border border-[#eadfd8] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#eadfd8] bg-slate-50/50 text-[11px] font-black uppercase tracking-wider text-[#0b1a30]">
                  <th
                    onClick={() => requestSort('title')}
                    className="cursor-pointer py-4 pl-6 w-1/3 select-none hover:bg-slate-100"
                  >
                    Title <SortIndicator columnKey="title" />
                  </th>
                  <th
                    onClick={() => requestSort('authors')}
                    className="cursor-pointer py-4 px-4 select-none hover:bg-slate-100"
                  >
                    Authors <SortIndicator columnKey="authors" />
                  </th>
                  <th
                    onClick={() => requestSort('type')}
                    className="cursor-pointer py-4 px-4 select-none hover:bg-slate-100"
                  >
                    Type <SortIndicator columnKey="type" />
                  </th>
                  <th
                    onClick={() => requestSort('venue')}
                    className="cursor-pointer py-4 px-4 w-1/4 select-none hover:bg-slate-100"
                  >
                    Venue / Journal <SortIndicator columnKey="venue" />
                  </th>
                  <th
                    onClick={() => requestSort('date')}
                    className="cursor-pointer py-4 px-4 select-none hover:bg-slate-100"
                  >
                    Date <SortIndicator columnKey="date" />
                  </th>
                  <th
                    onClick={() => requestSort('status')}
                    className="cursor-pointer py-4 px-4 select-none hover:bg-slate-100"
                  >
                    Status <SortIndicator columnKey="status" />
                  </th>
                  <th
                    onClick={() => requestSort('citations')}
                    className="cursor-pointer py-4 px-4 text-center select-none hover:bg-slate-100"
                  >
                    Citations <SortIndicator columnKey="citations" />
                  </th>
                  <th className="py-4 pr-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] font-medium text-slate-600">
                {processedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-10 text-slate-400"
                    >
                      No matching research publications found.
                    </td>
                  </tr>
                ) : (
                  processedData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-4 pl-6 font-semibold text-[#0b1a30] leading-tight">
                        {row.title}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-[#0b1a30] text-[9px] font-black text-white">
                            ST
                          </div>
                          <span className="text-xs text-slate-700 font-semibold">
                            {row.authors[0]}
                          </span>
                          {row.authors[1] && (
                            <span className="text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded font-bold">
                              {row.authors[1]}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {row.type}
                      </td>
                      <td className="py-4 px-4 text-slate-500 leading-snug">
                        {row.venue}
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                            row.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : row.status === 'In Review'
                              ? 'bg-amber-50 text-amber-600 border-amber-200'
                              : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-700">
                        {row.citations !== null ? row.citations : '—'}
                      </td>
                      <td className="py-4 pr-6 text-center select-none">
                        <button className="text-slate-400 hover:text-slate-700 font-bold text-lg tracking-tight">
                          ⋮
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Footer Controls Row component */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-white select-none">
              <span className="text-xs text-slate-400 font-medium">
                Showing 1 to {processedData.length} of {processedData.length}{' '}
                publications
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <button className="grid h-7 w-7 place-items-center rounded border border-[#eae1d8] bg-white opacity-50 cursor-not-allowed">
                  ‹
                </button>
                <button className="grid h-7 w-7 place-items-center rounded bg-[#0b1a30] text-white">
                  1
                </button>
                <button className="grid h-7 w-7 place-items-center rounded border border-[#eae1d8] bg-white hover:bg-slate-50">
                  2
                </button>
                <button className="grid h-7 w-7 place-items-center rounded border border-[#eae1d8] bg-white hover:bg-slate-50">
                  3
                </button>
                <button className="grid h-7 w-7 place-items-center rounded border border-[#eae1d8] bg-white hover:bg-slate-50">
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetricCard({ title, val, sub, icon, color }) {
  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-[#eae1d8] bg-white p-4 shadow-sm">
      <div
        className={`grid h-10 w-10 place-items-center rounded-full text-base ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <h3 className="text-lg font-black text-[#0b1a30] mt-0.5 leading-none">
          {val}
        </h3>
        <p className="text-[10px] text-slate-400 font-semibold mt-1 whitespace-nowrap">
          {sub}
        </p>
      </div>
    </div>
  );
}