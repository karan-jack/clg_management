import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        
        // Role 1 = admin, 2 = professor, 3 = student
        if (data.role === 1) navigate("/admin");
        else if (data.role === 2) navigate("/professor");
        else if (data.role === 3) navigate("/student");
        else alert("Unknown role ID: " + data.role);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Network error, unable to reach the server");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0ece6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "3rem 2.5rem",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontSize: "2.4rem",
              fontWeight: "800",
              color: "#0f1e3d",
              margin: "0 0 0.5rem",
              letterSpacing: "0.04em",
              fontFamily: "Georgia, serif",
            }}
          >
            WELCOME BACK
          </h1>
          <p
            style={{
              color: "#6b7a99",
              fontSize: "1rem",
              margin: 0,
              fontFamily: "'Segoe UI', sans-serif",
              fontWeight: 400,
            }}
          >
            Sign in to continue your learning journey
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontWeight: "700",
              color: "#0f1e3d",
              marginBottom: "0.5rem",
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "0.95rem",
            }}
          >
            Email Address
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1.5px solid #d1d9e8",
              borderRadius: "12px",
              padding: "0 1rem",
              height: "56px",
              gap: "12px",
              background: "#fff",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b7a99"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "0.95rem",
                color: "#2d3a5a",
                background: "transparent",
                fontFamily: "'Segoe UI', sans-serif",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label
            style={{
              display: "block",
              fontWeight: "700",
              color: "#0f1e3d",
              marginBottom: "0.5rem",
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "0.95rem",
            }}
          >
            Password
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1.5px solid #d1d9e8",
              borderRadius: "12px",
              padding: "0 1rem",
              height: "56px",
              gap: "12px",
              background: "#fff",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b7a99"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "1rem",
                color: "#2d3a5a",
                background: "transparent",
                fontFamily: "'Segoe UI', sans-serif",
                letterSpacing: showPassword ? "normal" : "0.15em",
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "#6b7a99",
                display: "flex",
                alignItems: "center",
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "0.9rem",
              color: "#6b7a99",
            }}
          >
            <div
              onClick={() => setRememberMe(!rememberMe)}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "5px",
                background: rememberMe ? "#1a4fd6" : "#fff",
                border: rememberMe ? "none" : "1.5px solid #d1d9e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {rememberMe && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              )}
            </div>
            Remember me
          </label>
          <a
            href="#"
            style={{
              color: "#1a4fd6",
              textDecoration: "none",
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Forgot Password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "56px",
            background: "#1a4fd6",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            fontFamily: "'Segoe UI', sans-serif",
            letterSpacing: "0.02em",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#1540b8")}
          onMouseLeave={(e) => (e.target.style.background = "#1a4fd6")}
        >
          Login
        </button>
      </div>
    </div>
  );
}
