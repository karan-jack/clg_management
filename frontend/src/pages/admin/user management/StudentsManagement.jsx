import { useState } from "react";

const students = [
  { id: "ENR2021001", name: "Aarav Sharma", dept: "Computer Science", semester: 5, status: "Active" },
  { id: "ENR2021002", name: "Diya Patel", dept: "Electronics & Comm.", semester: 3, status: "Registered" },
  { id: "ENR2021003", name: "Rohan Verma", dept: "Mechanical Engg.", semester: 7, status: "Active" },
  { id: "ENR2021004", name: "Sneha Iyer", dept: "Computer Science", semester: 5, status: "Inactive" },
  { id: "ENR2021005", name: "Karan Mehta", dept: "Civil Engineering", semester: 3, status: "Registered" },
  { id: "ENR2021006", name: "Ananya Singh", dept: "Information Tech.", semester: 5, status: "Active" },
  { id: "ENR2021007", name: "Manav Gupta", dept: "Electrical Engg.", semester: 1, status: "Not Registered" },
  { id: "ENR2021008", name: "Pooja Nair", dept: "Electronics & Comm.", semester: 7, status: "Active" },
  { id: "ENR2021009", name: "Aditya Malhotra", dept: "Mechanical Engg.", semester: 3, status: "Inactive" },
  { id: "ENR2021010", name: "Ishita Roy", dept: "Computer Science", semester: 1, status: "Registered" },
];

const statusStyles = {
  Active: { background: "#d1fae5", color: "#065f46" },
  Registered: { background: "#dbeafe", color: "#1e40af" },
  Inactive: { background: "#f3f4f6", color: "#6b7280" },
  "Not Registered": { background: "#fee2e2", color: "#991b1b" },
};

const navItems = [
  { section: "User Management", children: ["Students", "Professors", "Admins"] },
  { section: "Academic Management", children: ["Student Master", "Batches", "Subjects"] },
  { section: "Learning Management", children: ["Courses", "Learning Paths"] },
  { section: "Analytics", children: ["Platform Analytics"] },
];

export default function StudentsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [semester, setSemester] = useState("All Semesters");
  const [batch, setBatch] = useState("All Batches");
  const [activeNav, setActiveNav] = useState("Students");
  const [expandedSections, setExpandedSections] = useState({
    "User Management": true,
    "Academic Management": true,
    "Learning Management": true,
    Analytics: true,
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const toggleSection = (section) =>
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const sectionIcons = {
    "User Management": (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    "Academic Management": (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    "Learning Management": (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    Analytics: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#f8fafc", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <span style={{ fontWeight: 800, fontSize: 22, color: "#1e293b", letterSpacing: "-0.5px" }}>NAME</span>
        </div>

        {/* Sidebar Search */}
        <div style={{ padding: "12px 16px" }}>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              placeholder="Search..."
              style={{ width: "100%", padding: "7px 10px 7px 30px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, color: "#374151", background: "#f8fafc", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "4px 8px 16px" }}>
          {/* Dashboard */}
          <button
            onClick={() => setActiveNav("Dashboard")}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 8, border: "none", background: activeNav === "Dashboard" ? "#fef3e2" : "transparent", color: activeNav === "Dashboard" ? "#d97706" : "#64748b", cursor: "pointer", fontSize: 13.5, fontWeight: 500, textAlign: "left", marginBottom: 2 }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            Dashboard
          </button>

          {navItems.map(({ section, children }) => (
            <div key={section} style={{ marginBottom: 4 }}>
              <button
                onClick={() => toggleSection(section)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#374151", cursor: "pointer", fontSize: 12.5, fontWeight: 700, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.04em" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {sectionIcons[section]}
                  {section}
                </span>
                <svg style={{ transform: expandedSections[section] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {expandedSections[section] && (
                <div style={{ paddingLeft: 12 }}>
                  {children.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveNav(item)}
                      style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 8, border: "none", background: activeNav === item ? "#fef3e2" : "transparent", color: activeNav === item ? "#d97706" : "#64748b", cursor: "pointer", fontSize: 13.5, fontWeight: activeNav === item ? 600 : 400, textAlign: "left", marginBottom: 1 }}
                    >
                      {activeNav === item && <span style={{ width: 3, height: 16, background: "#f59e0b", borderRadius: 2, marginRight: 2 }} />}
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Profile */}
          <button
            onClick={() => setActiveNav("Profile")}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 8, border: "none", background: activeNav === "Profile" ? "#fef3e2" : "transparent", color: activeNav === "Profile" ? "#d97706" : "#64748b", cursor: "pointer", fontSize: 13.5, fontWeight: 500, textAlign: "left", marginTop: 4 }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "relative", zIndex: 100 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e293b" }}>Students Management</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
              <span>Dashboard</span>
              <span>›</span>
              <span>User Management</span>
              <span>›</span>
              <span style={{ color: "#64748b" }}>Students</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Bell */}
            <div style={{ position: "relative", cursor: "pointer" }}>
              <svg width="22" height="22" fill="none" stroke="#475569" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span style={{ position: "absolute", top: -6, right: -6, background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
            </div>

            {/* Avatar + dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 8 }}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1e293b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>AU</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1 }}>Welcome,</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>Admin User</div>
                </div>
                <svg width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {profileMenuOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: 180, padding: "8px 0", zIndex: 200 }}>
                  {[{ icon: "user", label: "My Profile" }, { icon: "settings", label: "Account Settings" }, { icon: "lock", label: "Change Password" }].map(({ label }) => (
                    <button key={label} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 16px", border: "none", background: "none", fontSize: 13.5, color: "#374151", cursor: "pointer", textAlign: "left" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      {label}
                    </button>
                  ))}
                  <div style={{ borderTop: "1px solid #f1f5f9", margin: "4px 0" }} />
                  <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 16px", border: "none", background: "none", fontSize: 13.5, color: "#ef4444", cursor: "pointer", fontWeight: 600 }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {/* Filters */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1 1 240px", minWidth: 200 }}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or enrollment no..."
                style={{ width: "100%", padding: "9px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13.5, color: "#374151", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", background: "#1e293b", color: "#fff", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>

            {[
              { label: "Department", value: department, setter: setDepartment, options: ["All Departments", "Computer Science", "Electronics & Comm.", "Mechanical Engg.", "Civil Engineering", "Information Tech.", "Electrical Engg."] },
              { label: "Semester", value: semester, setter: setSemester, options: ["All Semesters", "1", "2", "3", "4", "5", "6", "7", "8"] },
              { label: "Batch", value: batch, setter: setBatch, options: ["All Batches", "2021", "2022", "2023", "2024"] },
            ].map(({ label, value, setter, options }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2, flex: "1 1 160px", minWidth: 140 }}>
                <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13.5, color: "#374151", background: "#fff", outline: "none", cursor: "pointer" }}
                >
                  {options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                  {["Enrollment No.", "Name", "Department", "Semester", "Status", "Actions"].map((col) => (
                    <th key={col} style={{ padding: "13px 20px", fontSize: 12.5, fontWeight: 700, color: "#374151", textAlign: col === "Actions" ? "right" : "left", textTransform: "uppercase", letterSpacing: "0.04em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f0f9ff"}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbfc"}
                  >
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#3b82f6", fontWeight: 600 }}>{s.id}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#1e293b", fontWeight: 500 }}>{s.name}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#475569" }}>{s.dept}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#475569" }}>{s.semester}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12.5, fontWeight: 600, ...statusStyles[s.status] }}>
                        {s.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                        {/* View */}
                        <button title="View" style={{ background: "none", border: "none", cursor: "pointer", color: "#3b82f6", padding: 4, borderRadius: 6 }}
                          onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        {/* Edit */}
                        <button title="Edit" style={{ background: "none", border: "none", cursor: "pointer", color: "#6366f1", padding: 4, borderRadius: 6 }}
                          onMouseEnter={e => e.currentTarget.style.background = "#eef2ff"}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        {/* Block */}
                        <button title="Deactivate" style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 4, borderRadius: 6 }}
                          onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: "#64748b" }}>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  style={{ padding: "5px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, color: "#374151", background: "#fff", outline: "none", cursor: "pointer" }}
                >
                  {[10, 25, 50].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: "#64748b", marginRight: 8 }}>1–10 of 1,248</span>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  style={{ width: 32, height: 32, border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", opacity: currentPage === 1 ? 0.5 : 1 }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                {[1, 2, 3].map((p) => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    style={{ width: 32, height: 32, border: currentPage === p ? "none" : "1px solid #e2e8f0", borderRadius: 8, background: currentPage === p ? "#1e293b" : "#fff", color: currentPage === p ? "#fff" : "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    {p}
                  </button>
                ))}
                <span style={{ fontSize: 13, color: "#94a3b8" }}>...</span>
                <button onClick={() => setCurrentPage(125)}
                  style={{ width: 32, height: 32, border: currentPage === 125 ? "none" : "1px solid #e2e8f0", borderRadius: 8, background: currentPage === 125 ? "#1e293b" : "#fff", color: currentPage === 125 ? "#fff" : "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  125
                </button>
                <button onClick={() => setCurrentPage(p => Math.min(125, p + 1))} disabled={currentPage === 125}
                  style={{ width: 32, height: 32, border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: currentPage === 125 ? "not-allowed" : "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", opacity: currentPage === 125 ? 0.5 : 1 }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay to close profile menu */}
      {profileMenuOpen && (
        <div onClick={() => setProfileMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
      )}
    </div>
  );
}
