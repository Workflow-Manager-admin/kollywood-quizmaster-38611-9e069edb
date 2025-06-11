import React, { useState, useEffect } from "react";
import { fetchPopularTamilMovies, fetchMovieDetails } from "../../tmdbApi";

function shuffle(array) {
  return [...array].sort(() => 0.5 - Math.random());
}

// Extracts up to 10 [character, movie] pairs
async function generatePairs() {
  let allMovies = [];
  for (let page = 1; page <= 4; page++) {
    let resp = await fetchPopularTamilMovies(page);
    allMovies = allMovies.concat(resp.results);
  }
  allMovies = allMovies.filter(m => m.id && m.original_title).slice(0, 25);

  let pairs = [];
  for (let m of shuffle(allMovies)) {
    let det = await fetchMovieDetails(m.id);
    // Try to get main character/actor
    let char = (det.credits && det.credits.cast && det.credits.cast[0])
      ? det.credits.cast[0].character
      : (det.tagline || m.title); // Fallback
    if (char && m.title && char.toLowerCase() !== "n/a") pairs.push([char, m.title]);
    if (pairs.length === 10) break;
  }
  return pairs;
}

// PUBLIC_INTERFACE
function CharacterMovieMatchQuiz({ onComplete }) {
  const [pairs, setPairs] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let mounted = true;
    generatePairs().then(ps => {
      if (!mounted) return;
      setPairs(ps);
      setMovieList(shuffle(ps.map(p => p[1])));
    });
    return () => (mounted = false);
  }, []);

  function handleDrop(ev, character) {
    ev.preventDefault();
    const droppedMovie = ev.dataTransfer.getData("movie");
    setAnswers(prev => ({ ...prev, [character]: droppedMovie }));
  }

  function handleDrag(ev, movie) {
    ev.dataTransfer.setData("movie", movie);
  }

  function checkAnswers() {
    let correct = 0;
    pairs.forEach(([char, movie]) => {
      if (answers[char] && answers[char] === movie) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    setTimeout(() => {
      onComplete({ score: correct, total: pairs.length, details: "See which matches you got right!" });
    }, 2000);
  }

  if (!pairs.length) {
    return <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading quiz...</div>;
  }

  return (
    <div style={{
      margin: "0 auto", padding: 32, maxWidth: 700, background: "#fff2", borderRadius: 20, boxShadow: "0 2px 16px #d400ff20"
    }}>
      <div style={{ color: "#d400ff", fontWeight: 500, marginBottom: 4 }}>Character-Movie Match</div>
      <div style={{ fontSize: "1.08rem", color: "#333", marginBottom: 18 }}>Drag the movie titles onto the correct Kollywood characters!</div>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        <div>
          {pairs.map(([char], idx) => (
            <div key={char} style={{ marginBottom: 14, fontWeight: 600, color: "#A300BA" }}>
              <div>{idx + 1}. {char}</div>
              <div
                onDrop={e => handleDrop(e, char)}
                onDragOver={e => e.preventDefault()}
                style={{
                  minWidth: 120, minHeight: 36,
                  background: "#e7d0ff", border: "2px dashed #d400ff", borderRadius: "7px",
                  marginTop: 4, marginBottom: -4, fontWeight: 400,
                  display: "inline-block", padding: "6px 10px"
                }}
              >
                {answers[char] || <span style={{ color: "#aaa" }}>Drop movie here</span>}
              </div>
              <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "8px 0" }} />
            </div>
          ))}
        </div>
        <div>
          <div style={{ color: "#d400ff", marginBottom: 5 }}>Movies</div>
          {movieList.map((movie, idx) => (
            <div
              key={movie}
              draggable
              onDragStart={e => handleDrag(e, movie)}
              style={{
                background: "#fff", color: "#0a0900", border: "2px solid #a246f4", borderRadius: 8,
                marginBottom: 8, padding: "4px 14px", cursor: "grab", fontWeight: 500
              }}
            >{movie}</div>
          ))}
        </div>
      </div>
      {!submitted && (
        <button className="btn btn-large" style={{ background: "#d400ff", marginTop: 26 }} onClick={checkAnswers}>
          Submit Answers
        </button>
      )}
      {submitted && <div style={{ marginTop: 10, color: "#13cf4a" }}>Submitted! Score: {score} / {pairs.length}</div>}
    </div>
  );
}

export default CharacterMovieMatchQuiz;
