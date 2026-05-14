import React from "react";
import VerifyFace from "../components/VerifyFace";

export default function VerifyPage({ onVerificationSuccess }) {
  return (
    <div className="card">
      <h2>Face Verification</h2>
      <VerifyFace onVerificationSuccess={onVerificationSuccess} />
    </div>
  );
}
