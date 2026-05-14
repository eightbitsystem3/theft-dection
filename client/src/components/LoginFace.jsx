import React, { useState } from "react";
import * as faceapi from "face-api.js";
import WebcamCapture from "./WebcamCapture";
import api from "../api";

export default function LoginFace({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  const login = async (img) => {
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
        alert("No face found");
        return;
      }

      const res = await api.post("/verify", {
        descriptor: Array.from(detection.descriptor)
      });

      if (res.data.success) {
        alert(`Login successful for ${res.data.user.name}`);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        alert("No match found");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <WebcamCapture
        onCapture={login}
        buttonLabel="Login"
        loading={loading}
      />
    </div>
  );
}
