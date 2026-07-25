import React, { useState } from 'react';
// Import the shared global layouts directly from your dashboard module
import { MainSidebar, Topbar } from './Dashboard';

export default function AcademicRecords({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('Semester 3');

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

  // Export to Excel (CSV format natively opened by Excel)
  const handleExportXLSX = () => {
    const headers = [
      'Subject Code',
      'Subject',
      'Marks',
      'Maximum Marks',
      'Grade',
    ];
    const csvRows = [];

    // Header Row
    csvRows.push(headers.join(','));

    // Data Rows
    subjects.forEach((row) => {
      // Escape commas inside text fields if any
      const formattedRow = row.map((field) => `"${field}"`);
      csvRows.push(formattedRow.join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Academic_Record_${selectedSemester.replace(' ', '_')}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF (triggers printable layout view)
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      {/* Replaced hardcoded inline copy with the central main sidebar */}
      <MainSidebar currentPage={currentPage} setPage={setPage} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        {/* Synchronized with unified header controls state wrappers */}
        <Topbar
          title="ACADEMIC RECORD"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

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

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="h-[42px] w-full rounded-md border border-[#e3d2c4] bg-[#fcf9f6] px-3 text-sm text-slate-600 outline-none"
              >
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

          {/* Action Row: Title + Export Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-lg font-black text-[#0b1a30]">
              {selectedSemester}
            </h2>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportXLSX}
                className="flex items-center gap-2 rounded-lg border border-[#1d6f42] bg-[#1d6f42] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#155231]"
              >
                <span>📊</span> Export to Excel (.xlsx)
              </button>

              <button
                type="button"
                onClick={handleExportPDF}
                className="flex items-center gap-2 rounded-lg border border-[#0b1a30] bg-[#0b1a30] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#162a47]"
              >
                <span>📄</span> Export to PDF
              </button>
            </div>
          </div>

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

