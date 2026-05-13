import React, { useEffect } from "react";
import * as faceapi from "face-api.js";
import EnrollFace from "./components/EnrollFace";
import VerifyFace from "./components/VerifyFace";
import AdminDashboard from "./components/AdminDashboard";

function App() {
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

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Face Attendance Demo
      </h1>

      <div
        style={{
          display: "flex",
          gap: "40px",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap"
        }}
      >
        <EnrollFace />
        <VerifyFace />
      </div>

      <hr />
      <AdminDashboard />
    </div>
  );
}

export default App;