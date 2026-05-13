import React, { useState } from "react";
import * as faceapi from "face-api.js";
import WebcamCapture from "./WebcamCapture";
import api from "../api";

export default function EnrollFace() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCapture = async (img) => {
    try {
      setLoading(true);

      const image = await faceapi.fetchImage(img);

      const detection = await faceapi
        .detectSingleFace(
          image,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        alert("No face detected");
        return;
      }

      await api.post("/enroll", {
        name,
        email,
        descriptor: Array.from(detection.descriptor)
      });

      alert("Enrollment successful");
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Enroll User</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <WebcamCapture
        onCapture={handleCapture}
        buttonLabel="Enroll Face"
        loading={loading}
      />
    </div>
  );
}