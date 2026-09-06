import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  User,
  BookOpen,
  GraduationCap,
  BarChart2,
  ChevronDown,
  ChevronRight,
  Search,
} from 'lucide-react';
import AdminHeader from './AdminHeader';

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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fdfaf7', fontFamily: "'Inter', 'Segoe UI', sans-serif", color: '#0b1a30' }}>
      <aside style={{ width: 240, background: '#f3eae2', borderRight: '1px solid #ebdcd0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px 16px', fontWeight: 800, fontSize: 20, letterSpacing: '0.06em' }}>NAME</div>
        <div style={{ padding: '0 14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fcf9f6', border: '1px solid #e3d2c4', borderRadius: 8, padding: '7px 12px' }}>
            <Search size={14} color="#9ca3af" />
            <input placeholder="Search..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#0b1a30', width: '100%' }} />
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
                    color: '#0b1a30',
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
                          color: isActive(child.path) ? '#0b1a30' : '#6b7280',
                          background: isActive(child.path) ? '#d8cdc4' : 'transparent',
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
        <AdminHeader pageTitle={pageTitle} pageSubtitle={pageSubtitle} breadcrumbs={breadcrumbs} />

        <main style={{ flex: 1, overflow: 'auto', padding: 24, background: '#fbf8f5' }}>{children}</main>
      </div>
    </div>
  );
}
