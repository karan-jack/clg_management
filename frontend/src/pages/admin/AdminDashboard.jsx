import { useState } from "react";
import {
  Users, GraduationCap, BookOpen, Shuffle, Home, ChevronDown,
  ChevronRight, Search, Bell, Settings, Lock, LogOut, User,
  BarChart2, UploadCloud
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Sparkline (pure SVG, no recharts) ── */
function Spark({ data, color }) {
  const w = 160, h = 48, pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width:"100%", height:48, display:"block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2"
        strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* ── Data ── */
const REG   = [900,950,870,1000,980,1100,1050,1200,1180,1350,1420,1542];
const CRS   = [6,8,7,9,10,9,12,11,13,15,17,18];
const LP    = [12,13,14,15,16,17,18,20,21,22,23,24];
const COMP  = [60,58,62,61,65,63,67,68,70,71,72,72.6];

const STATS = [
  { label:"Total Students",       value:"1,248", pct:"12.5%", Icon:Users,         iconBg:"#EEF2FF", iconColor:"#4F46E5" },
  { label:"Total Professors",     value:"42",    pct:"5.3%",  Icon:GraduationCap, iconBg:"#F3E8FF", iconColor:"#7C3AED" },
  { label:"Total Courses",        value:"156",   pct:"8.7%",  Icon:BookOpen,      iconBg:"#D1FAE5", iconColor:"#059669" },
  { label:"Total Learning Paths", value:"28",    pct:"6.1%",  Icon:Shuffle,       iconBg:"#FFEDD5", iconColor:"#EA580C" },
];

const QUICK = [
  { label:"Manage Students",       desc:"View, add and manage student records",   Icon:Users,         iconBg:"#EEF2FF", iconColor:"#4F46E5" },
  { label:"Manage Professors",     desc:"View, add and manage professor records", Icon:GraduationCap, iconBg:"#F3E8FF", iconColor:"#7C3AED" },
  { label:"Manage Courses",        desc:"Create and manage platform courses",     Icon:BookOpen,      iconBg:"#D1FAE5", iconColor:"#059669" },
  { label:"Manage Learning Paths", desc:"Create and organize learning paths",     Icon:Shuffle,       iconBg:"#FFEDD5", iconColor:"#EA580C" },
];

const ACTIVITY = [
  { Icon:User,        iconBg:"#EEF2FF", iconColor:"#4F46E5", title:"Professor Added",         sub:"by Admin User", time:"2 hours ago", badge:"New",     bFg:"#4F46E5", bBg:"#EEF2FF" },
  { Icon:BookOpen,    iconBg:"#D1FAE5", iconColor:"#059669", title:"Course Created",           sub:"by Admin User", time:"3 hours ago", badge:"Success", bFg:"#15803D", bBg:"#DCFCE7" },
  { Icon:UploadCloud, iconBg:"#DBEAFE", iconColor:"#2563EB", title:"Student Master Uploaded",  sub:"by Admin User", time:"5 hours ago", badge:"New",     bFg:"#4F46E5", bBg:"#EEF2FF" },
  { Icon:Shuffle,     iconBg:"#FFEDD5", iconColor:"#EA580C", title:"Learning Path Updated",   sub:"by Admin User", time:"1 day ago",   badge:"Updated", bFg:"#9A3412", bBg:"#FFEDD5" },
  { Icon:Users,       iconBg:"#EEF2FF", iconColor:"#4F46E5", title:"New Student Admission",   sub:"by Admin User", time:"1 day ago",   badge:"New",     bFg:"#4F46E5", bBg:"#EEF2FF" },
];

const OVERVIEW = [
  { label:"Users Registered",      value:"1,542", pct:"15.8%", color:"#4F46E5", data:REG  },
  { label:"Courses Created",       value:"18",    pct:"12.0%", color:"#7C3AED", data:CRS  },
  { label:"Active Learning Paths", value:"24",    pct:"9.1%",  color:"#059669", data:LP   },
  { label:"Completion Rate",       value:"72.6%", pct:"6.4%",  color:"#EA580C", data:COMP },
];

const NAV = [
  { label:"User Management",     Icon:User,         children:["Students","Professors","Admins"] },
  { label:"Academic Management", Icon:BookOpen,      children:["Student Master","Batches","Subjects"] },
  { label:"Learning Management", Icon:GraduationCap, children:["Courses","Learning Paths"] },
  { label:"Analytics",           Icon:BarChart2,     children:["Platform Analytics"] },
  { label:"Profile",             Icon:User,          children:[] },
];

/* ── Component ── */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive]   = useState("Dashboard");
  const [profOpen, setProf]   = useState(false);
  const [expanded, setExpanded] = useState(NAV.map(() => true));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleExp = (i) =>
    setExpanded((p) => p.map((v, idx) => (idx === i ? !v : v)));

  const inter = "'Inter', 'Segoe UI', system-ui, sans-serif";

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#F5F0EB",
      fontFamily:inter, fontSize:14, color:"#111827" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width:232, background:"#fff", borderRight:"1px solid #E5E7EB",
        display:"flex", flexDirection:"column", flexShrink:0 }}>

        <div style={{ padding:"24px 20px 16px", fontFamily:inter,
          fontWeight:800, fontSize:20, letterSpacing:1 }}>
          NAME
        </div>

        <div style={{ padding:"0 14px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8,
            background:"#F9FAFB", border:"1px solid #E5E7EB",
            borderRadius:8, padding:"7px 12px" }}>
            <Search size={14} color="#9CA3AF" />
            <input placeholder="Search..." style={{ border:"none",
              background:"transparent", outline:"none",
              fontSize:13, color:"#374151", width:"100%", fontFamily:inter }} />
          </div>
        </div>

        <div onClick={() => setActive("Dashboard")}
          style={{ display:"flex", alignItems:"center", gap:10,
            padding:"9px 20px", cursor:"pointer", fontSize:14, fontWeight:600,
            background: active==="Dashboard" ? "#FEF3C7" : "transparent",
            color:      active==="Dashboard" ? "#92400E"  : "#374151",
            borderRadius:"0 20px 20px 0", marginRight:12, marginBottom:4 }}>
          <Home size={16} /> Dashboard
        </div>

        <nav style={{ flex:1, overflowY:"auto", paddingBottom:16 }}>
          {NAV.map(({ label, Icon, children }, i) => (
            <div key={label}>
              <div onClick={() => children.length && toggleExp(i)}
                style={{ display:"flex", alignItems:"center",
                  justifyContent:"space-between", padding:"9px 20px",
                  cursor:"pointer", fontWeight:600, fontSize:13, color:"#111827" }}>
                <span style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <Icon size={15} color="#6B7280" /> {label}
                </span>
                {children.length > 0 && (
                  expanded[i]
                    ? <ChevronDown  size={13} color="#9CA3AF" />
                    : <ChevronRight size={13} color="#9CA3AF" />
                )}
              </div>
              {expanded[i] && children.map((child) => (
                <div key={child} onClick={() => setActive(child)}
                  style={{ padding:"7px 20px 7px 44px", cursor:"pointer",
                    fontSize:13, fontFamily:inter,
                    fontWeight: active===child ? 600 : 400,
                    color:      active===child ? "#4F46E5" : "#6B7280",
                    background: active===child ? "#EEF2FF" : "transparent",
                    borderRadius:"0 20px 20px 0", marginRight:12 }}>
                  {child}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"auto" }}>

        {/* Top bar */}
        <header style={{ background:"#fff", borderBottom:"1px solid #E5E7EB",
          padding:"14px 28px", display:"flex", alignItems:"center",
          justifyContent:"space-between", position:"sticky", top:0, zIndex:20 }}>
          <div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:800,
              fontFamily:inter, letterSpacing:0.3, color:"#111827" }}>
              WELCOME BACK, ADMIN USER
            </h1>
            <p style={{ margin:"2px 0 0", fontSize:13, color:"#6B7280", fontFamily:inter }}>
              Here's what's happening on your platform today.
            </p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:18 }}>
            <div style={{ position:"relative", cursor:"pointer" }}>
              <Bell size={22} color="#374151" />
              <span style={{ position:"absolute", top:-5, right:-5,
                background:"#EF4444", color:"#fff", borderRadius:"50%",
                width:17, height:17, fontSize:10, fontFamily:inter,
                display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>
                3
              </span>
            </div>

            <div style={{ position:"relative" }}>
              <div onClick={() => setProf((o) => !o)}
                style={{ display:"flex", alignItems:"center", gap:10,
                  cursor:"pointer", padding:"5px 8px", borderRadius:8,
                  background: profOpen ? "#F3F4F6" : "transparent" }}>
                <div style={{ width:36, height:36, borderRadius:"50%",
                  background:"#1E3A5F", color:"#fff", display:"flex",
                  alignItems:"center", justifyContent:"center",
                  fontWeight:700, fontSize:13, fontFamily:inter }}>
                  AU
                </div>
                <div style={{ lineHeight:1.35 }}>
                  <div style={{ fontSize:11, color:"#9CA3AF", fontFamily:inter }}>Welcome,</div>
                  <div style={{ fontWeight:700, fontSize:13, color:"#111827", fontFamily:inter }}>Admin User</div>
                </div>
                <ChevronDown size={13} color="#9CA3AF" />
              </div>

              {profOpen && (
                <div style={{ position:"absolute", right:0, top:"calc(100% + 8px)",
                  background:"#fff", border:"1px solid #E5E7EB", borderRadius:10,
                  boxShadow:"0 8px 24px rgba(0,0,0,0.12)", minWidth:190, zIndex:99, overflow:"hidden" }}>
                  {[{l:"My Profile",Ic:User},{l:"Account Settings",Ic:Settings},{l:"Change Password",Ic:Lock}]
                    .map(({l,Ic}) => (
                    <div key={l} style={{ padding:"11px 16px", cursor:"pointer", fontSize:13,
                      color:"#374151", display:"flex", alignItems:"center", gap:10, fontFamily:inter }}
                      onMouseEnter={(e)=>e.currentTarget.style.background="#F9FAFB"}
                      onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
                      <Ic size={15} color="#6B7280"/> {l}
                    </div>
                  ))}
                  <div style={{ borderTop:"1px solid #E5E7EB" }}/>
                  <div onClick={handleLogout} style={{ padding:"11px 16px", cursor:"pointer", fontSize:13,
                    color:"#EF4444", display:"flex", alignItems:"center", gap:10, fontFamily:inter }}
                    onMouseEnter={(e)=>e.currentTarget.style.background="#FEF2F2"}
                    onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
                    <LogOut size={15} color="#EF4444"/> Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding:28, display:"flex", flexDirection:"column", gap:24 }}>

          {/* Stat cards */}
          <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            {STATS.map(({ label, value, pct, Icon:Ic, iconBg, iconColor }) => (
              <div key={label} style={{ flex:"1 1 180px", minWidth:0, background:"#fff",
                borderRadius:14, padding:"20px 22px",
                boxShadow:"0 1px 4px rgba(0,0,0,0.07)",
                display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:iconBg,
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Ic size={20} color={iconColor}/>
                  </div>
                  <span style={{ fontSize:13, color:"#6B7280", fontWeight:500, fontFamily:inter }}>
                    {label}
                  </span>
                </div>
                <div style={{ fontSize:28, fontWeight:800, fontFamily:inter,
                  color:"#111827", lineHeight:1 }}>{value}</div>
                <div style={{ fontSize:12, display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ color:"#16A34A", fontWeight:600, fontFamily:inter }}>↑ {pct}</span>
                  <span style={{ color:"#9CA3AF", fontFamily:inter }}>from last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Management */}
          <section>
            <h2 style={{ fontSize:16, fontWeight:700, color:"#111827",
              margin:"0 0 14px", fontFamily:inter }}>
              Quick Management
            </h2>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
              {QUICK.map(({ label, desc, Icon:Ic, iconBg, iconColor }) => (
                <div key={label}
                  style={{ flex:"1 1 200px", minWidth:0, background:"#fff",
                    borderRadius:14, padding:"18px 20px",
                    display:"flex", alignItems:"center", gap:14,
                    boxShadow:"0 1px 4px rgba(0,0,0,0.07)", cursor:"pointer",
                    transition:"transform .15s, box-shadow .15s" }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.07)"; }}>
                  <div style={{ width:46, height:46, borderRadius:12, background:iconBg,
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ic size={22} color={iconColor}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:"#111827", fontSize:14, fontFamily:inter }}>{label}</div>
                    <div style={{ color:"#6B7280", fontSize:12, marginTop:2, fontFamily:inter }}>{desc}</div>
                  </div>
                  <ChevronRight size={18} color="#9CA3AF"/>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom row */}
          <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>

            {/* Recent Activity */}
            <div style={{ flex:"1 1 380px", background:"#fff", borderRadius:14,
              padding:"20px 24px", boxShadow:"0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", marginBottom:16 }}>
                <h2 style={{ fontSize:15, fontWeight:700, color:"#111827",
                  margin:0, fontFamily:inter }}>Recent Activity</h2>
                <span style={{ color:"#4F46E5", fontSize:13, fontWeight:600,
                  cursor:"pointer", fontFamily:inter }}>View All</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:36, height:36, borderRadius:9, background:a.iconBg,
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <a.Icon size={17} color={a.iconColor}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, color:"#111827", fontSize:13, fontFamily:inter }}>{a.title}</div>
                      <div style={{ color:"#9CA3AF", fontSize:12, fontFamily:inter }}>{a.sub}</div>
                    </div>
                    <span style={{ color:"#9CA3AF", fontSize:12,
                      whiteSpace:"nowrap", fontFamily:inter }}>{a.time}</span>
                    <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11,
                      fontWeight:600, whiteSpace:"nowrap", fontFamily:inter,
                      color:a.bFg, background:a.bBg }}>{a.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Overview */}
            <div style={{ flex:"1 1 380px", background:"#fff", borderRadius:14,
              padding:"20px 24px", boxShadow:"0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", marginBottom:16 }}>
                <h2 style={{ fontSize:15, fontWeight:700, color:"#111827",
                  margin:0, fontFamily:inter }}>Platform Overview</h2>
                <select style={{ border:"1px solid #E5E7EB", borderRadius:8,
                  padding:"4px 10px", fontSize:12, color:"#374151",
                  background:"#F9FAFB", cursor:"pointer", outline:"none", fontFamily:inter }}>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {OVERVIEW.map((m) => (
                  <div key={m.label} style={{ background:"#F9FAFB", borderRadius:10, padding:"12px 14px" }}>
                    <div style={{ fontSize:12, color:"#6B7280", fontWeight:500, fontFamily:inter }}>{m.label}</div>
                    <div style={{ fontSize:22, fontWeight:800, fontFamily:inter,
                      color:"#111827", margin:"4px 0 1px" }}>{m.value}</div>
                    <div style={{ fontSize:11, color:"#16A34A", fontWeight:600,
                      marginBottom:4, fontFamily:inter }}>↑ {m.pct}</div>
                    <Spark data={m.data} color={m.color}/>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
