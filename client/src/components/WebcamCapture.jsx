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
      />

      <button
        onClick={capture}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Processing..." : buttonLabel}
      </button>
    </div>
  );
}