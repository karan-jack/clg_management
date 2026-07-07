import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  BookOpen,
  GraduationCap,
  BarChart2,
  User,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Settings,
  Lock,
  LogOut,
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard', icon: Home, path: '/admin' },
  {
    label: 'User Management',
    icon: User,
    children: [
      { label: 'Students', path: '/admin/students' },
      { label: 'Professors', path: '/admin/professors' },
      { label: 'Admins', path: '/admin/admins' },
    ],
  },
  {
    label: 'Academic Management',
    icon: BookOpen,
    children: [
      { label: 'Student Master', path: '/admin/student-master' },
      { label: 'Batches', path: '/admin/batches' },
      { label: 'Subjects', path: '/admin/subjects' },
    ],
  },
  {
    label: 'Learning Management',
    icon: GraduationCap,
    children: [
      { label: 'Courses', path: '/admin/courses' },
      { label: 'Learning Paths', path: '/admin/learning-paths' },
    ],
  },
  { label: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
  { label: 'Profile', icon: User, path: '/admin/profile' },
];

export default function AdminLayout({ title, subtitle, children, activePath, breadcrumbs = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(() => NAV.map((item) => item.children?.length || false));
  const [profileOpen, setProfileOpen] = useState(false);

  const currentPath = activePath || location.pathname;

  const toggleSection = (index) => {
    setExpanded((prev) => prev.map((value, idx) => (idx === index ? !value : value)));
  };

  const handleNavigate = (path) => {
    if (path) navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isActive = (path) => currentPath === path || (path === '/admin' && currentPath === '/admin');

  const pageTitle = title || 'Admin Dashboard';
  const pageSubtitle = subtitle || "Here's what's happening on your platform today.";

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f0eb', fontFamily: "'Inter', 'Segoe UI', sans-serif", color: '#111827' }}>
      <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px 16px', fontWeight: 800, fontSize: 20, letterSpacing: '0.06em' }}>NAME</div>
        <div style={{ padding: '0 14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '7px 12px' }}>
            <Search size={14} color="#9ca3af" />
            <input placeholder="Search..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#374151', width: '100%' }} />
          </div>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
          {NAV.map((item, index) => {
            const Icon = item.icon;
            const hasChildren = Boolean(item.children?.length);
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => (hasChildren ? toggleSection(index) : handleNavigate(item.path))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 20px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 13,
                    color: '#111827',
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon size={15} color="#6b7280" /> {item.label}
                  </span>
                  {hasChildren && (expanded[index] ? <ChevronDown size={13} color="#9ca3af" /> : <ChevronRight size={13} color="#9ca3af" />)}
                </button>

                {hasChildren && expanded[index] && (
                  <div>
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        type="button"
                        onClick={() => handleNavigate(child.path)}
                        style={{
                          padding: '7px 20px 7px 44px',
                          cursor: 'pointer',
                          fontSize: 13,
                          fontWeight: isActive(child.path) ? 600 : 400,
                          color: isActive(child.path) ? '#4f46e5' : '#6b7280',
                          background: isActive(child.path) ? '#eef2ff' : 'transparent',
                          borderRadius: '0 20px 20px 0',
                          marginRight: 12,
                          width: '100%',
                          border: 'none',
                          textAlign: 'left',
                        }}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 20 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#111827' }}>{pageTitle}</h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>{pageSubtitle}</p>
            {breadcrumbs.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {index > 0 && <span>›</span>}
                    <span style={index === breadcrumbs.length - 1 ? { color: '#64748b', fontWeight: 600 } : {}}>{crumb.label}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={22} color="#374151" />
              <span style={{ position: 'absolute', top: -5, right: -5, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 17, height: 17, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</span>
            </div>

            <div style={{ position: 'relative' }}>
              <button type="button" onClick={() => setProfileOpen((value) => !value)} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '5px 8px', borderRadius: 8, background: profileOpen ? '#f3f4f6' : 'transparent', border: 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1e3a5f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>AU</div>
                <div style={{ lineHeight: 1.35, textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>Welcome,</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>Admin User</div>
                </div>
                <ChevronDown size={13} color="#9ca3af" />
              </button>

              {profileOpen && (
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 190, zIndex: 99, overflow: 'hidden' }}>
                  {[{ label: 'My Profile', icon: User }, { label: 'Account Settings', icon: Settings }, { label: 'Change Password', icon: Lock }].map(({ label, icon: Icon }) => (
                    <div key={label} style={{ padding: '11px 16px', cursor: 'pointer', fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Icon size={15} color="#6b7280" /> {label}
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #e5e7eb' }} />
                  <div onClick={handleLogout} style={{ padding: '11px 16px', cursor: 'pointer', fontSize: 13, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <LogOut size={15} color="#ef4444" /> Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflow: 'auto', padding: 24, background: '#f8fafc' }}>{children}</main>
      </div>
    </div>
  );
}
