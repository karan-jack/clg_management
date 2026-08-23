import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../../services/api";
import { Loader2 } from "lucide-react";

const roleBadgeStyles = {
  "Super Admin": { background: "#F3E8FF", color: "#7C3AED", border: "1px solid #DDD6FE" },
  Admin: { background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" },
  Moderator: { background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" },
  "Content Manager": { background: "#FFF7ED", color: "#D97706", border: "1px solid #FED7AA" },
  "Support Admin": { background: "#FFF1F2", color: "#E11D48", border: "1px solid #FECDD3" },
};

const navItems = [
  { label: "Dashboard", icon: "🏠", section: null },
  {
    label: "User Management", icon: "👥", section: "user",
    children: ["Students", "Professors", "Admins"],
  },
  {
    label: "Academic Management", icon: "📚", section: "academic",
    children: ["Student Master", "Batches", "Subjects"],
  },
  {
    label: "Learning Management", icon: "🎓", section: "learning",
    children: ["Courses", "Learning Paths"],
  },
  { label: "Analytics", icon: "📊", section: "analytics", children: ["Platform Analytics"] },
  { label: "Profile", icon: "👤", section: null },
];

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", borderRadius: 12, padding: 32, width: 420,
        boxShadow: "0 8px 40px rgba(0,0,0,0.15)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1E2A4A" }}>{title}</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888"
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AdminForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { name: "", email: "", role: "Admin" });
  const roles = ["Super Admin", "Admin", "Moderator", "Content Manager", "Support Admin"];

  return (
    <div>
      {["name", "email"].map(field => (
        <div key={field} style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, textTransform: "capitalize" }}>
            {field}
          </label>
          <input
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            style={{
              width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB",
              borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s"
            }}
            onFocus={e => e.target.style.borderColor = "#2563EB"}
            onBlur={e => e.target.style.borderColor = "#E5E7EB"}
          />
        </div>
      ))}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Role</label>
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          style={{
            width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB",
            borderRadius: 8, fontSize: 14, outline: "none", background: "#fff", boxSizing: "border-box"
          }}
        >
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={{
          padding: "9px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB",
          background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151"
        }}>Cancel</button>
        <button onClick={() => onSave(form)} style={{
          padding: "9px 20px", borderRadius: 8, border: "none",
          background: "#2563EB", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14
        }}>Save</button>
      </div>
    </div>
  );
}

export default function AdminsManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await api.adminAdmins.getAll();
      if (res.success) {
        setAdmins(res.rows || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = admins.filter(a => {
    const adminName = a.name || `${a.first_name || ''} ${a.last_name || ''}`;
    return adminName.toLowerCase().includes(search.toLowerCase()) ||
           (a.email && a.email.toLowerCase().includes(search.toLowerCase()));
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleCreate = async (form) => {
    try {
      await api.adminAdmins.create({ 
        first_name: form.name.split(' ')[0], 
        last_name: form.name.split(' ').slice(1).join(' '),
        email: form.email,
        password: "password123", // default password
        role_id: 1 // Assuming 1 is Admin role in the DB
      });
      fetchAdmins();
      setModal(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (form) => {
    try {
      await api.adminAdmins.update(modal.admin.id, {
        first_name: form.name.split(' ')[0], 
        last_name: form.name.split(' ').slice(1).join(' '),
        email: form.email
      });
      fetchAdmins();
      setModal(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.adminAdmins.delete(modal.admin.id);
      fetchAdmins();
      setModal(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout
      title="Admins Management"
      subtitle="Manage administrator accounts, roles, and access."
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'User Management' }, { label: 'Admins' }]}
      activePath="/admin/admins"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>


        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: "#1E2A4A" }}>
            Admins Management
          </h1>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 24 }}>
            Dashboard › User Management › <span style={{ color: "#374151" }}>Admins</span>
          </div>

          {/* Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, background: "#fff",
              border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "8px 14px", width: 320
            }}>
              <span style={{ color: "#9CA3AF" }}>🔍</span>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search admin by name or email..."
                style={{ border: "none", outline: "none", fontSize: 14, color: "#374151", width: "100%", background: "transparent" }}
              />
            </div>
            <button
              onClick={() => setModal({ type: "create" })}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#2563EB", color: "#fff", border: "none", borderRadius: 9,
                padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer",
                boxShadow: "0 2px 8px rgba(37,99,235,0.25)"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#1D4ED8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2563EB"}
            >
              + Create New Admin
            </button>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F0F0F4", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #F0F0F4" }}>
                  {["Name ⇅", "Email ⇅", "Role ⇅", "Actions"].map((col, i) => (
                    <th key={col} style={{
                      padding: "14px 20px", textAlign: i === 3 ? "right" : "left",
                      fontSize: 13, fontWeight: 600, color: "#6B7280", whiteSpace: "nowrap"
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((admin, idx) => {
                  const adminName = admin.name || `${admin.first_name || ''} ${admin.last_name || ''}`;
                  const adminRole = admin.Role?.name || admin.role || "Admin";
                  return (
                  <tr key={admin.id} style={{ borderBottom: idx < paginated.length - 1 ? "1px solid #F5F5F8" : "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#1E2A4A", fontWeight: 500 }}>{adminName}</td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563" }}>{admin.email}</td>
                    <td style={{ padding: "15px 20px" }}>
                      <span style={{
                        ...(roleBadgeStyles[adminRole] || roleBadgeStyles.Admin),
                        padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600
                      }}>{adminRole}</span>
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        {[
                          { icon: "👁", type: "view" },
                          { icon: "✏️", type: "edit" },
                          { icon: "🗑", type: "delete" },
                        ].map(action => (
                          <button
                            key={action.type}
                            onClick={() => setModal({ type: action.type, admin })}
                            style={{
                              background: "none", border: "1px solid #E5E7EB",
                              borderRadius: 7, width: 32, height: 32, cursor: "pointer",
                              fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                              color: action.type === "delete" ? "#EF4444" : "#6B7280"
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = action.type === "delete" ? "#FFF1F2" : "#F3F4F6";
                            }}
                            onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
                          >{action.icon}</button>
                        ))}
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 20px", borderTop: "1px solid #F0F0F4", background: "#FAFAFA"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B7280" }}>
                Rows per page:
                <select
                  value={rowsPerPage}
                  onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                  style={{ padding: "4px 8px", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, background: "#fff", outline: "none" }}
                >
                  {[5, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>
                {(page - 1) * rowsPerPage + 1}–{Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  style={{ width: 32, height: 32, border: "1px solid #E5E7EB", borderRadius: 7, background: "#fff", cursor: page === 1 ? "not-allowed" : "pointer", color: page === 1 ? "#D1D5DB" : "#374151" }}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    style={{
                      width: 32, height: 32, border: "1px solid", borderRadius: 7,
                      borderColor: p === page ? "#2563EB" : "#E5E7EB",
                      background: p === page ? "#2563EB" : "#fff",
                      color: p === page ? "#fff" : "#374151",
                      fontWeight: p === page ? 700 : 400, cursor: "pointer"
                    }}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  style={{ width: 32, height: 32, border: "1px solid #E5E7EB", borderRadius: 7, background: "#fff", cursor: page === totalPages ? "not-allowed" : "pointer", color: page === totalPages ? "#D1D5DB" : "#374151" }}>›</button>
              </div>
            </div>
          </div>
        </main>

      {/* Modals */}
      {modal?.type === "view" && (
        <Modal title="Admin Details" onClose={() => setModal(null)}>
          {[["Name", modal.admin.name || `${modal.admin.first_name || ''} ${modal.admin.last_name || ''}`], ["Email", modal.admin.email]].map(([label, val]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600, marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 15, color: "#1E2A4A", fontWeight: 500 }}>{val}</div>
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600, marginBottom: 6 }}>Role</div>
            <span style={{ ...(roleBadgeStyles[modal.admin.Role?.name || modal.admin.role || "Admin"] || roleBadgeStyles.Admin), padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{modal.admin.Role?.name || modal.admin.role || "Admin"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151" }}>Close</button>
          </div>
        </Modal>
      )}

      {modal?.type === "edit" && (
        <Modal title="Edit Admin" onClose={() => setModal(null)}>
          <AdminForm initial={modal.admin} onSave={handleEdit} onCancel={() => setModal(null)} />
        </Modal>
      )}

      {modal?.type === "create" && (
        <Modal title="Create New Admin" onClose={() => setModal(null)}>
          <AdminForm onSave={handleCreate} onCancel={() => setModal(null)} />
        </Modal>
      )}

      {modal?.type === "delete" && (
        <Modal title="Delete Admin" onClose={() => setModal(null)}>
          <p style={{ color: "#4B5563", fontSize: 14, marginBottom: 24 }}>
            Are you sure you want to delete <strong>{modal.admin.name || `${modal.admin.first_name || ''} ${modal.admin.last_name || ''}`}</strong>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151" }}>Cancel</button>
            <button onClick={handleDelete} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: "#EF4444", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Delete</button>
          </div>
        </Modal>
      )}
      </div>
    </AdminLayout>
  );
}
