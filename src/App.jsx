import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authService } from "./Services/authservice";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth);

  // ✅ Check if user is already logged in on app start
  useEffect(() => {
    const isAuthenticated = authService.isAdminAuthenticated();
    console.log("App useEffect - isAuthenticated:", isAuthenticated);
    
    if (isAuthenticated && !isLoggedIn) {
      // If token exists but Redux state is not updated, restore user
      const user = authService.getCurrentUser();
      if (user) {
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          user 
        });
      }
    }
  }, [dispatch, isLoggedIn]);

  console.log("App render - isLoggedIn:", isLoggedIn);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page */}
          <Route
            path="/"
            element={
              <LandingPage />
            }
          />

          {/* Login page */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />

          {/* Dashboard (protected route) */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;