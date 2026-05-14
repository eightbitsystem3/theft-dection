import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import * as faceapi from "face-api.js";
import EnrollPage from "./pages/EnrollPage";
import VerifyPage from "./pages/VerifyPage";
import AdminDashboard from "./components/AdminDashboard";

// Create context for verification state
const VerificationContext = createContext();

export const useVerification = () => useContext(VerificationContext);

function Navigation() {
  const location = useLocation();
  const { isVerified } = useVerification();
  
  return (
    <nav>
      <Link 
        to="/enroll" 
        className={location.pathname === "/enroll" ? "active" : ""}
      >
        Enroll
      </Link>
      <Link 
        to="/verify" 
        className={location.pathname === "/verify" ? "active" : ""}
      >
        Verify
      </Link>
      {isVerified && (
        <Link 
          to="/admin" 
          className={location.pathname === "/admin" ? "active" : ""}
        >
          Admin Dashboard
        </Link>
      )}
    </nav>
  );
}

function App() {
  const [isVerified, setIsVerified] = useState(false);

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

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  return (
    <VerificationContext.Provider value={{ isVerified, handleVerificationSuccess }}>
      <Router>
        <div className="container">
          <h1>Face Attendance System</h1>

          <Navigation />

          <Routes>
            <Route path="/enroll" element={<EnrollPage />} />
            <Route path="/verify" element={<VerifyPage onVerificationSuccess={handleVerificationSuccess} />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/" element={<EnrollPage />} />
          </Routes>

          {isVerified && (
            <>
              <hr />
              <AdminDashboard />
            </>
          )}
        </div>
      </Router>
    </VerificationContext.Provider>
  );
}

export default App;