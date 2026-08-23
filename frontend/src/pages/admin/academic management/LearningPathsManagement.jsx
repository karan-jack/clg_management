import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../../services/api";
import { Loader2, Plus, Edit, Trash2, Route, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";

export default function LearningPathsManagement() {
  const [paths, setPaths] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [modal, setModal] = useState(null); // 'create', 'edit', 'builder'
  const [formData, setFormData] = useState({ title: "", description: "", difficulty: "Beginner", estimated_hours: "" });
  
  // Builder specific state
  const [activePath, setActivePath] = useState(null);
  const [builderCourses, setBuilderCourses] = useState([]); // Courses currently in the path

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pathsRes, coursesRes] = await Promise.all([
        api.adminLearningPaths.getAll(),
        api.adminCourses.getAll()
      ]);
      if (pathsRes.success) setPaths(pathsRes.rows || []);
      if (coursesRes.success) setCourses(coursesRes.rows || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (modal === "create") {
        await api.adminLearningPaths.create(formData);
      } else if (modal === "edit") {
        await api.adminLearningPaths.update(formData.id, formData);
      }
      setModal(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this learning path?")) {
      try {
        await api.adminLearningPaths.delete(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openModal = (type, path = null) => {
    setModal(type);
    if (type === "builder" && path) {
      setActivePath(path);
      setBuilderCourses(path.Courses || []);
    } else if (path) {
      setFormData(path);
    } else {
      setFormData({ title: "", description: "", difficulty: "Beginner", estimated_hours: "" });
    }
  };

  const handleSaveBuilder = async () => {
    try {
      // Expecting an endpoint like PUT /admin/learning-paths/:id/courses
      const courseIds = builderCourses.map(c => c.id);
      await api.put(`/admin/learning-paths/${activePath.id}/courses`, { courses: courseIds });
      setModal(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCourseInPath = (course) => {
    const exists = builderCourses.find(c => c.id === course.id);
    if (exists) {
      setBuilderCourses(builderCourses.filter(c => c.id !== course.id));
    } else {
      setBuilderCourses([...builderCourses, course]);
    }
  };

  const filtered = paths.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    (p.difficulty && p.difficulty.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout
      title="Learning Paths"
      subtitle="Create specialized learning tracks by combining multiple courses."
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Learning Management' }, { label: 'Learning Paths' }]}
      activePath="/admin/learning-paths"
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
                placeholder="Search learning paths..."
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
              New Path
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
            {loading ? (
              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", padding: 40 }}>
                <Loader2 className="animate-spin text-blue-500" size={32} />
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", padding: 40, color: "#6B7280" }}>
                No learning paths found.
              </div>
            ) : filtered.map(path => (
              <div key={path.id} style={{ 
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
                <div style={{ padding: "24px 24px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Route size={18} color="#4F46E5" />
                      </div>
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>{path.title}</h3>
                    </div>
                  </div>
                  
                  <p style={{ margin: "0 0 16px", fontSize: 13, color: "#6B7280", lineHeight: 1.5, flex: 1 }}>
                    {path.description ? (path.description.length > 80 ? path.description.substring(0, 80) + '...' : path.description) : "No description provided."}
                  </p>
                  
                  <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: "#4B5563", background: "#F3F4F6", padding: "4px 10px", borderRadius: 12, fontWeight: 500 }}>
                      Level: {path.difficulty}
                    </div>
                    <div style={{ fontSize: 12, color: "#4B5563", background: "#F3F4F6", padding: "4px 10px", borderRadius: 12, fontWeight: 500 }}>
                      {path.estimated_hours} Hours
                    </div>
                    <div style={{ fontSize: 12, color: "#4B5563", background: "#F3F4F6", padding: "4px 10px", borderRadius: 12, fontWeight: 500 }}>
                      {(path.Courses && path.Courses.length) || 0} Courses
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: 8, borderTop: "1px solid #F3F4F6", paddingTop: 16 }}>
                    <button onClick={() => openModal("builder", path)} style={{ 
                      flex: 2, padding: "8px", background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 6, 
                      color: "#4F46E5", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                    }}>
                      <BookOpen size={16} /> Path Builder
                    </button>
                    <button onClick={() => openModal("edit", path)} style={{ 
                      flex: 1, padding: "8px", background: "#F3F4F6", border: "none", borderRadius: 6, 
                      color: "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer"
                    }}>Edit</button>
                    <button onClick={() => handleDelete(path.id)} style={{ 
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

      {(modal === "create" || modal === "edit") && (
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
                {modal === "create" ? "Create Learning Path" : "Edit Learning Path"}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888" }}>✕</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Path Title</label>
                <input 
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Frontend Web Developer"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Description</label>
                <textarea 
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Detailed description of what the student will learn..."
                  rows={3}
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Difficulty</label>
                  <select 
                    value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fff" }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Est. Hours</label>
                  <input 
                    type="number"
                    value={formData.estimated_hours} onChange={e => setFormData({...formData, estimated_hours: e.target.value})}
                    placeholder="e.g. 120"
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setModal(null)} style={{
                padding: "9px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151"
              }}>Cancel</button>
              <button onClick={handleSave} style={{
                padding: "9px 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14
              }}>Save Details</button>
            </div>
          </div>
        </div>
      )}

      {modal === "builder" && activePath && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 40
        }}>
          <div style={{
            background: "#F9FAFB", borderRadius: 16, width: "100%", maxWidth: 1000, height: "85vh",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", overflow: "hidden"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 10 }}>
                  <Route color="#4F46E5" /> Path Builder: {activePath.title}
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6B7280" }}>Assign and order courses for this learning track.</p>
              </div>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#6B7280" }}>✕</button>
            </div>
            
            <div style={{ display: "flex", flex: 1, overflow: "hidden", padding: 24, gap: 24 }}>
              
              {/* Available Courses */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
                <div style={{ padding: "16px", borderBottom: "1px solid #E5E7EB", background: "#F9FAFB" }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#374151" }}>Available Courses</h3>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6B7280" }}>Click to add to path</p>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {courses.filter(c => !builderCourses.find(bc => bc.id === c.id)).map(course => (
                    <div key={course.id} onClick={() => toggleCourseInPath(course)} style={{
                      padding: 12, border: "1px solid #E5E7EB", borderRadius: 8, cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      transition: "all 0.1s", background: "#fff"
                    }} onMouseEnter={e => e.currentTarget.style.borderColor = "#4F46E5"} onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 2 }}>{course.title}</div>
                        <div style={{ fontSize: 12, color: "#6B7280" }}>{course.code} • {course.department}</div>
                      </div>
                      <ChevronRight size={18} color="#9CA3AF" />
                    </div>
                  ))}
                  {courses.filter(c => !builderCourses.find(bc => bc.id === c.id)).length === 0 && (
                    <div style={{ padding: 20, textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>All available courses added.</div>
                  )}
                </div>
              </div>

              {/* Path Courses */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
                <div style={{ padding: "16px", borderBottom: "1px solid #E5E7EB", background: "#EEF2FF" }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#4F46E5" }}>Path Sequence</h3>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6366F1" }}>{builderCourses.length} courses assigned</p>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {builderCourses.map((course, idx) => (
                    <div key={course.id} onClick={() => toggleCourseInPath(course)} style={{
                      padding: 12, border: "1.5px solid #C7D2FE", borderRadius: 8, cursor: "pointer",
                      display: "flex", gap: 12, alignItems: "center", background: "#F5F8FF",
                      transition: "all 0.1s"
                    }} onMouseEnter={e => e.currentTarget.style.background = "#EEF2FF"} onMouseLeave={e => e.currentTarget.style.background = "#F5F8FF"}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#4F46E5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 2 }}>{course.title}</div>
                        <div style={{ fontSize: 12, color: "#6B7280" }}>{course.code} • {course.department}</div>
                      </div>
                      <ChevronLeft size={18} color="#9CA3AF" />
                    </div>
                  ))}
                  {builderCourses.length === 0 && (
                    <div style={{ padding: 40, textAlign: "center", color: "#9CA3AF", fontSize: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                      <Route size={32} color="#D1D5DB" />
                      No courses assigned yet.<br/>Click courses on the left to add them.
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div style={{ padding: "16px 24px", background: "#fff", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button onClick={() => setModal(null)} style={{
                padding: "10px 24px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151"
              }}>Discard Changes</button>
              <button onClick={handleSaveBuilder} style={{
                padding: "10px 24px", borderRadius: 8, border: "none", background: "#4F46E5", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8
              }}>
                <Route size={16} /> Save Path Sequence
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
