import { useState, useEffect } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/leaderboard/`)
      .then((res) => res.json())
      .then((data) => {
        setEntries(Array.isArray(data) ? data : data.results || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Leaderboard</h2>
      {entries.length === 0 ? (
        <p className="text-muted">No leaderboard entries found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id}>
                  <td>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </td>
                  <td>{entry.username}</td>
                  <td>{entry.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
