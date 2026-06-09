import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img src="/octofitapp-small.png" alt="OctoFit" height="30" />
            OctoFit Tracker
          </a>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
