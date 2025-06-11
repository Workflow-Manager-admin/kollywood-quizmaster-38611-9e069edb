import React from "react";

// PUBLIC_INTERFACE
function Navbar({ username, onLogout, onGoHome }) {
  return (
    <nav className="navbar" style={{ background: "#d400ff", color: "#fff" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{ fontWeight: 700, fontSize: "1.17rem", letterSpacing: ".02em", cursor: "pointer"}} onClick={onGoHome}>
          <span style={{ marginRight: 8 }}>🎬</span> Kollywood QuizMaster
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ background: "#fff2", color: "#fff", borderRadius: 8, padding: "3px 12px", fontWeight: 600 }}>
            {username}
          </span>
          <button className="btn" type="button" onClick={onLogout} style={{ background: "#fff", color: "#d400ff", fontWeight: "bold" }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
