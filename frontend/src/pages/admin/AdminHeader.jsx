import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  User,
  Settings,
  Lock,
  LogOut,
  ChevronDown,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Mail,
  Building,
  Shield,
  Clock,
  Sparkles,
  AlertCircle,
  BookOpen,
  UserCheck,
  FileText,
  Check
} from 'lucide-react';
import api from '../../services/api';

export default function AdminHeader({ pageTitle = "Admin Dashboard", pageSubtitle = "Here's what's happening on your platform today.", breadcrumbs = [] }) {
  const navigate = useNavigate();

  // Popover States
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'settings' | 'password' | null

  // Dynamic User Profile State (persisted in localStorage)
  const [userData, setUserData] = useState(() => {
    const savedName = localStorage.getItem('user_name') || 'Admin User';
    const savedEmail = localStorage.getItem('user_email') || 'admin@college.edu';
    const savedDept = localStorage.getItem('user_dept') || 'Computer Science & IT';
    return {
      name: savedName,
      email: savedEmail,
      department: savedDept,
      employeeId: 'ADM-2024-001',
      role: 'System Administrator',
      joinDate: 'Jan 15, 2024',
      emailAlerts: true,
      securityAlerts: true
    };
  });

  // Calculate initials dynamically
  const initials = userData.name
    ? userData.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'AU';

  // Dynamic Notifications State
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  // Fetch dynamic notifications & activity logs from Backend Dashboard API
  useEffect(() => {
    fetchDynamicNotifications();
  }, []);

  const fetchDynamicNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const res = await api.getAdminDashboard();
      if (res && res.data) {
        const items = [];
        
        // 1. Dynamic Recent Registrations
        if (Array.isArray(res.data.recentRegistrations)) {
          res.data.recentRegistrations.forEach((reg) => {
            items.push({
              id: `reg-${reg.id}`,
              title: 'New Registration',
              message: `User ${reg.email || 'account'} registered on the platform.`,
              time: reg.created_at ? new Date(reg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
              rawTime: reg.created_at ? new Date(reg.created_at).getTime() : Date.now(),
              read: false,
              icon: UserCheck,
              iconBg: '#e0e7ff',
              iconColor: '#4f46e5'
            });
          });
        }

        // 2. Dynamic Recent Course Creations
        if (Array.isArray(res.data.recentCourseCreation)) {
          res.data.recentCourseCreation.forEach((crs) => {
            items.push({
              id: `crs-${crs.id}`,
              title: 'Course Updated',
              message: `${crs.title || 'Course'} (${crs.code || 'Code'}) is now active.`,
              time: crs.created_at ? new Date(crs.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
              rawTime: crs.created_at ? new Date(crs.created_at).getTime() : Date.now(),
              read: false,
              icon: BookOpen,
              iconBg: '#dcfce7',
              iconColor: '#059669'
            });
          });
        }

        // 3. Dynamic Recent Resource Uploads
        if (Array.isArray(res.data.recentResourceUploads)) {
          res.data.recentResourceUploads.forEach((resItem) => {
            items.push({
              id: `res-${resItem.id}`,
              title: 'Resource Uploaded',
              message: resItem.title ? `New resource "${resItem.title}" uploaded.` : 'New academic resource file uploaded.',
              time: resItem.created_at ? new Date(resItem.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
              rawTime: resItem.created_at ? new Date(resItem.created_at).getTime() : Date.now(),
              read: false,
              icon: FileText,
              iconBg: '#ffedd5',
              iconColor: '#ea580c'
            });
          });
        }

        // Sort items by timestamp descending
        items.sort((a, b) => b.rawTime - a.rawTime);

        if (items.length > 0) {
          setNotifications(items.slice(0, 8));
        } else {
          // Fallback sample linear notifications if DB empty
          setNotifications([
            {
              id: 'sample-1',
              title: 'System Initialized',
              message: 'College Management System is online and ready.',
              time: 'Just now',
              read: false,
              icon: Shield,
              iconBg: '#e0e7ff',
              iconColor: '#4f46e5'
            }
          ]);
        }
      }
    } catch (err) {
      console.warn('Notification fetch warning:', err);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Change Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordError, setPasswordError] = useState('');

  // Notification Action Handlers
  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const handleClearAll = () => {
    setNotifications([]);
    showToast('Notifications cleared');
  };

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Password Submit Handler
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setActiveModal(null);
    showToast('Password updated successfully!');
  };

  // Settings Submit Handler (saves dynamically to localStorage)
  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_name', userData.name);
    localStorage.setItem('user_email', userData.email);
    localStorage.setItem('user_dept', userData.department);
    setActiveModal(null);
    showToast('Profile & settings saved successfully!');
  };

  return (
    <>
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #eaddd3',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0b1a30', letterSpacing: '0.01em' }}>
            {pageTitle}
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {pageSubtitle}
          </p>
          {breadcrumbs.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {index > 0 && <span>›</span>}
                  <span style={index === breadcrumbs.length - 1 ? { color: '#64748b', fontWeight: 600 } : {}}>
                    {crumb.label}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="bell-animated"
              style={{
                position: 'relative',
                cursor: 'pointer',
                background: notificationsOpen ? '#f3eae2' : '#fcf9f6',
                border: '1px solid #e3d2c4',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              title="Notifications"
            >
              <Bell size={20} color={notificationsOpen ? '#0b1a30' : '#374151'} />
              {unreadCount > 0 && (
                <span
                  className="badge-animated"
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    background: '#ef4444',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    fontSize: 10,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 2px #ffffff'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Linear Dropdown Popover */}
            {notificationsOpen && (
              <div
                className="dropdown-animate"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 10px)',
                  width: 360,
                  background: '#ffffff',
                  border: '1px solid #eaddd3',
                  borderRadius: 12,
                  boxShadow: '0 10px 30px rgba(11, 26, 48, 0.09)',
                  zIndex: 99,
                  overflow: 'hidden'
                }}
              >
                {/* Linear Header matching application palette */}
                <div
                  style={{
                    padding: '12px 16px',
                    background: '#f8f4f0',
                    borderBottom: '1px solid #eaddd3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Bell size={16} color="#0b1a30" />
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0b1a30' }}>Notifications</span>
                    {unreadCount > 0 && (
                      <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      style={{ background: 'transparent', border: 'none', color: '#0b1a30', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark read
                    </button>
                  )}
                </div>

                <div style={{ maxHeight: 310, overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '32px 20px', textAlign: 'center', color: '#6b7280' }}>
                      <CheckCircle2 size={32} color="#9ca3af" style={{ margin: '0 auto 8px' }} />
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0b1a30' }}>All caught up</p>
                      <p style={{ margin: '4px 0 0', fontSize: 12 }}>No new notifications at this time.</p>
                    </div>
                  ) : (
                    notifications.map((item) => {
                      const IconComp = item.icon || Sparkles;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleNotificationClick(item.id)}
                          style={{
                            padding: '12px 16px',
                            borderBottom: '1px solid #f3eae2',
                            background: item.read ? '#ffffff' : '#fcf9f6',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: 12,
                            alignItems: 'flex-start',
                            transition: 'background 0.15s ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#f8f4f0')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = item.read ? '#ffffff' : '#fcf9f6')}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: item.iconBg || '#e0e7ff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: 2
                            }}
                          >
                            <IconComp size={15} color={item.iconColor || '#4f46e5'} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <p style={{ margin: 0, fontSize: 13, fontWeight: item.read ? 600 : 700, color: '#0b1a30' }}>
                                {item.title}
                              </p>
                              {!item.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6' }} />}
                            </div>
                            <p style={{ margin: '3px 0 4px', fontSize: 12, color: '#6b7280', lineHeight: 1.35 }}>
                              {item.message}
                            </p>
                            <span style={{ fontSize: 11, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Clock size={11} /> {item.time}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {notifications.length > 0 && (
                  <div style={{ padding: '10px 16px', background: '#f8f4f0', borderTop: '1px solid #eaddd3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={handleClearAll}
                      style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      Clear all
                    </button>
                    <span
                      style={{ fontSize: 12, color: '#64748b', cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Close
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Menu Trigger */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: 10,
                background: profileOpen ? '#f3eae2' : 'transparent',
                border: '1px solid transparent',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!profileOpen) e.currentTarget.style.background = '#fcf9f6';
              }}
              onMouseLeave={(e) => {
                if (!profileOpen) e.currentTarget.style.background = 'transparent';
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#0b1a30',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 13
                }}
              >
                {initials}
              </div>
              <div style={{ lineHeight: 1.35, textAlign: 'left' }}>
                <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>Welcome,</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#0b1a30' }}>{userData.name}</div>
              </div>
              <ChevronDown
                size={14}
                color="#9ca3af"
                style={{ transition: 'transform 0.2s ease', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)' }}
              />
            </button>

            {/* Profile Linear Dropdown */}
            {profileOpen && (
              <div
                className="dropdown-animate"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  background: '#ffffff',
                  border: '1px solid #eaddd3',
                  borderRadius: 12,
                  boxShadow: '0 10px 30px rgba(11, 26, 48, 0.09)',
                  minWidth: 210,
                  zIndex: 99,
                  overflow: 'hidden'
                }}
              >
                <div style={{ padding: '12px 16px', background: '#f8f4f0', borderBottom: '1px solid #eaddd3' }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0b1a30' }}>{userData.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#64748b' }}>{userData.email}</p>
                </div>

                <div style={{ padding: '6px 0' }}>
                  {[
                    {
                      label: 'My Profile',
                      icon: User,
                      action: () => {
                        setProfileOpen(false);
                        setActiveModal('profile');
                      }
                    },
                    {
                      label: 'Account Settings',
                      icon: Settings,
                      action: () => {
                        setProfileOpen(false);
                        setActiveModal('settings');
                      }
                    },
                    {
                      label: 'Change Password',
                      icon: Lock,
                      action: () => {
                        setProfileOpen(false);
                        setActiveModal('password');
                      }
                    }
                  ].map(({ label, icon: Icon, action }) => (
                    <div
                      key={label}
                      onClick={action}
                      style={{
                        padding: '10px 16px',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#0b1a30',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f8f4f0';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Icon size={16} color="#6b7280" /> {label}
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #eaddd3', padding: '6px 0' }}>
                  <div
                    onClick={handleLogout}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#fef2f2')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={16} color="#dc2626" /> Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#0b1a30',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: 10,
            boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 13,
            fontWeight: 600,
            zIndex: 9999
          }}
        >
          <CheckCircle2 size={18} color="#4ade80" />
          {toastMessage}
        </div>
      )}

      {/* Modal 1: Linear My Profile */}
      {activeModal === 'profile' && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 26, 48, 0.35)',
            backdropFilter: 'blur(3px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            className="modal-content-animate"
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #eaddd3',
              width: '100%',
              maxWidth: 480,
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(11, 26, 48, 0.12)'
            }}
          >
            <div
              style={{
                background: '#f8f4f0',
                borderBottom: '1px solid #eaddd3',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#0b1a30',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 800
                  }}
                >
                  {initials}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0b1a30' }}>{userData.name}</h3>
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{userData.role}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: '#fcf9f6', padding: 14, borderRadius: 8, border: '1px solid #e3d2c4' }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Mail size={13} /> Email Address
                  </span>
                  <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: '#0b1a30' }}>{userData.email}</p>
                </div>
                <div style={{ background: '#fcf9f6', padding: 14, borderRadius: 8, border: '1px solid #e3d2c4' }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Building size={13} /> Department
                  </span>
                  <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: '#0b1a30' }}>{userData.department}</p>
                </div>
                <div style={{ background: '#fcf9f6', padding: 14, borderRadius: 8, border: '1px solid #e3d2c4' }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Shield size={13} /> Employee ID
                  </span>
                  <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: '#0b1a30' }}>{userData.employeeId}</p>
                </div>
                <div style={{ background: '#fcf9f6', padding: 14, borderRadius: 8, border: '1px solid #e3d2c4' }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Clock size={13} /> Joined Date
                  </span>
                  <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: '#0b1a30' }}>{userData.joinDate}</p>
                </div>
              </div>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  onClick={() => setActiveModal(null)}
                  style={{ padding: '9px 18px', background: '#f3eae2', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#0b1a30', cursor: 'pointer' }}
                >
                  Close
                </button>
                <button
                  onClick={() => setActiveModal('settings')}
                  style={{ padding: '9px 18px', background: '#0b1a30', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
                >
                  Edit Profile Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Linear Account Settings */}
      {activeModal === 'settings' && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 26, 48, 0.35)',
            backdropFilter: 'blur(3px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            className="modal-content-animate"
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #eaddd3',
              width: '100%',
              maxWidth: 480,
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(11, 26, 48, 0.12)'
            }}
          >
            <div
              style={{
                padding: '18px 24px',
                background: '#f8f4f0',
                borderBottom: '1px solid #eaddd3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Settings size={18} color="#0b1a30" />
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0b1a30' }}>Account Settings</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSettingsSubmit} style={{ padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                    Full Display Name
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, outline: 'none', color: '#0b1a30' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, outline: 'none', color: '#0b1a30' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                    Department
                  </label>
                  <select
                    value={userData.department}
                    onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, outline: 'none', color: '#0b1a30' }}
                  >
                    <option value="Computer Science & IT">Computer Science & IT</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>

                <div style={{ borderTop: '1px solid #f3eae2', paddingTop: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 10 }}>
                    Preferences & Alerts
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={userData.emailAlerts}
                        onChange={(e) => setUserData({ ...userData, emailAlerts: e.target.checked })}
                      />
                      Receive email notifications for critical updates
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={userData.securityAlerts}
                        onChange={(e) => setUserData({ ...userData, securityAlerts: e.target.checked })}
                      />
                      Enable security alerts on new logins
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  style={{ padding: '9px 18px', background: '#f3eae2', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#0b1a30', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 18px', background: '#0b1a30', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Linear Change Password */}
      {activeModal === 'password' && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 26, 48, 0.35)',
            backdropFilter: 'blur(3px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            className="modal-content-animate"
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #eaddd3',
              width: '100%',
              maxWidth: 440,
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(11, 26, 48, 0.12)'
            }}
          >
            <div
              style={{
                padding: '18px 24px',
                background: '#f8f4f0',
                borderBottom: '1px solid #eaddd3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Lock size={18} color="#0b1a30" />
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0b1a30' }}>Change Password</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} style={{ padding: 24 }}>
              {passwordError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertCircle size={16} /> {passwordError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                    Current Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      style={{ width: '100%', padding: '9px 36px 9px 12px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, outline: 'none', color: '#0b1a30' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                    >
                      {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                    New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      style={{ width: '100%', padding: '9px 36px 9px 12px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, outline: 'none', color: '#0b1a30' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                    >
                      {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                    Confirm New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="Re-enter new password"
                      style={{ width: '100%', padding: '9px 36px 9px 12px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, outline: 'none', color: '#0b1a30' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                    >
                      {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  style={{ padding: '9px 18px', background: '#f3eae2', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#0b1a30', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 18px', background: '#0b1a30', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
