import React, { useRef } from "react";
import Webcam from "react-webcam";

export default function WebcamCapture({
  onCapture,
  buttonLabel = "Capture",
  loading = false
}) {
  const webcamRef = useRef(null);

  const capture = () => {
    if (loading) return;

    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      />

      <button
        onClick={capture}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Processing..." : buttonLabel}
      </button>
    </div>
  );
}