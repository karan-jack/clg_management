import React, { useState, useEffect, useMemo } from 'react';
import { MainSidebar, Topbar } from '../Dashboard';
import api from '../../../services/api';
import { Loader2 } from 'lucide-react';

export default function Leaderboard({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await api.getStudentLeaderboard();
      if (res.success && res.data) {
        setLeaderboardData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [batchFilter, setBatchFilter] = useState('All Batches');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [semFilter, setSemFilter] = useState('All Semesters');
  const [sortConfig, setSortConfig] = useState({
    key: 'rank',
    direction: 'asc',
  });

  const sortedAndFilteredData = useMemo(() => {
    let processData = [...leaderboardData];

    if (batchFilter !== 'All Batches')
      processData = processData.filter((item) => item.batch === batchFilter);
    if (deptFilter !== 'All Departments')
      processData = processData.filter((item) => item.department === deptFilter);
    if (semFilter !== 'All Semesters')
      processData = processData.filter(
        (item) => item.sem === parseInt(semFilter)
      );

    if (sortConfig.key && sortConfig.direction) {
      processData.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return processData;
  }, [batchFilter, deptFilter, semFilter, sortConfig, leaderboardData]);

  const requestSort = (key) => {
    // Only allow sorting if the key is one of the sortable columns
    const sortableColumns = ['rank', 'id', 'name', 'courses', 'xp', 'badges'];
    if (!sortableColumns.includes(key)) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc')
      direction = 'desc';
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
          title="LEADERBOARD"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />
        <section className="px-10 py-6">
          <p className="text-sm text-slate-500 font-medium">
            See how you rank among your peers. Keep learning, earn XP and
            badges, and climb to the top!
          </p>

          {/* Filtering Section */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-4">
              <FilterSelect
                label="Batch"
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                options={['All Batches', '2023', '2024']}
              />
              <FilterSelect
                label="Department"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                options={[
                  'All Departments',
                  'Computer Science',
                  'Information Technology',
                  'Electronics & Comm.',
                  'Mechanical Engineering',
                ]}
              />
              <FilterSelect
                label="Semester"
                value={semFilter}
                onChange={(e) => setSemFilter(e.target.value)}
                options={['All Semesters', '4', '6']}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-6 overflow-hidden rounded-xl border border-[#eadfd8] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#eadfd8] bg-slate-50/50 text-[11px] font-black uppercase tracking-wider text-[#0b1a30]">
                  <th
                    onClick={() => requestSort('rank')}
                    className="cursor-pointer py-4 pl-6 select-none hover:bg-slate-100"
                  >
                    Rank <SortIndicator columnKey="rank" />
                  </th>
                  <th
                    onClick={() => requestSort('id')}
                    className="cursor-pointer py-4 px-4 select-none hover:bg-slate-100"
                  >
                    Enrollment ID <SortIndicator columnKey="id" />
                  </th>
                  <th className="py-4 px-4">Batch</th>
                  <th
                    onClick={() => requestSort('name')}
                    className="cursor-pointer py-4 px-4 select-none hover:bg-slate-100"
                  >
                    Name <SortIndicator columnKey="name" />
                  </th>
                  <th className="py-4 px-4">Department</th>
                  <th className="py-4 px-4 text-center">Semester</th>
                  <th
                    onClick={() => requestSort('courses')}
                    className="cursor-pointer py-4 px-4 text-center select-none hover:bg-slate-100"
                  >
                    Courses Completed <SortIndicator columnKey="courses" />
                  </th>
                  <th
                    onClick={() => requestSort('xp')}
                    className="cursor-pointer py-4 px-4 text-right select-none hover:bg-slate-100"
                  >
                    XP Earned <SortIndicator columnKey="xp" />
                  </th>
                  <th
                    onClick={() => requestSort('badges')}
                    className="cursor-pointer py-4 pr-6 text-right select-none hover:bg-slate-100"
                  >
                    Badges Earned <SortIndicator columnKey="badges" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] font-medium text-slate-600">
                {loading ? (
                  <tr>
                    <td colSpan="9" className="py-10 text-center">
                      <Loader2 className="animate-spin text-blue-600 mx-auto" size={32} />
                    </td>
                  </tr>
                ) : sortedAndFilteredData.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-10 text-center text-slate-500">
                      No leaderboard data found.
                    </td>
                  </tr>
                ) : (
                  sortedAndFilteredData.map((row) => (
                    <tr
                      key={row.rank}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3.5 pl-6 font-bold text-slate-800">
                        {row.rank === 1 && (
                          <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-amber-100 text-amber-700 text-xs">
                            🥇
                          </span>
                        )}
                        {row.rank === 2 && (
                          <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-slate-200 text-slate-700 text-xs">
                            🥈
                          </span>
                        )}
                        {row.rank === 3 && (
                          <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-orange-100 text-orange-700 text-xs">
                            🥉
                          </span>
                        )}
                        {row.rank > 3 && <span className="pl-2">{row.rank}</span>}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs">
                        N/A
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">All</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-[#0b1a30] text-[10px] font-black text-white">
                            ST
                          </div>
                          <span className="font-semibold text-[#0b1a30]">
                            {row.studentName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{row.department}</td>
                      <td className="py-3.5 px-4 text-center text-slate-700">
                        All
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                        {row.completedCourses}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-800">
                        {row.xp ? row.xp.toLocaleString() : 0}
                      </td>
                      <td className="py-3.5 pr-6 text-right font-bold text-slate-800">
                        {row.badgesEarned}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col min-w-[150px]">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#ebdcd0] bg-white py-2 px-4 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
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
