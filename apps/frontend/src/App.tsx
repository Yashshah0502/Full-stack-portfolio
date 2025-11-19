import { useEffect, useState } from "react";

interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/health")
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050816", color: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Interactive Skill & Task Universe
      </h1>
      {health && !error && (
        <p>
          Project Initialized — Backend status: <strong>{health.status}</strong> (
          {health.service}) at {new Date(String(health.timestamp)).toLocaleString()}
        </p>
      )}
      {error && <p>Could not reach backend: {error}</p>}
    </div>
  );
}

export default App;
