import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../../services/api";
import { Loader2, Download, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function StudentMaster() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  useEffect(() => {
    fetchStudentMaster();
  }, []);

  const fetchStudentMaster = async () => {
    try {
      setLoading(true);
      // We will reuse the students endpoint for the master list
      const res = await api.adminStudents.getAll();
      if (res.success) {
        setStudents(res.rows || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = "first_name,last_name,email,department,semester,batch,password\n" +
                       "John,Doe,john.doe@college.edu,Computer Science,1,2023,password123\n" +
                       "Jane,Smith,jane.smith@college.edu,Electronics,1,2023,password123";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "student_master_template.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      setUploadResult(null);
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await api.adminStudents.upload(formData);
      setUploadResult({ success: true, message: `Successfully imported ${res.count} students.` });
      fetchStudentMaster();
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadResult(null);
        setFile(null);
      }, 2000);
    } catch (err) {
      setUploadResult({ success: false, message: err.message || "Upload failed." });
    } finally {
      setUploading(false);
    }
  };

  const filtered = students.filter(s => {
    const fullName = `${s.first_name || ''} ${s.last_name || ''}`.toLowerCase();
    return fullName.includes(search.toLowerCase()) || 
           (s.email && s.email.toLowerCase().includes(search.toLowerCase())) ||
           (s.department && s.department.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <AdminLayout
      title="Student Master"
      subtitle="Bulk import and manage the master student record."
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Academic Management' }, { label: 'Student Master' }]}
      activePath="/admin/student-master"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Content */}
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
                placeholder="Search master records..."
                style={{ border: "none", outline: "none", fontSize: 14, color: "#374151", width: "100%", background: "transparent" }}
              />
            </div>
            
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleDownloadTemplate}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB", borderRadius: 9,
                  padding: "10px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
              >
                <Download size={18} />
                Download Template
              </button>
              
              <button
                onClick={() => setShowUploadModal(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#2563EB", color: "#fff", border: "none", borderRadius: 9,
                  padding: "10px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(37,99,235,0.25)"
                }}
              >
                <Upload size={18} />
                Upload Sheet
              </button>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F0F0F4", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #F0F0F4" }}>
                  {["Name", "Email", "Department", "Semester", "Batch"].map((col, i) => (
                    <th key={col} style={{
                      padding: "14px 20px", textAlign: "left",
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
                      No records found in student master. Please upload a sheet.
                    </td>
                  </tr>
                ) : filtered.map((student, idx) => (
                  <tr key={student.id || idx} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F5F5F8" : "none" }}>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#1E2A4A", fontWeight: 500 }}>
                      {student.first_name} {student.last_name}
                    </td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563" }}>{student.email}</td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563" }}>{student.department}</td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563" }}>{student.semester}</td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563" }}>{student.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#fff", borderRadius: 12, padding: 32, width: 420,
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1E2A4A" }}>Upload Student Master</h2>
              <button onClick={() => setShowUploadModal(false)} style={{
                background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888"
              }}>✕</button>
            </div>
            
            <p style={{ fontSize: 14, color: "#4B5563", marginBottom: 24 }}>
              Upload a CSV file containing the student master records. Please make sure you have downloaded and used the correct template format.
            </p>

            <div style={{
              border: "2px dashed #E5E7EB", borderRadius: 12, padding: 32,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              background: "#F9FAFB", marginBottom: 24, cursor: "pointer"
            }}>
              <FileText size={32} color="#9CA3AF" style={{ marginBottom: 12 }} />
              <input 
                type="file" 
                accept=".csv"
                onChange={e => setFile(e.target.files[0])}
                style={{ marginBottom: 12 }}
              />
              <span style={{ fontSize: 12, color: "#6B7280" }}>Only .csv files are supported</span>
            </div>

            {uploadResult && (
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: 12, borderRadius: 8, marginBottom: 24,
                background: uploadResult.success ? "#ECFDF5" : "#FEF2F2",
                color: uploadResult.success ? "#059669" : "#DC2626"
              }}>
                {uploadResult.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span style={{ fontSize: 13, fontWeight: 500 }}>{uploadResult.message}</span>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setShowUploadModal(false)} style={{
                padding: "9px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB",
                background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151"
              }}>Cancel</button>
              <button 
                onClick={handleFileUpload} 
                disabled={!file || uploading}
                style={{
                  padding: "9px 20px", borderRadius: 8, border: "none", display: "flex", alignItems: "center", gap: 8,
                  background: !file ? "#9CA3AF" : "#2563EB", color: "#fff", cursor: !file ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 14
              }}>
                {uploading ? <Loader2 size={16} className="animate-spin" /> : null}
                {uploading ? "Uploading..." : "Upload File"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
