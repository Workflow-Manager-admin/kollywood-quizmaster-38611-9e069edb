import React from "react";

// PUBLIC_INTERFACE
function TimelineQuiz({ onComplete }) {
  React.useEffect(() => {
    setTimeout(() => {
      onComplete({ score: 7, total: 10, details: "Timeline arranged! (This mode is a placeholder.)" });
    }, 2500);
  }, [onComplete]);
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: "2rem", color: "#d400ff", fontWeight: 600, marginBottom: 28 }}>Movie Timeline</div>
      <div>Timeline challenge coming soon. (Placeholder)</div>
    </div>
  );
}
export default TimelineQuiz;
