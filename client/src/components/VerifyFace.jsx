import React, { useState } from "react";
import * as faceapi from "face-api.js";
import WebcamCapture from "./WebcamCapture";
import api from "../api";

export default function VerifyFace() {
  const [loading, setLoading] = useState(false);

  const verify = async (img) => {
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
        alert(`Attendance marked for ${res.data.user.name}`);
      } else {
        alert("No match found");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Verify Attendance</h2>
      <WebcamCapture
        onCapture={verify}
        buttonLabel="Verify Face"
        loading={loading}
      />
    </div>
  );
}