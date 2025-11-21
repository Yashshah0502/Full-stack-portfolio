<<<<<<< Updated upstream
import { useState, useEffect } from 'react'

interface HealthResponse {
  status: string
  service: string
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div className="app">
      <h1>Full-Stack Portfolio</h1>
      <div className="health-check">
        <h2>Backend Health:</h2>
        {error && <p className="error">Error: {error}</p>}
        {health && (
          <p className="success">
            Status: {health.status} | Service: {health.service}
          </p>
        )}
      </div>
=======
// import { useEffect, useState } from "react";

// interface HealthResponse {
//   status: string;
//   service: string;
//   timestamp: string;
// }

// function App() {
//   const [health, setHealth] = useState<HealthResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/health")
//       .then((res) => res.json())
//       .then((data) => setHealth(data))
//       .catch((err) => setError(err.message));
//   }, []);

//   return (
//     <div style={{ minHeight: "100vh", background: "#050816", color: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
//       <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
//         Interactive Skill & Task Universe
//       </h1>
//       {health && !error && (
//         <p>
//           Project Initialized — Backend status: <strong>{health.status}</strong> (
//           {health.service}) at {new Date(String(health.timestamp)).toLocaleString()}
//         </p>
//       )}
//       {error && <p>Could not reach backend: {error}</p>}
//     </div>
//   );
// }

// export default App;


import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { MapView } from "./components/MapView";
import { BoardView } from "./components/BoardView";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-color)",
        color: "var(--text-color)",
        padding: "1.5rem"
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>Interactive Skill &amp; Task Universe</h1>
        <ThemeSwitcher />
      </header>

      <MapView />
      <BoardView />
>>>>>>> Stashed changes
    </div>
  )
}

export default App
