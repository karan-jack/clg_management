import { useState } from "react";

const EyeIcon = ({ crossed = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {crossed ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 8) errs.password = "Must be at least 8 characters.";
    else if (!/[A-Z]/.test(password)) errs.password = "Must include an uppercase letter.";
    else if (!/[0-9]/.test(password)) errs.password = "Must include a number.";
    else if (!/[^A-Za-z0-9]/.test(password)) errs.password = "Must include a special character.";
    if (!confirm) errs.confirm = "Please confirm your password.";
    else if (confirm !== password) errs.confirm = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#F5EFE8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "24px",
    },
    card: {
      background: "#fff",
      borderRadius: "20px",
      padding: "48px 44px",
      width: "100%",
      maxWidth: "480px",
      boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
    },
    title: {
      fontFamily: "'Georgia', serif",
      fontWeight: "bold",
      fontSize: "28px",
      color: "#0D1B5E",
      textTransform: "uppercase",
      textAlign: "center",
      letterSpacing: "0.02em",
      marginBottom: "12px",
    },
    subtitle: {
      fontFamily: "system-ui, sans-serif",
      fontSize: "14.5px",
      color: "#5A6070",
      textAlign: "center",
      lineHeight: "1.6",
      marginBottom: "36px",
    },
    label: {
      fontFamily: "system-ui, sans-serif",
      fontSize: "14px",
      fontWeight: "600",
      color: "#1a1a2e",
      marginBottom: "8px",
      display: "block",
    },
    fieldGroup: {
      marginBottom: "24px",
    },
    inputWrap: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      border: "1.5px solid #D8DCE8",
      borderRadius: "10px",
      background: "#FAFBFF",
      overflow: "hidden",
    },
    inputWrapError: {
      border: "1.5px solid #e74c3c",
    },
    iconLeft: {
      padding: "0 14px",
      color: "#7A85A0",
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
    },
    input: {
      flex: 1,
      border: "none",
      background: "transparent",
      padding: "14px 4px",
      fontSize: "14.5px",
      color: "#1a1a2e",
      outline: "none",
      fontFamily: "system-ui, sans-serif",
    },
    eyeBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0 14px",
      color: "#7A85A0",
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
    },
    hint: {
      fontFamily: "system-ui, sans-serif",
      fontSize: "12.5px",
      color: "#8A93AA",
      marginTop: "8px",
      lineHeight: "1.5",
    },
    errorText: {
      fontFamily: "system-ui, sans-serif",
      fontSize: "12.5px",
      color: "#e74c3c",
      marginTop: "6px",
    },
    submitBtn: {
      width: "100%",
      padding: "16px",
      background: "#1A3CE8",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      fontFamily: "system-ui, sans-serif",
      cursor: "pointer",
      marginTop: "4px",
      letterSpacing: "0.01em",
      transition: "background 0.18s ease",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      margin: "24px 0 20px",
      color: "#B0B8CC",
      fontFamily: "system-ui, sans-serif",
      fontSize: "13px",
    },
    line: {
      flex: 1,
      height: "1px",
      background: "#E2E6F0",
    },
    backLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      color: "#1A3CE8",
      fontFamily: "system-ui, sans-serif",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      textDecoration: "none",
      background: "none",
      border: "none",
    },
    successBox: {
      textAlign: "center",
      padding: "16px 0",
    },
    successIcon: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: "#EAF0FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 20px",
    },
    successTitle: {
      fontFamily: "'Georgia', serif",
      fontWeight: "bold",
      fontSize: "22px",
      color: "#0D1B5E",
      marginBottom: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.02em",
    },
    successText: {
      fontFamily: "system-ui, sans-serif",
      fontSize: "14px",
      color: "#5A6070",
      lineHeight: "1.6",
    },
  };

  if (submitted) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.successBox}>
            <div style={styles.successIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A3CE8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div style={styles.successTitle}>Password Reset!</div>
            <p style={styles.successText}>
              Your password has been updated successfully.<br />You can now sign in with your new password.
            </p>
            <button
              style={{ ...styles.submitBtn, marginTop: "28px" }}
              onMouseEnter={e => (e.target.style.background = "#1230C0")}
              onMouseLeave={e => (e.target.style.background = "#1A3CE8")}
              onClick={() => setSubmitted(false)}
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Forgot Password?</h1>
        <p style={styles.subtitle}>
          No worries! Enter your registered email address<br />
          and we'll send you instructions to reset your password.
        </p>

        {/* Email */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email Address</label>
          <div style={{ ...styles.inputWrap, ...(errors.email ? styles.inputWrapError : {}) }}>
            <span style={styles.iconLeft}><MailIcon /></span>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          {errors.email && <p style={styles.errorText}>{errors.email}</p>}
        </div>

        {/* New Password */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>New Password</label>
          <div style={{ ...styles.inputWrap, ...(errors.password ? styles.inputWrapError : {}) }}>
            <span style={styles.iconLeft}><LockIcon /></span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
            />
            <button style={styles.eyeBtn} onClick={() => setShowPassword(v => !v)} aria-label="Toggle password visibility">
              <EyeIcon crossed={!showPassword} />
            </button>
          </div>
          {errors.password
            ? <p style={styles.errorText}>{errors.password}</p>
            : <p style={styles.hint}>Password must be at least 8 characters and include a number, uppercase, and special character.</p>
          }
        </div>

        {/* Confirm Password */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Confirm New Password</label>
          <div style={{ ...styles.inputWrap, ...(errors.confirm ? styles.inputWrapError : {}) }}>
            <span style={styles.iconLeft}><LockIcon /></span>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              style={styles.input}
            />
            <button style={styles.eyeBtn} onClick={() => setShowConfirm(v => !v)} aria-label="Toggle confirm password visibility">
              <EyeIcon crossed={!showConfirm} />
            </button>
          </div>
          {errors.confirm && <p style={styles.errorText}>{errors.confirm}</p>}
        </div>

        <button
          style={styles.submitBtn}
          onClick={handleSubmit}
          onMouseEnter={e => (e.target.style.background = "#1230C0")}
          onMouseLeave={e => (e.target.style.background = "#1A3CE8")}
        >
          Reset Password
        </button>

        <div style={styles.divider}>
          <span style={styles.line} />
          <span>or</span>
          <span style={styles.line} />
        </div>

        <button style={styles.backLink}>
          <ArrowLeftIcon />
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
