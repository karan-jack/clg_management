import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../../services/api";
import { Loader2 } from "lucide-react";

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
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [editedRows, setEditedRows] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      setLoading(true);
      const res = await api.adminProfessors.getAll();
      if (res.success) {
        setProfessors(res.rows || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = professors.filter(p => {
    const profName = p.name || `${p.first_name || ''} ${p.last_name || ''}`;
    const empId = p.Professorprofile?.employee_id || p.id?.toString();
    return !searchQuery || profName.toLowerCase().includes(searchQuery.toLowerCase()) || empId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const pageData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageIds = pageData.map(p => p.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.includes(id));

  const toggleSelectAll = () => {
    if (allPageSelected) setSelected(prev => prev.filter(id => !pageIds.includes(id)));
    else setSelected(prev => [...new Set([...prev, ...pageIds])]);
  };

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const updateRow = (id, field, value) => {
    setEditedRows(prev => ({ ...prev, [id]: { ...(prev[id] || {}), [field]: value } }));
  };

  const saveChanges = async () => {
    try {
      for (const id of Object.keys(editedRows)) {
        await api.adminProfessors.update(id, editedRows[id]);
      }
      setEditedRows({});
      setSavedBanner(true);
      setTimeout(() => setSavedBanner(false), 2500);
      fetchProfessors();
    } catch (error) {
      console.error("Failed to save changes", error);
    }
  };

  const deleteSelected = async () => {
    try {
      for (const id of selected) {
        await api.adminProfessors.delete(id);
      }
      setSelected([]);
      setPage(1);
      fetchProfessors();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const addProfessor = async ({ name, department, designation, id }) => {
    try {
      await api.adminProfessors.create({ name, department, designation, employee_id: id });
      fetchProfessors();
    } catch (error) {
      console.error("Failed to add professor", error);
    }
  };

  const nextId = `EMP${String(professors.length + 1).padStart(3, "0")}`;

  const getVal = (prof, field) => {
    if (editedRows[prof.id]?.[field] !== undefined) return editedRows[prof.id][field];
    if (field === 'name') return prof.name || `${prof.first_name || ''} ${prof.last_name || ''}`;
    if (field === 'department') return prof.Professorprofile?.department || departments[0];
    if (field === 'designation') return prof.Professorprofile?.designation || designations[0];
    if (field === 'employee_id') return prof.Professorprofile?.employee_id || prof.id;
    return prof[field];
  };

  return (
    <AdminLayout
      title="Professors Management"
      subtitle="Manage professor records, departments, and teaching assignments."
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'User Management' }, { label: 'Professors' }]}
      activePath="/admin/professors"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>


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
                    <td style={{ ...tdStyle, fontWeight: 600, color: "#1e3a5f", fontSize: 13 }}>{getVal(prof, 'employee_id')}</td>
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
      {showAddModal && <AddProfessorModal onClose={() => setShowAddModal(false)} onAdd={addProfessor} nextId={nextId} />}
      </div>
    </AdminLayout>
  );
}



const thStyle = { padding: "11px 14px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" };
const tdStyle = { padding: "10px 14px", fontSize: 13, color: "#374151" };
