import React from "react";

// PUBLIC_INTERFACE
function SpinWheelQuiz({ onComplete }) {
  React.useEffect(() => {
    setTimeout(() => {
      onComplete({ score: 5, total: 10, details: "You spun the wheel! (This mode is a placeholder.)" });
    }, 2500);
  }, [onComplete]);
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: "2rem", color: "#d400ff", fontWeight: 600, marginBottom: 28 }}>Spin the Wheel</div>
      <div>Spin the wheel game coming soon. (Placeholder)</div>
    </div>
  );
}
export default SpinWheelQuiz;
