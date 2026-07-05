import React, { useState } from 'react';
import { MainSidebar, Topbar } from '../Dashboard';

const pathsData = [
  {
    title: 'AI Engineer Path',
    cardTitle: 'AI Engineer',
    desc: 'Master AI and machine learning concepts to build intelligent systems and solve complex problems.',
    icon: '♙',
    color: 'from-violet-600 to-purple-500',
    courses: 24,
    hours: '120+ Hours',
    level: 'Beginner to Advanced',
    certificate: 'Earn upon completion',
    projects: '8+ Real-world projects',
    badge: 'AI Specialist',
    modulesCount: 7,
    modules: [
      ['Introduction to AI', '3 Courses'],
      ['Python for AI', '4 Courses'],
      ['Machine Learning Basics', '4 Courses'],
      ['Deep Learning', '4 Courses'],
      ['Natural Language Processing', '3 Courses'],
      ['Computer Vision', '3 Courses'],
      ['AI Projects & Deployment', '3 Courses'],
    ],
    lessons: [
      [
        'What is AI?',
        'Basics of Artificial Intelligence, history, and applications',
        '8 Lessons',
        '1h 30m',
      ],
      [
        'Types of AI',
        'Narrow AI, General AI, and Super AI',
        '6 Lessons',
        '1h 15m',
      ],
      [
        'AI in Real Life',
        'Case studies and real-world use cases',
        '5 Lessons',
        '1h',
      ],
    ],
  },
  {
    title: 'Full Stack Developer Path',
    cardTitle: 'Full Stack Developer',
    desc: 'Learn front-end and back-end development to build complete web applications from scratch.',
    icon: '</>',
    color: 'from-sky-600 to-cyan-500',
    courses: 28,
    hours: '150+ Hours',
    level: 'Beginner to Advanced',
    certificate: 'Full Stack Certificate',
    projects: '10+ Web projects',
    badge: 'Web Builder',
    modulesCount: 7,
    modules: [
      ['HTML, CSS & Layouts', '4 Courses'],
      ['JavaScript Essentials', '5 Courses'],
      ['React Development', '5 Courses'],
      ['Backend with Node.js', '5 Courses'],
      ['Databases & APIs', '4 Courses'],
      ['Authentication', '2 Courses'],
      ['Full Stack Capstone', '3 Courses'],
    ],
    lessons: [
      [
        'Web Foundations',
        'How websites work and how browsers render pages',
        '7 Lessons',
        '1h 20m',
      ],
      [
        'Frontend Basics',
        'HTML, CSS, responsive layouts, and UI structure',
        '8 Lessons',
        '1h 45m',
      ],
      [
        'Backend Basics',
        'Servers, APIs, databases, and request handling',
        '6 Lessons',
        '1h 30m',
      ],
    ],
  },
  {
    title: 'Cloud Developer Path',
    cardTitle: 'Cloud Developer',
    desc: 'Build, deploy, and manage scalable applications using cloud platforms and services.',
    icon: '☁',
    color: 'from-emerald-500 to-green-600',
    courses: 22,
    hours: '100+ Hours',
    level: 'Intermediate',
    certificate: 'Cloud Certificate',
    projects: '6+ Deployment projects',
    badge: 'Cloud Builder',
    modulesCount: 7,
    modules: [
      ['Cloud Fundamentals', '3 Courses'],
      ['Linux & Networking', '4 Courses'],
      ['Cloud Storage', '3 Courses'],
      ['Serverless Apps', '3 Courses'],
      ['Containers', '4 Courses'],
      ['CI/CD Pipelines', '3 Courses'],
      ['Cloud Deployment Project', '2 Courses'],
    ],
    lessons: [
      [
        'What is Cloud?',
        'Cloud models, services, and deployment types',
        '6 Lessons',
        '1h',
      ],
      [
        'Cloud Platforms',
        'AWS, Azure, and Google Cloud overview',
        '5 Lessons',
        '1h 10m',
      ],
      [
        'Deploying Apps',
        'Hosting, scaling, and monitoring cloud apps',
        '7 Lessons',
        '1h 40m',
      ],
    ],
  },
  {
    title: 'Mobile App Developer Path',
    cardTitle: 'Mobile App Developer',
    desc: 'Create powerful and intuitive mobile applications for Android and iOS platforms.',
    icon: '▯',
    color: 'from-amber-500 to-orange-400',
    courses: 20,
    hours: '90+ Hours',
    level: 'Beginner to Intermediate',
    certificate: 'Mobile Developer Certificate',
    projects: '7+ App projects',
    badge: 'App Creator',
    modulesCount: 7,
    modules: [
      ['Mobile UI Basics', '3 Courses'],
      ['JavaScript for Apps', '3 Courses'],
      ['React Native Basics', '4 Courses'],
      ['Navigation & State', '3 Courses'],
      ['APIs in Mobile Apps', '3 Courses'],
      ['Testing Mobile Apps', '2 Courses'],
      ['App Store Deployment', '2 Courses'],
    ],
    lessons: [
      [
        'Mobile App Basics',
        'Understanding mobile platforms and app structure',
        '6 Lessons',
        '1h',
      ],
      [
        'UI Components',
        'Buttons, lists, forms, and responsive mobile layouts',
        '8 Lessons',
        '1h 35m',
      ],
      [
        'App Data',
        'Working with APIs, storage, and app state',
        '7 Lessons',
        '1h 20m',
      ],
    ],
  },
];

export default function LearningPaths({ currentPage, setPage }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [activePath, setActivePath] = useState(null);

  if (activePath) {
    return (
      <PathPage
        path={activePath}
        onBack={() => setActivePath(null)}
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
          title="LEARNING PATHS"
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-7">
          {/* Match identical unified search layout container bar */}
          <div className="flex h-[54px] items-center gap-4 rounded-xl border border-[#eadfd8] bg-white px-5">
            <span className="text-xl text-slate-400">⌕</span>
            <input
              type="text"
              placeholder="Search learning paths..."
              className="flex-1 bg-transparent text-sm font-medium text-slate-600 outline-none placeholder:text-slate-400"
            />
            <button className="h-11 rounded-lg bg-[#06275b] px-10 text-sm font-bold text-white">
              Search
            </button>
          </div>

          <h2 className="mt-7 text-lg font-bold text-[#0b1a30]">
            All Active Paths
          </h2>

          {/* 4 Column Symmetric Grid matching Browse Courses */}
          <div className="mt-4 grid grid-cols-4 gap-5">
            {pathsData.map((path) => (
              <PathCard
                key={path.title}
                path={path}
                onView={() => setSelectedPath(path)}
              />
            ))}
          </div>
        </section>
      </main>

      {selectedPath && (
        <PathModal
          path={selectedPath}
          onClose={() => setSelectedPath(null)}
          onOpenPage={() => {
            setActivePath(selectedPath);
            setSelectedPath(null);
          }}
        />
      )}
    </div>
  );
}

function PathCard({ path, onView }) {
  return (
    <div className="flex min-h-[210px] flex-col justify-between rounded-xl border border-[#eadfd8] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md">
      <div>
        <div className="flex items-start gap-4">
          <div
            className={`grid h-[58px] w-[58px] shrink-0 place-items-center rounded-xl bg-gradient-to-br ${path.color} text-xl font-bold text-white`}
          >
            {path.icon}
          </div>
          <div>
            <h3 className="text-sm font-bold leading-5 text-[#0b1a30]">
              {path.cardTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-500">Learning Path</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-5 text-slate-600">{path.desc}</p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">
          ▥ {path.modulesCount} Modules
        </p>
        <button
          onClick={onView}
          className="h-9 rounded-md bg-[#06275b] px-4 text-xs font-bold text-white"
        >
          View Path
        </button>
      </div>
    </div>
  );
}

function PathModal({ path, onClose, onOpenPage }) {
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-slate-950/30 px-6">
      <div className="modal-card w-full max-w-4xl rounded-2xl border border-[#eadfd8] bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className={`grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${path.color} text-2xl font-bold text-white`}
            >
              {path.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0b1a30]">
                {path.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Curated Learning Journey
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-2xl text-slate-400">
            ×
          </button>
        </div>

        <div className="mt-7 grid grid-cols-[1.2fr_0.8fr] gap-7">
          <div>
            <h3 className="font-bold text-[#0b1a30]">Path Overview</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{path.desc}</p>

            <h3 className="mt-6 font-bold text-[#0b1a30]">
              Core Tracks Included
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600">
              {path.modules.slice(0, 4).map(([name]) => (
                <li key={name}>◎ {name}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <InfoBox label="Total Content" value={path.hours} icon="◷" />
            <InfoBox label="Badge to Earn" value={path.badge} icon="🏆" />
            <InfoBox label="Target Level" value={path.level} icon="▦" />
            <InfoBox
              label="Structure"
              value={`${path.courses} Courses`}
              icon="▥"
            />
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
            Open Path Page
          </button>
        </div>
      </div>
    </div>
  );
}

function PathPage({ path, onBack, showProfileCard, setShowProfileCard }) {
  return (
    <div className="flex min-h-screen bg-[#fdfaf7] text-slate-900">
      {/* Structural Sidebar layout remains identically clean instead of split modules */}
      <PathStructureSidebar path={path} onBack={onBack} />

      <main className="min-w-0 flex-1 bg-[#fbf8f5]">
        <Topbar
          title={path.cardTitle.toUpperCase()}
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
        />

        <section className="px-10 py-7">
          <button
            onClick={onBack}
            className="mb-8 text-sm font-semibold text-slate-500 hover:text-[#0b1a30]"
          >
            ‹ Back to Learning Paths
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div
                className={`grid h-[110px] w-[110px] place-items-center rounded-2xl bg-gradient-to-br ${path.color} text-4xl font-bold text-white`}
              >
                {path.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#0b1a30]">
                  {path.title}
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Level Track: {path.level}
                </p>
                <div className="mt-6 flex gap-8 text-sm text-slate-600">
                  <span>▥ {path.modulesCount} Core Modules</span>
                  <span>🏆 Certification Available</span>
                  <span>◷ {path.hours}</span>
                </div>
              </div>
            </div>
            <button className="h-12 rounded-lg bg-[#06275b] px-10 text-sm font-bold text-white">
              Enroll in Path
            </button>
          </div>

          {/* Clean, roomy placeholder container pane matched to main app UI */}
          <div className="mt-10 min-h-[560px] rounded-xl border border-[#eadfd8] bg-white p-8">
            <h3 className="font-serif text-xl font-black text-[#0b1a30] mb-4">
              Milestone Overview
            </h3>
            <p className="text-sm leading-6 text-slate-600 mb-8">
              Select steps from the path curriculum navigator panel on the left
              to review nested modules, track target outcomes, and access
              step-by-step milestones.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 border border-[#eee5df] rounded-xl bg-[#fbf8f5]">
                <h4 className="font-bold text-xs text-[#0b1a30] uppercase mb-2">
                  Projects included
                </h4>
                <p className="text-sm text-slate-600">{path.projects}</p>
              </div>
              <div className="p-5 border border-[#eee5df] rounded-xl bg-[#fbf8f5]">
                <h4 className="font-bold text-xs text-[#0b1a30] uppercase mb-2">
                  Path Milestone Reward
                </h4>
                <p className="text-sm text-slate-600">{path.badge} Badge</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PathStructureSidebar({ path, onBack }) {
  return (
    <aside className="w-[280px] shrink-0 border-r border-[#ebdcd0] bg-[#f3eae2] px-6 py-8">
      <h2 className="font-serif text-2xl font-black tracking-wide text-[#0b1a30]">
        NAME
      </h2>
      <button
        onClick={onBack}
        className="mt-8 text-sm font-bold text-slate-500 hover:text-[#0b1a30]"
      >
        ‹ Learning Paths
      </button>

      <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-[#0b1a30] leading-tight">
        {path.cardTitle}
      </h3>

      <nav className="mt-5 flex flex-col gap-4">
        {path.modules.map(([title, subtitle], index) => (
          <SidebarAccordionGroup
            key={title}
            title={title}
            items={path.lessons.map(([lessName]) => lessName)}
            defaultOpen={index === 0}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarAccordionGroup({ title, items, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-bold text-[#0b1a30] hover:bg-[#e7d9cf]"
      >
        <span className="truncate pr-2">{title}</span>
        <span className="text-xs text-slate-400 shrink-0">
          {open ? '⌃' : '⌄'}
        </span>
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
