import React from "react";

// PUBLIC_INTERFACE
function BingoQuiz({ onComplete }) {
  // Stub: implement Movie Bingo logic here
  React.useEffect(() => {
    setTimeout(() => {
      onComplete({ score: 6, total: 10, details: "Bingo! (This mode is a placeholder.)" });
    }, 2500);
  }, [onComplete]);
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: "2rem", color: "#d400ff", fontWeight: 600, marginBottom: 28 }}>Movie Bingo</div>
      <div>Bingo grid coming soon. (Placeholder)</div>
    </div>
  );
}
export default BingoQuiz;
