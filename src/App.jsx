import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from './components/Login/loginPage'
import DashboardPage from './components/Dashboard/dashboardPage'
import AuthMiddleware from './auth/AuthMiddleware'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={<AuthMiddleware component={DashboardPage} />}
          render={(props) => (
            <AuthMiddleware component={DashboardPage} {...props} />
          )}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
