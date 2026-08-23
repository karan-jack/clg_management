import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../../services/api";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

export default function SubjectsManagement() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({ name: "", code: "", department: "", credits: "" });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await api.adminSubjects.getAll();
      if (res.success) {
        setSubjects(res.rows || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (modal === "create") {
        await api.adminSubjects.create(formData);
      } else if (modal === "edit") {
        await api.adminSubjects.update(formData.id, formData);
      }
      setModal(null);
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await api.adminSubjects.delete(id);
        fetchSubjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openModal = (type, subject = null) => {
    setModal(type);
    if (subject) setFormData(subject);
    else setFormData({ name: "", code: "", department: "", credits: "" });
  };

  const filtered = subjects.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      title="Subjects Management"
      subtitle="Manage all institution subjects and credits."
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Academic Management' }, { label: 'Subjects' }]}
      activePath="/admin/subjects"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, background: "#fff",
              border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "8px 14px", width: 320
            }}>
              <span style={{ color: "#9CA3AF" }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search subjects..."
                style={{ border: "none", outline: "none", fontSize: 14, color: "#374151", width: "100%", background: "transparent" }}
              />
            </div>
            
            <button
              onClick={() => openModal("create")}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#2563EB", color: "#fff", border: "none", borderRadius: 9,
                padding: "10px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer",
                boxShadow: "0 2px 8px rgba(37,99,235,0.25)"
              }}
            >
              <Plus size={18} />
              Add Subject
            </button>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F0F0F4", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #F0F0F4" }}>
                  {["Code", "Subject Name", "Department", "Credits", "Actions"].map((col) => (
                    <th key={col} style={{
                      padding: "14px 20px", textAlign: col === "Actions" ? "right" : "left",
                      fontSize: 13, fontWeight: 600, color: "#6B7280", whiteSpace: "nowrap"
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ padding: "40px", textAlign: "center" }}>
                      <Loader2 className="animate-spin text-blue-500" style={{ margin: "0 auto" }} size={24} />
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
                      No subjects found.
                    </td>
                  </tr>
                ) : filtered.map((subject, idx) => (
                  <tr key={subject.id} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F5F5F8" : "none" }}>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563", fontWeight: 600 }}>{subject.code}</td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#1E2A4A", fontWeight: 600 }}>{subject.name}</td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563" }}>{subject.department}</td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563" }}>{subject.credits}</td>
                    <td style={{ padding: "15px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button onClick={() => openModal("edit", subject)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}>
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(subject.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {modal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#fff", borderRadius: 12, padding: 32, width: 420,
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1E2A4A" }}>
                {modal === "create" ? "Add New Subject" : "Edit Subject"}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888" }}>✕</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Subject Name</label>
                <input 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Data Structures"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Subject Code</label>
                  <input 
                    value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})}
                    placeholder="e.g. CS201"
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Credits</label>
                  <input 
                    type="number"
                    value={formData.credits} onChange={e => setFormData({...formData, credits: e.target.value})}
                    placeholder="e.g. 4"
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Department</label>
                <input 
                  value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}
                  placeholder="e.g. Computer Science"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setModal(null)} style={{
                padding: "9px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151"
              }}>Cancel</button>
              <button onClick={handleSave} style={{
                padding: "9px 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
