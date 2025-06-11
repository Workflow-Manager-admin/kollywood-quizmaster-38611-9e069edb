import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import QuizEngine from "./components/QuizEngine";

// PUBLIC_INTERFACE
function App() {
  const [user, setUser] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);

  // Logout: Reset everything
  function handleLogout() {
    setUser(null);
    setCurrentGame(null);
  }

  function handleGoHome() {
    setCurrentGame(null);
  }

  if (!user) return <Login onLogin={setUser} />;
  if (!currentGame)
    return (
      <>
        <Dashboard
          onSelectGame={gameId => setCurrentGame(gameId)}
        />
      </>
    );

  // In-game view
  return (
    <div className="app" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar
        username={user}
        onLogout={handleLogout}
        onGoHome={handleGoHome}
      />
      <main className="container" style={{ marginTop: 96, minHeight: "70vh" }}>
        <QuizEngine
          gameType={currentGame}
          onExit={handleGoHome}
        />
      </main>
    </div>
  );
}

export default App;