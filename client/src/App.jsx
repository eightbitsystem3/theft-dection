import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import EnrollPage from "./pages/EnrollPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./components/AdminDashboard";

// Create context for login state
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function Navigation() {
  const location = useLocation();
  const { isLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };
  
  return (
    <nav>
      <Link 
        to="/enroll" 
        className={location.pathname === "/enroll" ? "active" : ""}
      >
        Enroll
      </Link>
      {!isLoggedIn ? (
        <Link 
          to="/login" 
          className={location.pathname === "/login" ? "active" : ""}
        >
          Login
        </Link>
      ) : (
        <button 
          onClick={handleLogoutClick}
          style={{ background: "linear-gradient(135deg, #f56565 0%, #c53030 100%)" }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models")
      ]);
    };

    loadModels();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLoginSuccess, handleLogout }}>
      <Router>
        <div className="container">
          <h1>Face Attendance System</h1>

          <Navigation />

          <Routes>
            <Route path="/enroll" element={<EnrollPage />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          </Routes>

          {isLoggedIn && (
            <>
              <hr />
              <AdminDashboard />
            </>
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;