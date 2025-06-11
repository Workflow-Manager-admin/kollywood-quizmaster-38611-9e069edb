import React, { useState, useEffect } from "react";
import BlurredPosterQuiz from "./quiz-modes/BlurredPosterQuiz";
import CharacterMovieMatchQuiz from "./quiz-modes/CharacterMovieMatchQuiz";
import BingoQuiz from "./quiz-modes/BingoQuiz";
import TimelineQuiz from "./quiz-modes/TimelineQuiz";
import SpinWheelQuiz from "./quiz-modes/SpinWheelQuiz";
import CastComboQuiz from "./quiz-modes/CastComboQuiz";
import ResultsSummary from "../components/ResultsSummary";

// Map game types to quiz components
const GAME_COMPONENTS = {
  "blurred-poster": BlurredPosterQuiz,
  "character-match": CharacterMovieMatchQuiz,
  "bingo": BingoQuiz,
  "timeline": TimelineQuiz,
  "spin-wheel": SpinWheelQuiz,
  "cast-combo": CastComboQuiz,
};

function getGameLabel(gameType) {
  switch (gameType) {
    case "blurred-poster": return "Blurred Poster Quiz";
    case "character-match": return "Character-Movie Match";
    case "bingo": return "Movie Bingo";
    case "timeline": return "Movie Timeline";
    case "spin-wheel": return "Spin the Wheel";
    case "cast-combo": return "Cast Combo";
    default: return "Kollywood Quiz";
  }
}

// PUBLIC_INTERFACE
/**
 * QuizEngine: selects & contains a single quiz by type, manages results summary flow.
 */
function QuizEngine({ gameType, onExit }) {
  const [step, setStep] = useState("quiz");    // "quiz" or "summary"
  const [result, setResult] = useState(null);  // {score, details, total}

  // Handler receives { score, details, total }
  const handleQuizComplete = (quizResult) => {
    setResult(quizResult);
    setStep("summary");
  };

  const handleRetry = () => {
    setStep("quiz");
    setResult(null);
  };

  if (!GAME_COMPONENTS[gameType]) {
    return (
      <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Game mode not found.
      </div>
    );
  }

  if (step === "summary" && result) {
    return (
      <ResultsSummary
        gameType={getGameLabel(gameType)}
        score={result.score}
        total={result.total}
        details={result.details}
        onRetry={handleRetry}
        onBack={onExit}
      />
    );
  }

  const QuizComponent = GAME_COMPONENTS[gameType];

  return (
    <QuizComponent onComplete={handleQuizComplete} />
  );
}
export default QuizEngine;
