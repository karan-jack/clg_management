import React, { useState } from 'react';
import { MainSidebar, Topbar } from '../Dashboard';

export default function ResumeGenerator({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA, USA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.dev',
    summary:
      'Motivated Computer Science student with a strong foundation in data structures, algorithms, and full-stack development. Passionate about building scalable web applications and solving real-world problems.',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const steps = [
    { num: 1, name: 'Personal Info' },
    { num: 2, name: 'Education' },
    { num: 3, name: 'Experience' },
    { num: 4, name: 'Skills' },
    { num: 5, name: 'Projects' },
    { num: 6, name: 'Preview & Download' },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      <MainSidebar currentPage={currentPage} setPage={setPage} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <Topbar
          title="RESUME GENERATOR"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-6">
          <p className="text-sm text-slate-500 font-medium">
            Create a professional resume that highlights your skills,
            achievements, and potential.
          </p>

          {/* Wizard Header Progress Bar */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-[#eadfd8] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4 overflow-x-auto py-1">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="flex items-center gap-2 whitespace-nowrap text-xs font-bold"
                >
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-black ${
                      activeStep === s.num
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s.num}
                  </span>
                  <span
                    className={
                      activeStep === s.num ? 'text-slate-800' : 'text-slate-400'
                    }
                  >
                    {s.name}
                  </span>
                  {s.num < 6 && <span className="text-slate-300 mx-1">──</span>}
                </div>
              ))}
            </div>
            <button className="h-8 rounded-lg border border-[#ebdcd0] bg-white px-4 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50">
              💾 Save Draft
            </button>
          </div>

          {/* Two-Column Workspace Layout Workspace */}
          <div className="mt-6 grid grid-cols-12 gap-6 items-start">
            {/* LEFT COMPILATION FORMS DRAWER */}
            <div className="col-span-5 flex flex-col gap-6">
              {/* Form Card Unit 1: Personal info fields */}
              <div className="rounded-xl border border-[#eadfd8] bg-white p-5 shadow-sm">
                <h3 className="text-sm font-black text-[#0b1a30] mb-4">
                  Personal Information
                </h3>
                <div className="flex flex-col gap-3.5">
                  <FormInput
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    value={formData.email}
                    type="email"
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <FormInput
                    label="LinkedIn Profile"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                  />
                  <FormInput
                    label="Portfolio / Website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Form Card Unit 2: Summary block */}
              <div className="rounded-xl border border-[#eadfd8] bg-white p-5 shadow-sm">
                <h3 className="text-sm font-black text-[#0b1a30] mb-2">
                  Professional Summary
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mb-3">
                  Write a short summary that showcases your skills and career
                  goals.
                </p>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-xl border border-[#ebdcd0] p-3.5 text-xs font-semibold text-slate-700 outline-none resize-none focus:border-violet-400"
                />
                <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                  186/300
                </div>
              </div>

              {/* Static Blocks Replicating Rest of Left Sub-Forms lists */}
              <StaticFormSection
                title="Education"
                details="Bachelor of Technology in Computer Science"
                sub="ABC University • CGPA: 8.72/10"
                duration="Aug 2022 - May 2026"
              />
              <StaticFormSection
                title="Experience"
                details="Web Development Intern"
                sub="Tech Solutions Inc. • San Francisco, CA"
                duration="Jun 2024 - Aug 2024"
              />

              {/* Dynamic Skills Tags container replica */}
              <div className="rounded-xl border border-[#eadfd8] bg-white p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-black text-[#0b1a30]">Skills</h3>
                  <span className="text-xs font-bold text-violet-600 cursor-pointer">
                    ＋ Add
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'C++',
                    'Python',
                    'JavaScript',
                    'React',
                    'Node.js',
                    'SQL',
                    'Git',
                    'Data Structures',
                    'Algorithms',
                    'HTML',
                    'CSS',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full cursor-pointer">
                    ＋ Add Skill
                  </span>
                </div>
              </div>

              <StaticFormSection
                title="Projects"
                details="Task Manager Web App"
                sub="React • Node.js • MongoDB • Express"
                duration="Mar 2024"
              />
              <StaticFormSection
                title="Achievements"
                details="Winner, CodeSprint Hackathon 2024"
                sub="Won 1st place among 120+ teams for building campus navigation system."
                duration="Feb 2024"
              />
            </div>

            {/* RIGHT A4 REAL-TIME PREVIEW PANEL WRAPPER */}
            <div className="col-span-7 flex flex-col gap-6">
              {/* Visual Template Choice Selector Horizontal Track */}
              <div className="rounded-xl border border-[#eadfd8] bg-white p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-black text-[#0b1a30]">
                    Choose Template
                  </h3>
                  <span className="text-xs font-bold text-violet-600 cursor-pointer hover:underline">
                    View All ➔
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div className="border-2 border-violet-500 rounded-lg p-1 relative bg-white shadow-sm cursor-pointer">
                    <div className="h-20 bg-slate-50 border border-slate-100 rounded flex items-center justify-center text-xl">
                      📄
                    </div>
                    <span className="absolute bottom-1 right-1 bg-violet-600 text-white rounded-full text-[8px] h-3.5 w-3.5 flex items-center justify-center">
                      ✓
                    </span>
                  </div>
                  <div className="border border-[#ebdcd0] rounded-lg p-1 bg-white opacity-60 hover:opacity-100 cursor-pointer">
                    <div className="h-20 bg-slate-900 border border-slate-900 rounded"></div>
                  </div>
                  <div className="border border-[#ebdcd0] rounded-lg p-1 bg-white opacity-60 hover:opacity-100 cursor-pointer">
                    <div className="h-20 bg-slate-50 border border-slate-100 rounded"></div>
                  </div>
                  <div className="border border-[#ebdcd0] rounded-lg p-1 bg-white opacity-60 hover:opacity-100 cursor-pointer">
                    <div className="h-20 bg-emerald-50 border border-emerald-100 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Simulated Live Sheet Core Container Block */}
              <div className="rounded-xl border border-[#eadfd8] bg-white p-5 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-sm font-black text-[#0b1a30]">
                    Resume Preview
                  </h3>
                  <button className="text-xs font-bold text-slate-500 border border-[#ebdcd0] bg-white rounded-lg px-3 py-1.5 hover:bg-slate-50">
                    📝 Edit Sections
                  </button>
                </div>

                {/* Styled Miniature Canvas Container resembling structural paper output */}
                <div className="border border-slate-200 rounded-lg bg-white p-8 shadow-inner text-slate-800 text-left font-sans">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-black text-[#0b1a30] tracking-wide uppercase">
                      {formData.fullName}
                    </h2>
                    <p className="text-xs font-bold text-slate-600 mt-1">
                      Computer Science Student
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-slate-500 mt-3 font-semibold">
                      <span>✉ {formData.email}</span>
                      <span>📞 {formData.phone}</span>
                      <span>📍 {formData.location}</span>
                    </div>
                    <div className="flex justify-center gap-4 text-[10px] text-violet-600 font-bold mt-1.5">
                      <span>🔗 {formData.linkedin}</span>
                      <span>🌐 {formData.website}</span>
                    </div>
                  </div>

                  <ResumeSheetHeader title="Professional Summary" />
                  <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                    {formData.summary}
                  </p>

                  <ResumeSheetHeader title="Education" />
                  <div className="flex justify-between text-[11px] font-bold text-slate-700">
                    <div>
                      <h4>Bachelor of Technology in Computer Science</h4>
                      <p className="text-slate-400 font-medium text-[10px] mt-0.5">
                        ABC University
                      </p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="text-slate-500 font-medium text-[10px]">
                        Aug 2022 - May 2026
                      </p>
                      <p className="text-slate-600 text-[10px] mt-0.5">
                        CGPA: 8.72/10
                      </p>
                    </div>
                  </div>

                  <ResumeSheetHeader title="Experience" />
                  <div className="flex justify-between text-[11px] font-bold text-slate-700">
                    <div>
                      <h4>Web Development Intern</h4>
                      <p className="text-slate-400 font-medium text-[10px] mt-0.5">
                        Tech Solutions Inc. • San Francisco, CA
                      </p>
                    </div>
                    <p className="text-slate-500 font-medium text-[10px] whitespace-nowrap">
                      Jun 2024 - Aug 2024
                    </p>
                  </div>
                  <ul className="list-disc pl-4 text-[10px] text-slate-500 font-medium mt-2 flex flex-col gap-1">
                    <li>
                      Developed responsive web applications using React and
                      Node.js.
                    </li>
                    <li>
                      Collaborated with cross-functional teams to deliver
                      features.
                    </li>
                  </ul>

                  <ResumeSheetHeader title="Skills" />
                  <p className="text-[10px] leading-relaxed font-semibold text-slate-600">
                    C++ • Python • JavaScript • React • Node.js • SQL • Git •
                    Data Structures • Algorithms • HTML • CSS
                  </p>
                </div>

                {/* Grid Action Panel Download Drawers */}
                <div className="mt-5 grid grid-cols-4 gap-3">
                  <DownloadButton
                    icon="📕"
                    title="Download"
                    type="PDF"
                    color="text-red-600"
                  />
                  <DownloadButton
                    icon="📘"
                    title="Download"
                    type="DOCX"
                    color="text-blue-600"
                  />
                  <DownloadButton
                    icon="🔮"
                    title="Share"
                    type="Resume"
                    color="text-purple-600"
                  />
                  <DownloadButton
                    icon="🔲"
                    title="Preview"
                    type="Full Screen"
                    color="text-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advice footer block bar panel */}
          <div className="mt-8 flex items-center justify-between rounded-xl border border-[#ebdcd0] bg-violet-50/40 p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-600 text-lg">
                🛡️
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0b1a30]">
                  Tips to improve your resume
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Add more relevant projects, quantify your achievements and
                  keep your resume concise and tailored.
                </p>
              </div>
            </div>
            <button className="h-9 rounded-lg border border-[#ebdcd0] bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">
              View Tips ➔
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// Inline Sub-layout UI Helpers
function FormInput({ label, name, type = 'text', value, onChange }) {
  return (
    <div className="flex flex-col text-left">
      <label className="text-[11px] font-bold text-slate-400 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#ebdcd0] bg-white py-2 px-4 text-xs font-semibold text-slate-700 outline-none focus:border-violet-400"
      />
    </div>
  );
}

function StaticFormSection({ title, details, sub, duration }) {
  return (
    <div className="rounded-xl border border-[#eadfd8] bg-white p-5 shadow-sm text-left relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-black text-[#0b1a30]">{title}</h3>
        <span className="text-xs font-bold text-violet-600 cursor-pointer">
          ＋ Add
        </span>
      </div>
      <div className="border border-slate-100 bg-slate-50/40 rounded-xl p-3 flex justify-between items-start">
        <div>
          <h4 className="text-xs font-bold text-slate-800">{details}</h4>
          <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
            {sub}
          </p>
        </div>
        <div className="text-right whitespace-nowrap">
          <span className="text-[10px] text-slate-400 font-bold">
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
}

function ResumeSheetHeader({ title }) {
  return (
    <div className="border-b border-slate-800 pb-0.5 mb-2 mt-4">
      <h3 className="text-[11px] uppercase tracking-wider font-extrabold text-[#0b1a30]">
        {title}
      </h3>
    </div>
  );
}

function DownloadButton({ icon, title, type, color }) {
  return (
    <button className="flex items-center gap-3 rounded-xl border border-[#ebdcd0] bg-white p-3 hover:bg-slate-50 transition text-left shadow-sm">
      <span className={`text-xl ${color}`}>{icon}</span>
      <div>
        <p className="text-[10px] font-bold text-slate-400">{title}</p>
        <p className="text-[11px] font-black text-slate-800 leading-none mt-0.5">
          {type}
        </p>
      </div>
    </button>
  );
}
