import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const features = [
    "Feature 1", "Feature 2", "Feature 3", "Feature 4",
    "Feature 5", "Feature 6", "Feature 7", "Feature 8",
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#fdf8f3" }}>

      {/* Navbar */}
      <nav style={{
        background: "#fff",
        borderBottom: "1px solid #e8eaf0",
        padding: "0 2.5rem",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Left: Logo */}
        <div style={{ fontFamily: "Georgia, serif", fontWeight: "800", fontSize: "1.5rem", color: "#0f1e3d", letterSpacing: "0.02em" }}>
          NAME
        </div>

        {/* Center: Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {/* Catalog Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setCatalogOpen(!catalogOpen); setResourcesOpen(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#2d3a5a", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Segoe UI', sans-serif" }}
            >
              Catalog
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {catalogOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#fff", border: "1px solid #e8eaf0", borderRadius: "10px", padding: "0.5rem 0", minWidth: "160px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 200 }}>
                {["All Courses", "Beginner", "Advanced", "Certifications"].map((item) => (
                  <div key={item} style={{ padding: "0.5rem 1.25rem", cursor: "pointer", fontSize: "0.9rem", color: "#2d3a5a" }}
                    onMouseEnter={(e) => e.target.style.background = "#f5f7ff"}
                    onMouseLeave={(e) => e.target.style.background = "transparent"}
                  >{item}</div>
                ))}
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setResourcesOpen(!resourcesOpen); setCatalogOpen(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#2d3a5a", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Segoe UI', sans-serif" }}
            >
              Resources
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {resourcesOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#fff", border: "1px solid #e8eaf0", borderRadius: "10px", padding: "0.5rem 0", minWidth: "160px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 200 }}>
                {["Blog", "Guides", "Webinars", "Community"].map((item) => (
                  <div key={item} style={{ padding: "0.5rem 1.25rem", cursor: "pointer", fontSize: "0.9rem", color: "#2d3a5a" }}
                    onMouseEnter={(e) => e.target.style.background = "#f5f7ff"}
                    onMouseLeave={(e) => e.target.style.background = "transparent"}
                  >{item}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Search + Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d3a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#2d3a5a", fontFamily: "'Segoe UI', sans-serif" }}>
            Log in
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{ background: "#1a4fd6", color: "#fff", border: "none", borderRadius: "8px", padding: "0.5rem 1.25rem", fontSize: "1rem", fontWeight: "600", cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}
            onMouseEnter={(e) => e.target.style.background = "#1540b8"}
            onMouseLeave={(e) => e.target.style.background = "#1a4fd6"}
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Features Bar */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e8eaf0",
        padding: "0.65rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
        flexWrap: "wrap",
      }}>
        {features.map((f, i) => (
          <React.Fragment key={f}>
            <span style={{ fontSize: "0.9rem", color: "#2d3a5a", padding: "0 0.75rem", cursor: "pointer" }}>{f}</span>
            {i < features.length - 1 && (
              <span style={{ color: "#aab0c4", fontSize: "0.5rem" }}>●</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(160deg, #ddeeff 0%, #eaf4ff 50%, #f0f8ff 100%)",
        minHeight: "calc(100vh - 110px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 2rem",
      }}>
        {/* Tagline Badge */}
        <div style={{
          background: "#fde8c8",
          color: "#b05a00",
          borderRadius: "999px",
          padding: "0.4rem 1.25rem",
          fontSize: "0.95rem",
          fontWeight: "600",
          marginBottom: "1.75rem",
          display: "inline-block",
        }}>
          Insert Tagline.
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
          fontWeight: "800",
          lineHeight: 1.1,
          margin: "0 0 1.5rem",
          maxWidth: "700px",
        }}>
          <span style={{ color: "#0f1e3d" }}>Learn smarter,</span>
          <br />
          <span style={{ color: "#6b2fd6" }}>not harder.</span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: "1.15rem",
          color: "#6b7a99",
          maxWidth: "480px",
          lineHeight: 1.7,
          margin: "0 0 2.5rem",
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          A platform designed to help you learn, grow,<br />and achieve more every day.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#1a4fd6",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "1rem 2.5rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "'Segoe UI', sans-serif",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#1540b8"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#1a4fd6"}
        >
          Start learning
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
