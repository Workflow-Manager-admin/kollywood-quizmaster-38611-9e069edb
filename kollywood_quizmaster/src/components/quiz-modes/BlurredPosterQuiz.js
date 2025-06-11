import React, { useState, useEffect } from "react";
import { fetchPopularTamilMovies, fetchMovieImages, getPosterUrl } from "../../tmdbApi";

/**
 * Generates 10 random unique movie questions from popular Tamil movies.
 */
async function generateQuestions() {
  // Fetch first 3 pages (enough randomization)
  let allMovies = [];
  for (let page = 1; page <= 3; page++) {
    let resp = await fetchPopularTamilMovies(page);
    allMovies = allMovies.concat(resp.results);
  }
  // Random subset without duplicates
  let shuffled = allMovies
    .sort(() => 0.5 - Math.random())
    .filter(m => m.poster_path)
    .slice(0, 10);

  // Attach images & clues
  const questions = await Promise.all(
    shuffled.map(async m => {
      let images = await fetchMovieImages(m.id);
      // Use original title as a clue, try to get tagline, year
      return {
        movieId: m.id,
        title: m.title,
        posterPath: m.poster_path,
        year: m.release_date ? new Date(m.release_date).getFullYear() : "",
        overview: m.overview,
        clue: m.original_title,
      };
    })
  );
  return questions;
}

// PUBLIC_INTERFACE
function BlurredPosterQuiz({ onComplete }) {
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    generateQuestions().then(qs => {
      setQuestions(qs);
      setLoading(false);
    });
  }, []);

  if (loading || !questions) return (
    <div style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{color: "#d400ff"}}>Loading quiz...</span>
    </div>
  );

  const q = questions[current];

  function handleSubmit(e) {
    e.preventDefault();
    let answer = input.trim().toLowerCase();
    if (!answer) return;
    if (answer === q.title.trim().toLowerCase()) {
      setFeedback("🎉 Correct!");
      setScore(score + 1);
      setTimeout(() => goNext(), 1100);
    } else {
      setFeedback("❌ Try again or use a clue!");
    }
  }

  function handleReveal() {
    setRevealed(true);
    setTimeout(() => goNext(), 1500);
  }

  function goNext() {
    setFeedback("");
    setRevealed(false);
    setShowClue(false);
    setInput("");
    if (current + 1 >= questions.length) {
      onComplete({ score: score, total: questions.length, details: "You’ve completed Blurred Poster Quiz!" });
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <div style={{
      padding: 32, marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center",
      background: "linear-gradient(135deg, #fff 70%, #d400ff10 100%)", borderRadius: 20, boxShadow: "0 2px 20px #d400ff11"
    }}>
      <div style={{ width: "100%", textAlign: "right", marginBottom: 10, color: "#d400ff", fontWeight: 500 }}>
        Q {current + 1} / {questions.length}
      </div>
      <div style={{
        filter: revealed ? "blur(0)" : "blur(12px)",
        borderRadius: 16,
        border: "5px solid #d400ff",
        overflow: "hidden",
        width: 250, height: 350,
        marginBottom: 20,
        background: "#eee", display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <img
          src={getPosterUrl(q.posterPath, "w500")}
          alt="Blurred poster"
          style={{
            width: 250, height: 350, objectFit: "cover",
            transition: "0.4s filter"
          }}
        />
      </div>
      {showClue &&
        <div style={{
          color: "#d400ff", marginBottom: 10, background: "#fff0fa", padding: "7px 16px", borderRadius: 7, fontWeight: 600, boxShadow: "0 1px 6px #d400ff11"
        }}>
          <span>Clue: </span>
          <span>{q.overview ? q.overview.substr(0, 65) + "..." : q.clue} {q.year && `(${q.year})`}</span>
        </div>
      }
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="text"
          value={input}
          disabled={revealed}
          autoFocus
          placeholder="Enter movie title"
          style={{
            padding: "11px", minWidth: 180, fontSize: "1.08rem", borderRadius: 8, border: "2px solid #d400ff55", marginBottom: 10
          }}
          onChange={e => { setInput(e.target.value); setFeedback(""); }}
        />
        <div style={{ display: "flex", gap: 10, marginBottom: 13 }}>
          <button className="btn" type="submit" style={{ background: "#d400ff", color: "#fff", fontWeight: 600, padding: "7px 18px" }}>
            Submit
          </button>
          <button className="btn" type="button" style={{ background: "#fff", color: "#d400ff" }} onClick={() => setShowClue(true)}>
            Use Clue
          </button>
          <button className="btn" type="button" style={{ background: "#a246f4", color: "#fff" }} onClick={handleReveal}>
            Reveal Answer
          </button>
        </div>
      </form>
      {feedback && <div style={{ color: feedback.includes("Correct") ? "#13cf4a" : "#d400ff", marginTop: 5, fontWeight: 500 }}>{feedback}</div>}
      {revealed &&
        <div style={{ marginTop: 10, color: "#d400ff", fontSize: "1.12rem" }}>
          Answer: <b>{q.title}</b>
        </div>}
    </div>
  );
}

export default BlurredPosterQuiz;
