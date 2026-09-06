import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { User, Mail, Building, Shield, Clock, Lock, Settings, Save, CheckCircle2 } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(() => ({
    name: localStorage.getItem('user_name') || 'Admin User',
    email: localStorage.getItem('user_email') || 'admin@college.edu',
    department: localStorage.getItem('user_dept') || 'Computer Science & IT',
    employeeId: 'ADM-2024-001',
    role: 'System Administrator',
    joinDate: 'Jan 15, 2024'
  }));

  const [saved, setSaved] = useState(false);

  const initials = profile.name
    ? profile.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'AU';

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user_name', profile.name);
    localStorage.setItem('user_email', profile.email);
    localStorage.setItem('user_dept', profile.department);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout
      title="Admin Profile & Account Settings"
      subtitle="View and update your personal information and preferences."
      activePath="/admin/profile"
      breadcrumbs={[{ label: 'Admin', path: '/admin' }, { label: 'Profile' }]}
    >
      <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Profile Card Header */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1px solid #eaddd3',
            padding: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 2px 8px rgba(11,26,48,0.04)'
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#0b1a30',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 800
            }}
          >
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0b1a30' }}>{profile.name}</h2>
              <span style={{ background: '#f3eae2', color: '#0b1a30', padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
                {profile.role}
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>{profile.email}</p>
          </div>
        </div>

        {/* Profile Details Form */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1px solid #eaddd3',
            padding: 28,
            boxShadow: '0 2px 8px rgba(11,26,48,0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #f3eae2' }}>
            <Settings size={18} color="#0b1a30" />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0b1a30' }}>Personal Details</h3>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                  Full Display Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, color: '#0b1a30', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, color: '#0b1a30', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                  Department
                </label>
                <select
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, color: '#0b1a30', outline: 'none' }}
                >
                  <option value="Computer Science & IT">Computer Science & IT</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                  Employee ID
                </label>
                <input
                  type="text"
                  value={profile.employeeId}
                  disabled
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#f3eae2', fontSize: 13, color: '#64748b', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              {saved ? (
                <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={16} /> Saved successfully
                </span>
              ) : (
                <span />
              )}
              <button
                type="submit"
                style={{ padding: '10px 22px', background: '#0b1a30', color: '#ffffff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Save size={15} /> Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
