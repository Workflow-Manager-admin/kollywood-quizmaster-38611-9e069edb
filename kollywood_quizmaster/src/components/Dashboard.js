import React from "react";

const GAME_TYPES = [
  {
    id: "blurred-poster",
    label: "Blurred Poster Quiz",
    description: "Guess the Tamil movie from a blurred poster. Clues and reveal option included.",
    icon: "🖼️",
    color: "#D03BFF"
  },
  {
    id: "character-match",
    label: "Character-Movie Match",
    description: "Drag characters to their Kollywood movie titles. Challenging matches ahead!",
    icon: "🎭",
    color: "#A246F4"
  },
  {
    id: "bingo",
    label: "Movie Bingo",
    description: "Bingo grid with movie categories. Can you hit Kollywood bingo?",
    icon: "🎲",
    color: "#A300BA"
  },
  {
    id: "timeline",
    label: "Movie Timeline Challenge",
    description: "Arrange movies by their release dates. Know your Kollywood history?",
    icon: "📅",
    color: "#C700FF"
  },
  {
    id: "spin-wheel",
    label: "Spin the Wheel",
    description: "Spin for actor/actress/year and guess the movie. Luck and skill both matter!",
    icon: "🌀",
    color: "#FF00B8"
  },
  {
    id: "cast-combo",
    label: "Cast Combo",
    description: "Guess the movie from cast combos, or the missing actor. For experts!",
    icon: "👥",
    color: "#BC4BFE"
  }
];

/**
 * Dashboard shows game selection after login.
 */
// PUBLIC_INTERFACE
function Dashboard({ onSelectGame }) {
  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #fff 80%, #d400ff 100%)"
    }}>
      <nav className="navbar" style={{ background: "#d400ff", boxShadow: "0 2px 16px #d400ff22" }}>
        <div className="container" style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem" }}>
          Kollywood QuizMaster
        </div>
      </nav>
      <main style={{ marginTop: 84, paddingBottom: 40 }}>
        <div className="container">
          <div className="title" style={{ color: "#d400ff", marginBottom: 12, marginTop: 30, textAlign: "center" }}>
            Pick Your Game!
          </div>
          <div className="description" style={{ textAlign: "center", color: "#0a0900cc" }}>
            Test your Tamil cinema knowledge across varied quiz types.
          </div>
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, marginTop: 36
          }}>
            {GAME_TYPES.map(game => (
              <div
                key={game.id}
                className="game-card"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  boxShadow: "0 2px 24px #d400ff22",
                  width: 250,
                  minHeight: 240,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 20,
                  border: `3px solid ${game.color}`,
                  cursor: "pointer",
                  transition: "box-shadow .2s"
                }}
                onClick={() => onSelectGame(game.id)}
                tabIndex={0}
                onKeyPress={e => e.key === "Enter" && onSelectGame(game.id)}
              >
                <div style={{
                  fontSize: "2.2rem",
                  background: game.color,
                  color: "#fff",
                  borderRadius: 12,
                  padding: "8px 18px",
                  boxShadow: "0 1px 8px #b57eff33",
                  marginBottom: 16
                }}>{game.icon}</div>
                <div style={{
                  fontWeight: 700, fontSize: "1.14rem", color: "#d400ff", marginBottom: 5, textAlign: "center"
                }}>{game.label}</div>
                <div style={{ fontSize: "0.98rem", color: "#644678", textAlign: "center", minHeight: 35 }}>
                  {game.description}
                </div>
                <button className="btn"
                  style={{
                    background: game.color,
                    color: "#fff",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: 6,
                    marginTop: 20,
                    width: "100%"
                  }}
                  tabIndex={-1}
                >
                  Play
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
