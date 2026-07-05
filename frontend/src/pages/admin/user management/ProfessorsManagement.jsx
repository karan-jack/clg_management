import { useState } from "react";

const departments = [
  "Computer Science",
  "Electronics & Comm.",
  "Mechanical Engg.",
  "Information Tech.",
  "Civil Engineering",
  "Electrical Engg.",
];

const designations = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
];

const initialProfessors = [
  { id: "EMP001", name: "Dr. Rajesh Sharma", department: "Computer Science", designation: "Professor" },
  { id: "EMP002", name: "Dr. Priya Roy", department: "Electronics & Comm.", designation: "Associate Professor" },
  { id: "EMP003", name: "Dr. Amit Verma", department: "Mechanical Engg.", designation: "Professor" },
  { id: "EMP004", name: "Dr. Neha Iyer", department: "Information Tech.", designation: "Assistant Professor" },
  { id: "EMP005", name: "Dr. Sandeep Mehta", department: "Civil Engineering", designation: "Associate Professor" },
  { id: "EMP006", name: "Dr. Kavita Singh", department: "Electrical Engg.", designation: "Assistant Professor" },
  { id: "EMP007", name: "Dr. Anil Kumar", department: "Computer Science", designation: "Associate Professor" },
  { id: "EMP008", name: "Dr. Meera Nair", department: "Electronics & Comm.", designation: "Assistant Professor" },
  { id: "EMP009", name: "Dr. Vikram Joshi", department: "Mechanical Engg.", designation: "Professor" },
  { id: "EMP010", name: "Dr. Pooja Desai", department: "Information Tech.", designation: "Associate Professor" },
  { id: "EMP011", name: "Dr. Ravi Tiwari", department: "Civil Engineering", designation: "Professor" },
  { id: "EMP012", name: "Dr. Sunita Rao", department: "Electrical Engg.", designation: "Associate Professor" },
  { id: "EMP013", name: "Dr. Karan Malhotra", department: "Computer Science", designation: "Assistant Professor" },
  { id: "EMP014", name: "Dr. Divya Pillai", department: "Information Tech.", designation: "Professor" },
  { id: "EMP015", name: "Dr. Mohan Das", department: "Mechanical Engg.", designation: "Associate Professor" },
];

const navItems = [
  {
    section: "User Management",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    children: ["Students", "Professors", "Admins"],
  },
  {
    section: "Academic Management",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    children: ["Student Master", "Batches", "Subjects"],
  },
  {
    section: "Learning Management",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    children: ["Courses", "Learning Paths"],
  },
  {
    section: "Analytics",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    children: ["Platform Analytics"],
  },
];

function AddProfessorModal({ onClose, onAdd, nextId }) {
  const [form, setForm] = useState({ name: "", department: departments[0], designation: designations[0] });
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: "32px 28px", width: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700, color: "#1a202c" }}>Add New Professor</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Employee ID</label>
          <input value={nextId} readOnly style={{ ...inputStyle, background: "#f3f4f6", color: "#9ca3af" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Full Name</label>
          <input placeholder="e.g. Dr. John Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Department</label>
          <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={inputStyle}>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Designation</label>
          <select value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} style={inputStyle}>
            {designations.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 20px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: 500, color: "#374151" }}>Cancel</button>
          <button
            onClick={() => { if (form.name.trim()) { onAdd({ ...form, id: nextId }); onClose(); } }}
            style={{ padding: "8px 20px", borderRadius: 6, border: "none", background: "#1e3a5f", color: "#fff", cursor: "pointer", fontWeight: 600 }}
          >Add Professor</button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, color: "#374151", boxSizing: "border-box", outline: "none", background: "#fff" };

export default function ProfessorsManagement() {
  const [professors, setProfessors] = useState(initialProfessors);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [editedRows, setEditedRows] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState(["User Management", "Academic Management", "Learning Management", "Analytics"]);
  const [savedBanner, setSavedBanner] = useState(false);

  const filtered = professors.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const pageData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageIds = pageData.map(p => p.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.includes(id));

  const toggleSection = (sec) => setExpandedSections(prev => prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec]);

  const toggleSelectAll = () => {
    if (allPageSelected) setSelected(prev => prev.filter(id => !pageIds.includes(id)));
    else setSelected(prev => [...new Set([...prev, ...pageIds])]);
  };

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const updateRow = (id, field, value) => {
    setEditedRows(prev => ({ ...prev, [id]: { ...(prev[id] || {}), [field]: value } }));
  };

  const saveChanges = () => {
    setProfessors(prev => prev.map(p => ({ ...p, ...(editedRows[p.id] || {}) })));
    setEditedRows({});
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  };

  const deleteSelected = () => {
    setProfessors(prev => prev.filter(p => !selected.includes(p.id)));
    setSelected([]);
    setPage(1);
  };

  const addProfessor = ({ name, department, designation, id }) => {
    setProfessors(prev => [...prev, { id, name, department, designation }]);
  };

  const nextId = `EMP${String(professors.length + 1).padStart(3, "0")}`;

  const getVal = (prof, field) => editedRows[prof.id]?.[field] ?? prof[field];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#f8f9fb", color: "#1a202c" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f0f0f0" }}>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px", color: "#1e3a5f" }}>NAME</span>
        </div>
        <div style={{ padding: "12px 12px 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f3f4f6", borderRadius: 8, padding: "7px 10px" }}>
            <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input placeholder="Search..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#374151", width: "100%" }} />
          </div>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          <SidebarItem icon={<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>} label="Dashboard" />
          {navItems.map(({ section, icon, children }) => (
            <div key={section}>
              <button onClick={() => toggleSection(section)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 16px", background: "none", border: "none", cursor: "pointer", color: "#374151", fontSize: 13, fontWeight: 700 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>{icon}{section}</span>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: expandedSections.includes(section) ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {expandedSections.includes(section) && children.map(child => (
                <SidebarChild key={child} label={child} active={child === "Professors"} />
              ))}
            </div>
          ))}
          <SidebarItem icon={<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>} label="Profile" />
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1e3a5f" }}>Professors Management</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9ca3af", marginTop: 1 }}>
              Dashboard &rsaquo; User Management &rsaquo; <span style={{ color: "#1e3a5f", fontWeight: 600 }}>Professors</span>
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
            <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <span style={{ position: "absolute", top: -2, right: -2, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
            </button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowDropdown(v => !v)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1e3a5f", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>AU</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1 }}>Welcome,</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a202c" }}>Admin User</div>
                </div>
                <svg width="12" height="12" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {showDropdown && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: 180, zIndex: 50 }}>
                  {["My Profile", "Account Settings", "Change Password"].map(item => (
                    <button key={item} onClick={() => setShowDropdown(false)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#374151", textAlign: "left" }}>
                      {item}
                    </button>
                  ))}
                  <div style={{ borderTop: "1px solid #f0f0f0", margin: "4px 0" }} />
                  <button onClick={() => setShowDropdown(false)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#ef4444", fontWeight: 600 }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {savedBanner && (
            <div style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#166534", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 13, fontWeight: 600 }}>
              ✓ Changes saved successfully.
            </div>
          )}
          {/* Search bar */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
            <div style={{ flex: 1, maxWidth: 380, display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", padding: "0 12px" }}>
              <input
                placeholder="Search by name or employee ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { setSearchQuery(search); setPage(1); } }}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#374151", padding: "9px 0" }}
              />
              <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <button onClick={() => { setSearchQuery(search); setPage(1); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              Search
            </button>
            {searchQuery && (
              <button onClick={() => { setSearch(""); setSearchQuery(""); setPage(1); }} style={{ background: "#f3f4f6", color: "#6b7280", border: "1px solid #d1d5db", borderRadius: 8, padding: "9px 14px", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>Clear</button>
            )}
            <button onClick={() => setShowAddModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add Professor
            </button>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                  <th style={thStyle}><input type="checkbox" checked={allPageSelected} onChange={toggleSelectAll} style={{ cursor: "pointer" }} /></th>
                  <th style={{ ...thStyle, textAlign: "left" }}>Employee ID</th>
                  <th style={{ ...thStyle, textAlign: "left" }}>Name</th>
                  <th style={{ ...thStyle, textAlign: "left" }}>Department</th>
                  <th style={{ ...thStyle, textAlign: "left" }}>Designation</th>
                </tr>
              </thead>
              <tbody>
                {pageData.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontSize: 14 }}>No professors found.</td></tr>
                ) : pageData.map((prof, idx) => (
                  <tr key={prof.id} style={{ borderBottom: "1px solid #f0f1f3", background: selected.includes(prof.id) ? "#eff6ff" : idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={tdStyle}><input type="checkbox" checked={selected.includes(prof.id)} onChange={() => toggleSelect(prof.id)} style={{ cursor: "pointer" }} /></td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: "#1e3a5f", fontSize: 13 }}>{prof.id}</td>
                    <td style={tdStyle}>
                      <input
                        value={getVal(prof, "name")}
                        onChange={e => updateRow(prof.id, "name", e.target.value)}
                        style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "5px 10px", fontSize: 13, color: "#374151", width: "90%", outline: "none" }}
                      />
                    </td>
                    <td style={tdStyle}>
                      <select value={getVal(prof, "department")} onChange={e => updateRow(prof.id, "department", e.target.value)} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "5px 10px", fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer", outline: "none" }}>
                        {departments.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </td>
                    <td style={tdStyle}>
                      <select value={getVal(prof, "designation")} onChange={e => updateRow(prof.id, "designation", e.target.value)} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "5px 10px", fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer", outline: "none" }}>
                        {designations.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #e5e7eb", background: "#fafafa" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Rows per page:</span>
                <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }} style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 8px", fontSize: 13, color: "#374151", cursor: "pointer", outline: "none" }}>
                  {[5, 10, 20, 50].map(n => <option key={n}>{n}</option>)}
                </select>
                <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 8 }}>
                  {filtered.length === 0 ? "0" : `${(page - 1) * rowsPerPage + 1}–${Math.min(page * rowsPerPage, filtered.length)}`} of {filtered.length}
                </span>
                <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 5, padding: "3px 10px", cursor: page === 1 ? "not-allowed" : "pointer", color: page === 1 ? "#d1d5db" : "#374151", fontSize: 14 }}>‹</button>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0} style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 5, padding: "3px 10px", cursor: (page === totalPages || totalPages === 0) ? "not-allowed" : "pointer", color: (page === totalPages || totalPages === 0) ? "#d1d5db" : "#374151", fontSize: 14 }}>›</button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={deleteSelected} disabled={selected.length === 0} style={{ display: "flex", alignItems: "center", gap: 6, background: selected.length === 0 ? "#fecaca" : "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 600, fontSize: 13, cursor: selected.length === 0 ? "not-allowed" : "pointer", opacity: selected.length === 0 ? 0.6 : 1 }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                  Delete Selected {selected.length > 0 && `(${selected.length})`}
                </button>
                <button onClick={saveChanges} disabled={Object.keys(editedRows).length === 0} style={{ display: "flex", alignItems: "center", gap: 6, background: Object.keys(editedRows).length === 0 ? "#bfdbfe" : "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 600, fontSize: 13, cursor: Object.keys(editedRows).length === 0 ? "not-allowed" : "pointer", opacity: Object.keys(editedRows).length === 0 ? 0.6 : 1 }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showAddModal && <AddProfessorModal onClose={() => setShowAddModal(false)} onAdd={addProfessor} nextId={nextId} />}

      {showDropdown && <div onClick={() => setShowDropdown(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />}
    </div>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#374151", fontWeight: 500 }}>
      <span style={{ color: "#6b7280" }}>{icon}</span>{label}
    </button>
  );
}

function SidebarChild({ label, active }) {
  return (
    <button style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 16px 7px 36px", background: active ? "#eff6ff" : "none", border: "none", cursor: "pointer", fontSize: 13, color: active ? "#1e3a5f" : "#6b7280", fontWeight: active ? 700 : 400, borderLeft: active ? "3px solid #2563eb" : "3px solid transparent" }}>
      {label}
    </button>
  );
}

const thStyle = { padding: "11px 14px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" };
const tdStyle = { padding: "10px 14px", fontSize: 13, color: "#374151" };
