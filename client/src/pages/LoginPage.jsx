import React from "react";
import LoginFace from "../components/LoginFace";

export default function LoginPage({ onLoginSuccess }) {
  return (
    <div className="card">
      <h2>Face Login</h2>
      <LoginFace onLoginSuccess={onLoginSuccess} />
    </div>
  );
}
