import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {

  return (
    <AuthProvider>
      <Router>
      <Navbar/>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        <Route path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
