import { useState, useEffect } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/workouts/`)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.results || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  const difficultyBadge = (difficulty) => {
    const map = { easy: 'success', medium: 'warning', hard: 'danger' }
    return map[difficulty] || 'secondary'
  }

  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <span className={`badge bg-${difficultyBadge(workout.difficulty)} mb-2`}>
                    {workout.difficulty}
                  </span>
                  <p className="card-text text-muted">{workout.description}</p>
                  <p className="card-text">
                    <strong>Duration:</strong> {workout.duration} min
                  </p>
                  {workout.exercises?.length > 0 && (
                    <ul className="list-unstyled">
                      {workout.exercises.map((ex, i) => (
                        <li key={i}>• {ex}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts
