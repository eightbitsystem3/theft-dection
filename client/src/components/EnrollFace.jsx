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
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        placeholder="Enter your email"
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