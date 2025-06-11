import React from "react";

// PUBLIC_INTERFACE
function ResultsSummary({ gameType, score, total, details, onRetry, onBack }) {
  return (
    <div className="results-summary-container" style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "70vh", background: "linear-gradient(135deg, #fff 70%, #D400FF20 100%)", borderRadius: 20, boxShadow: "0 2px 28px #d400ff22", marginTop: 40
    }}>
      <div className="title" style={{ color: "#d400ff", marginBottom: 16 }}>
        {gameType} Results
      </div>
      <div style={{ fontWeight: 600, fontSize: "1.5rem", color: "#0a0900aa", marginBottom: 8 }}>
        {score} / {total}
      </div>
      <div className="description" style={{ marginBottom: 20, color: "#665589" }}>
        {details ? details : "Awesome work! Try again or pick another challenge."}
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <button className="btn btn-large" style={{ background: "#d400ff", color: "#fff", fontWeight: 700 }} onClick={onRetry}>
          Retry
        </button>
        <button className="btn btn-large" style={{ background: "#fff", color: "#d400ff", fontWeight: 700, border: "2px solid #d400ff" }} onClick={onBack}>
          Back to Games
        </button>
      </div>
    </div>
  );
}

export default ResultsSummary;
