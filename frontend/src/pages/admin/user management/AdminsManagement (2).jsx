import { useState } from "react";

const initialAdmins = [
  { id: 1, name: "Karan Das", email: "karan.das@college.edu", role: "Super Admin" },
  { id: 2, name: "Priya Sen", email: "priya.sen@college.edu", role: "Admin" },
  { id: 3, name: "Rahul Roy", email: "rahul.roy@college.edu", role: "Admin" },
  { id: 4, name: "Ankit Mehta", email: "ankit.mehta@college.edu", role: "Admin" },
  { id: 5, name: "Neha Kapoor", email: "neha.kapoor@college.edu", role: "Moderator" },
  { id: 6, name: "Vikram Singh", email: "vikram.singh@college.edu", role: "Moderator" },
  { id: 7, name: "Sneha Iyer", email: "sneha.iyer@college.edu", role: "Content Manager" },
  { id: 8, name: "Arjun Patel", email: "arjun.patel@college.edu", role: "Support Admin" },
];

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
  const [admins, setAdmins] = useState(initialAdmins);
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState(["user", "academic", "learning", "analytics"]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const toggleSection = (section) =>
    setOpenSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );

  const filtered = admins.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleCreate = (form) => {
    setAdmins(prev => [...prev, { ...form, id: Date.now() }]);
    setModal(null);
  };

  const handleEdit = (form) => {
    setAdmins(prev => prev.map(a => a.id === modal.admin.id ? { ...a, ...form } : a));
    setModal(null);
  };

  const handleDelete = () => {
    setAdmins(prev => prev.filter(a => a.id !== modal.admin.id));
    setModal(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#F8F9FC" }}>

      {/* Sidebar */}
      <aside style={{
        width: 240, background: "#fff", borderRight: "1px solid #F0F0F4",
        display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto"
      }}>
        <div style={{ padding: "24px 20px 16px", fontWeight: 800, fontSize: 22, color: "#1E2A4A", letterSpacing: "-0.5px" }}>
          NAME
        </div>
        <div style={{ padding: "0 12px 16px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, background: "#F3F4F6",
            borderRadius: 8, padding: "8px 12px"
          }}>
            <span style={{ color: "#9CA3AF", fontSize: 14 }}>🔍</span>
            <input
              placeholder="Search..."
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 14, color: "#374151", width: "100%" }}
            />
          </div>
        </div>
        <nav style={{ flex: 1, padding: "0 8px" }}>
          {navItems.map(item => (
            <div key={item.label}>
              <div
                onClick={() => item.section && toggleSection(item.section)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "9px 12px", borderRadius: 8, cursor: "pointer",
                  color: "#374151", fontSize: 14, fontWeight: item.children ? 600 : 500,
                  userSelect: "none"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span>{item.icon} {item.label}</span>
                {item.children && (
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                    {openSections.includes(item.section) ? "▲" : "▼"}
                  </span>
                )}
              </div>
              {item.children && openSections.includes(item.section) && (
                <div style={{ marginLeft: 16, marginBottom: 4 }}>
                  {item.children.map(child => (
                    <div
                      key={child}
                      style={{
                        padding: "7px 12px", borderRadius: 8, fontSize: 13,
                        fontWeight: child === "Admins" ? 600 : 400,
                        color: child === "Admins" ? "#2563EB" : "#4B5563",
                        background: child === "Admins" ? "#EFF6FF" : "transparent",
                        cursor: "pointer"
                      }}
                      onMouseEnter={e => { if (child !== "Admins") e.currentTarget.style.background = "#F3F4F6"; }}
                      onMouseLeave={e => { if (child !== "Admins") e.currentTarget.style.background = "transparent"; }}
                    >
                      {child}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <header style={{
          background: "#fff", borderBottom: "1px solid #F0F0F4",
          padding: "0 32px", height: 64, display: "flex", alignItems: "center",
          justifyContent: "flex-end", gap: 16, flexShrink: 0, position: "relative"
        }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 4 }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <span style={{
              position: "absolute", top: 0, right: 0, background: "#EF4444", color: "#fff",
              borderRadius: "50%", fontSize: 10, width: 16, height: 16,
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
            }}>3</span>
          </button>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setProfileOpen(p => !p)}
              style={{
                display: "flex", alignItems: "center", gap: 10, background: "none",
                border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 8
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "50%", background: "#1E2A4A",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 13
              }}>AU</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>Welcome,</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1E2A4A" }}>Admin User</div>
              </div>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>▼</span>
            </button>
            {profileOpen && (
              <div style={{
                position: "absolute", right: 0, top: 50, background: "#fff",
                border: "1px solid #E5E7EB", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                zIndex: 100, width: 200, overflow: "hidden"
              }}>
                {["My Profile", "Account Settings", "Change Password"].map(item => (
                  <div key={item} style={{ padding: "12px 16px", fontSize: 14, cursor: "pointer", color: "#374151" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                  >{item}</div>
                ))}
                <div style={{ borderTop: "1px solid #F3F4F6" }}>
                  <div style={{ padding: "12px 16px", fontSize: 14, cursor: "pointer", color: "#EF4444" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FFF1F2"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                  >Logout</div>
                </div>
              </div>
            )}
          </div>
        </header>

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
                {paginated.map((admin, idx) => (
                  <tr key={admin.id} style={{ borderBottom: idx < paginated.length - 1 ? "1px solid #F5F5F8" : "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#1E2A4A", fontWeight: 500 }}>{admin.name}</td>
                    <td style={{ padding: "15px 20px", fontSize: 14, color: "#4B5563" }}>{admin.email}</td>
                    <td style={{ padding: "15px 20px" }}>
                      <span style={{
                        ...roleBadgeStyles[admin.role],
                        padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600
                      }}>{admin.role}</span>
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
                ))}
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
      </div>

      {/* Modals */}
      {modal?.type === "view" && (
        <Modal title="Admin Details" onClose={() => setModal(null)}>
          {[["Name", modal.admin.name], ["Email", modal.admin.email]].map(([label, val]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600, marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 15, color: "#1E2A4A", fontWeight: 500 }}>{val}</div>
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600, marginBottom: 6 }}>Role</div>
            <span style={{ ...roleBadgeStyles[modal.admin.role], padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{modal.admin.role}</span>
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
            Are you sure you want to delete <strong>{modal.admin.name}</strong>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151" }}>Cancel</button>
            <button onClick={handleDelete} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: "#EF4444", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
