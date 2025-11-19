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
    </div>
  )
}

export default App
