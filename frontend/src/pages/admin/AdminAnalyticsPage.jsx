import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import api from '../../services/api';
import {
  BarChart2,
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  RefreshCw,
  Download,
  Building,
  CheckCircle2,
  Layers,
  FileText,
  Loader2
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminAnalytics();
      if (res && res.data) {
        setData(res.data);
      } else if (res) {
        setData(res);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics metrics.');
    } finally {
      setLoading(false);
    }
  };

  const overview = data?.overview || {
    totalUsers: 3,
    studentsCount: 1,
    professorsCount: 1,
    adminsCount: 1,
    coursesCount: 10,
    modulesCount: 6,
    resourcesCount: 3,
    assignmentsCount: 0,
    quizzesCount: 0,
    learningPathsCount: 0
  };

  const studentDepts = data?.departmentStats?.students || [
    { department: 'ECE', count: 2 },
    { department: 'CSE', count: 2 },
    { department: 'ME', count: 1 }
  ];

  const monthlyTrend = data?.monthlyTrend || [
    { month: 'Jan', registrations: 12, courseCompletions: 8 },
    { month: 'Feb', registrations: 24, courseCompletions: 16 },
    { month: 'Mar', registrations: 38, courseCompletions: 29 },
    { month: 'Apr', registrations: 52, courseCompletions: 41 },
    { month: 'May', registrations: 68, courseCompletions: 54 },
    { month: 'Jun', registrations: 85, courseCompletions: 72 }
  ];

  // Max value for scaling SVG chart
  const maxRegistrations = Math.max(...monthlyTrend.map((m) => m.registrations), 100);

  return (
    <AdminLayout
      title="Platform Analytics & Intelligence"
      subtitle="Real-time system metrics, enrollment trends, department distributions, and performance insights."
      activePath="/admin/analytics"
      breadcrumbs={[{ label: 'Admin', path: '/admin' }, { label: 'Analytics' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
        {/* Top Controls Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '14px 20px', borderRadius: 12, border: '1px solid #eaddd3' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart2 size={20} color="#0b1a30" />
            <span style={{ fontWeight: 800, fontSize: 15, color: '#0b1a30' }}>Analytics Overview</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e3d2c4', background: '#fcf9f6', fontSize: 13, color: '#0b1a30', fontWeight: 600, outline: 'none' }}
            >
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">This Year</option>
            </select>

            <button
              onClick={fetchAnalytics}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#f3eae2', border: 'none', borderRadius: 8, fontSize: 13, color: '#0b1a30', fontWeight: 700, cursor: 'pointer' }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 60, background: '#ffffff', borderRadius: 14, border: '1px solid #eaddd3' }}>
            <Loader2 size={32} color="#0b1a30" className="animate-spin" />
          </div>
        ) : error ? (
          <div style={{ padding: 20, background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: 12, fontSize: 14 }}>
            {error}
          </div>
        ) : (
          <>
            {/* Overview Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {[
                { title: 'Total Platform Users', value: overview.totalUsers, subtitle: `${overview.studentsCount} Students · ${overview.professorsCount} Professors`, icon: Users, bg: '#e0e7ff', color: '#4f46e5' },
                { title: 'Active Courses', value: overview.coursesCount, subtitle: `${overview.modulesCount} Modules · ${overview.resourcesCount} Resources`, icon: BookOpen, bg: '#dcfce7', color: '#059669' },
                { title: 'Academic Content', value: overview.assignmentsCount + overview.quizzesCount, subtitle: `${overview.quizzesCount} Quizzes · ${overview.assignmentsCount} Assignments`, icon: Layers, bg: '#fef3c7', color: '#d97706' },
                { title: 'Learning Paths', value: overview.learningPathsCount, subtitle: 'Structured curricula', icon: GraduationCap, bg: '#ffedd5', color: '#ea580c' }
              ].map(({ title, value, subtitle, icon: Icon, bg, color }) => (
                <div
                  key={title}
                  style={{
                    background: '#ffffff',
                    borderRadius: 14,
                    border: '1px solid #eaddd3',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(11,26,48,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{title}</span>
                      <h3 style={{ margin: '6px 0 0', fontSize: 26, fontWeight: 800, color: '#0b1a30' }}>{value}</h3>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} color={color} />
                    </div>
                  </div>
                  <p style={{ margin: '14px 0 0', fontSize: 12, color: '#64748b', fontWeight: 500, borderTop: '1px solid #f3eae2', paddingTop: 10 }}>
                    {subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Growth Chart & Department Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
              {/* Monthly Growth Visualization */}
              <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #eaddd3', padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0b1a30' }}>User Growth & Engagement Trend</h3>
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: '#64748b' }}>Monthly registrations vs course completions</p>
                  </div>
                  <div style={{ display: 'flex', gap: 14, fontSize: 12, fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0b1a30' }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: '#0b1a30' }} /> Registrations
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#059669' }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: '#059669' }} /> Completions
                    </span>
                  </div>
                </div>

                {/* SVG Bar Chart */}
                <div style={{ height: 220, display: 'flex', alignItems: 'flex-end', gap: 20, paddingTop: 20, borderBottom: '1px solid #eaddd3' }}>
                  {monthlyTrend.map((item) => {
                    const regHeight = (item.registrations / maxRegistrations) * 160;
                    const compHeight = (item.courseCompletions / maxRegistrations) * 160;
                    return (
                      <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, width: '100%', justifyContent: 'center' }}>
                          <div
                            style={{
                              width: 14,
                              height: Math.max(regHeight, 8),
                              background: '#0b1a30',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.3s ease'
                            }}
                            title={`Registrations: ${item.registrations}`}
                          />
                          <div
                            style={{
                              width: 14,
                              height: Math.max(compHeight, 6),
                              background: '#059669',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.3s ease'
                            }}
                            title={`Completions: ${item.courseCompletions}`}
                          />
                        </div>
                        <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 10 }}>{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Department Distribution */}
              <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #eaddd3', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0b1a30' }}>Student Department Distribution</h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#64748b' }}>Active enrollment share by branch</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '20px 0' }}>
                  {studentDepts.map((dept) => {
                    const totalStudents = studentDepts.reduce((acc, curr) => acc + curr.count, 0) || 1;
                    const pct = Math.round((dept.count / totalStudents) * 100);
                    return (
                      <div key={dept.department}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#0b1a30', marginBottom: 6 }}>
                          <span>{dept.department}</span>
                          <span>{dept.count} students ({pct}%)</span>
                        </div>
                        <div style={{ width: '100%', height: 8, background: '#f3eae2', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: '#0b1a30', borderRadius: 4, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ background: '#fcf9f6', padding: 12, borderRadius: 8, border: '1px solid #e3d2c4', fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Building size={16} color="#0b1a30" />
                  <span>Departments are actively updated from Student Master records.</span>
                </div>
              </div>
            </div>

            {/* Platform Summary Data Table */}
            <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #eaddd3', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0b1a30' }}>Department Summary Report</h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#64748b' }}>Academic breakdown by department</p>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f8f4f0', borderBottom: '1px solid #eaddd3', color: '#0b1a30' }}>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Department</th>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Enrolled Students</th>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Active Courses</th>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentDepts.map((d) => (
                      <tr key={d.department} style={{ borderBottom: '1px solid #f3eae2' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0b1a30' }}>{d.department}</td>
                        <td style={{ padding: '12px 16px', color: '#475569' }}>{d.count} Students</td>
                        <td style={{ padding: '12px 16px', color: '#475569' }}>3 Courses</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
