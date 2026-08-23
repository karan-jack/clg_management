import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../../services/api";
import { Loader2, Plus, Edit, Trash2, BookOpen } from "lucide-react";

export default function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({ title: "", code: "", department: "", semester: 1, batch: "", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.adminCourses.getAll();
      if (res.success) {
        setCourses(res.rows || []);
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
        await api.adminCourses.create(formData);
      } else if (modal === "edit") {
        await api.adminCourses.update(formData.id, formData);
      }
      setModal(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.adminCourses.delete(id);
        fetchCourses();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openModal = (type, course = null) => {
    setModal(type);
    if (course) setFormData(course);
    else setFormData({ title: "", code: "", department: "", semester: 1, batch: "", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" });
  };

  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    (c.department && c.department.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout
      title="Courses Management"
      subtitle="Manage curriculum, course codes, and assign to departments."
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Learning Management' }, { label: 'Courses' }]}
      activePath="/admin/courses"
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
                placeholder="Search courses..."
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
              Add Course
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {loading ? (
              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", padding: 40 }}>
                <Loader2 className="animate-spin text-blue-500" size={32} />
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", padding: 40, color: "#6B7280" }}>
                No courses found.
              </div>
            ) : filtered.map(course => (
              <div key={course.id} style={{ 
                background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", 
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s"
              }} onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
              }} onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)";
              }}>
                <div style={{ height: 80, background: `linear-gradient(to right, var(--tw-gradient-stops))`, position: "relative" }} className={course.color || "from-blue-500 to-indigo-600"}>
                  <div style={{ 
                    position: "absolute", bottom: -20, left: 20, width: 40, height: 40, background: "#fff", 
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", 
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}>
                    <BookOpen size={20} color="#4B5563" />
                  </div>
                </div>
                <div style={{ padding: "32px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 0.5, marginBottom: 4 }}>{course.code} • {course.department}</div>
                  <h3 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{course.title}</h3>
                  <div style={{ display: "flex", gap: 12, marginBottom: 16, marginTop: "auto" }}>
                    <div style={{ fontSize: 12, color: "#6B7280" }}><span style={{ fontWeight: 600, color: "#374151" }}>Sem:</span> {course.semester}</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}><span style={{ fontWeight: 600, color: "#374151" }}>Batch:</span> {course.batch || "All"}</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}><span style={{ fontWeight: 600, color: "#374151" }}>Modules:</span> {course.modules_count}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, borderTop: "1px solid #F3F4F6", paddingTop: 16 }}>
                    <button onClick={() => openModal("edit", course)} style={{ 
                      flex: 1, padding: "8px", background: "#F3F4F6", border: "none", borderRadius: 6, 
                      color: "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer"
                    }}>Edit</button>
                    <button onClick={() => handleDelete(course.id)} style={{ 
                      padding: "8px 12px", background: "#FEF2F2", border: "none", borderRadius: 6, 
                      color: "#EF4444", fontWeight: 600, fontSize: 13, cursor: "pointer"
                    }}><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {modal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#fff", borderRadius: 12, padding: 32, width: 480,
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1E2A4A" }}>
                {modal === "create" ? "Add New Course" : "Edit Course"}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888" }}>✕</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Course Title</label>
                <input 
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Advanced Machine Learning"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Course Code</label>
                  <input 
                    value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})}
                    placeholder="e.g. CS501"
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Department</label>
                  <input 
                    value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}
                    placeholder="e.g. Computer Science"
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Semester</label>
                  <input 
                    type="number"
                    value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})}
                    placeholder="e.g. 1"
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Batch (Optional)</label>
                  <input 
                    value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})}
                    placeholder="e.g. 2023-2027"
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Tailwind Gradient Color</label>
                <input 
                  value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})}
                  placeholder="e.g. from-blue-500 to-indigo-600"
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
