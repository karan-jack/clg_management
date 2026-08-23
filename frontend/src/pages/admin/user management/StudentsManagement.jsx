import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../../services/api";
import { Loader2 } from "lucide-react";

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
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, [currentPage, rowsPerPage]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.adminStudents.getAll(`?page=${currentPage}&limit=${rowsPerPage}`);
      if (res.success) {
        setStudentsList(res.rows || []);
        setTotalCount(res.count || 0);
      }
    } catch (err) {
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = studentsList.filter(s => {
    const deptMatch = department === "All Departments" || (s.Studentprofile && s.Studentprofile.department === department);
    const semMatch = semester === "All Semesters" || (s.Studentprofile && s.Studentprofile.semester?.toString() === semester);
    const batchMatch = batch === "All Batches" || (s.Studentprofile && s.Studentprofile.batch === batch);
    const searchMatch = !searchQuery || 
      (s.name && s.name.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (s.Studentprofile && s.Studentprofile.enrollment_no && s.Studentprofile.enrollment_no.toLowerCase().includes(searchQuery.toLowerCase()));
    return deptMatch && semMatch && batchMatch && searchMatch;
  });

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
    <AdminLayout
      title="Students Management"
      subtitle="Manage student records, enrollments, and academic details."
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'User Management' }, { label: 'Students' }]}
      activePath="/admin/students"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: 20 }}><Loader2 className="animate-spin text-[#4F46E5]" style={{ margin: "0 auto" }} /></td></tr>
              ) : error ? (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: 20, color: "red" }}>{error}</td></tr>
              ) : filteredStudents.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: 20 }}>No students found.</td></tr>
              ) : (
                filteredStudents.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f0f9ff"}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbfc"}
                  >
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#3b82f6", fontWeight: 600 }}>{s.Studentprofile?.enrollment_no || s.id}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#1e293b", fontWeight: 500 }}>{s.name || `${s.first_name || ''} ${s.last_name || ''}`}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#475569" }}>{s.Studentprofile?.department || "N/A"}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#475569" }}>{s.Studentprofile?.semester || "N/A"}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12.5, fontWeight: 600, ...(statusStyles[s.status || "Active"] || statusStyles.Active) }}>
                        {s.status || "Active"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                        <button title="View" style={{ background: "none", border: "none", cursor: "pointer", color: "#3b82f6", padding: 4, borderRadius: 6 }}
                          onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button title="Edit" style={{ background: "none", border: "none", cursor: "pointer", color: "#6366f1", padding: 4, borderRadius: 6 }}
                          onMouseEnter={e => e.currentTarget.style.background = "#eef2ff"}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
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
                ))
              )}
            </tbody>
          </table>

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
              <span style={{ fontSize: 13, color: "#64748b", marginRight: 8 }}>
                {Math.min(totalCount, (currentPage - 1) * rowsPerPage + 1)}–
                {Math.min(totalCount, currentPage * rowsPerPage)} of {totalCount}
              </span>
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
              <button onClick={() => setCurrentPage(Math.max(1, Math.ceil(totalCount / rowsPerPage)))}
                style={{ width: 32, height: 32, border: currentPage === Math.ceil(totalCount / rowsPerPage) ? "none" : "1px solid #e2e8f0", borderRadius: 8, background: currentPage === Math.ceil(totalCount / rowsPerPage) ? "#1e293b" : "#fff", color: currentPage === Math.ceil(totalCount / rowsPerPage) ? "#fff" : "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {Math.max(1, Math.ceil(totalCount / rowsPerPage))}
              </button>
              <button onClick={() => setCurrentPage(p => Math.min(Math.ceil(totalCount / rowsPerPage), p + 1))} disabled={currentPage >= Math.ceil(totalCount / rowsPerPage)}
                style={{ width: 32, height: 32, border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: currentPage >= Math.ceil(totalCount / rowsPerPage) ? "not-allowed" : "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", opacity: currentPage >= Math.ceil(totalCount / rowsPerPage) ? 0.5 : 1 }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {profileMenuOpen && (
        <div onClick={() => setProfileMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
      )}
    </AdminLayout>
  );
}
