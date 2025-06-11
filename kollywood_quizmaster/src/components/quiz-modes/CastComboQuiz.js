import React from "react";

// PUBLIC_INTERFACE
function CastComboQuiz({ onComplete }) {
  React.useEffect(() => {
    setTimeout(() => {
      onComplete({ score: 8, total: 10, details: "Cast Combo guessed! (This mode is a placeholder.)" });
    }, 2500);
  }, [onComplete]);
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: "2rem", color: "#d400ff", fontWeight: 600, marginBottom: 28 }}>Cast Combo</div>
      <div>Cast combo game coming soon. (Placeholder)</div>
    </div>
  );
}
export default CastComboQuiz;
