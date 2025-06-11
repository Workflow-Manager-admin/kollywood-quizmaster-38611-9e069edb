import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Login component for Kollywood QuizMaster.
 * Only requires a username for demo purposes.
 */
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }
    onLogin(username.trim());
  };

  return (
    <div className="login-container" style={{
      background: "linear-gradient(135deg, #d400ff 60%, #fff 100%)",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center", alignItems: "center"
    }}>
      <form className="login-form" onSubmit={handleSubmit} style={{
        background: "#ffffffcc",
        borderRadius: "24px",
        boxShadow: "0 2px 32px #d400ff40",
        padding: "40px 32px",
        minWidth: 320,
        display: "flex", flexDirection: "column", alignItems: "center"
      }}>
        <div className="logo" style={{ fontSize: "2rem", color: "#d400ff", fontWeight: 700 }}>🎬 Kollywood QuizMaster</div>
        <div style={{ margin: "24px 0", fontWeight: 500, color: "#0a0900dd" }}>
          Login to start your Kollywood challenge!
        </div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          style={{ padding: "12px", borderRadius: 8, border: "1px solid #d400ff77", fontSize: "1rem", width: 220, marginBottom: 12 }}
          onChange={e => { setUsername(e.target.value); setError(""); }}
          autoFocus
        />
        {error && <div style={{ color: "#d400ff", marginBottom: 8 }}>{error}</div>}
        <button className="btn btn-large" type="submit" style={{
          background: "#d400ff", color: "#fff", fontWeight: 600, padding: "12px 40px", border: "none", borderRadius: 8, fontSize: "1.05rem"
        }}>Let’s Go!</button>
      </form>
    </div>
  );
}
export default Login;
