
import React, { useState } from "react";
// page for user sign in
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // submit credentials to firebase auth
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40, backgroundColor: "#000000", minHeight: "100vh", color: "#ffffff" }}>
      <form onSubmit={handleLogin} style={{ width: 400, textAlign: "center", border: "1px solid #333", padding: 24, borderRadius: 8, backgroundColor: "#111", height: "fit-content" }}>
        <h2 style={{ color: "#ffffff" }}>Login</h2>
        {/* email field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "90%", marginBottom: 12, padding: "8px", backgroundColor: "#222", color: "#ffffff", border: "1px solid #444", borderRadius: "4px" }}
        /><br />
        {/* password field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "90%", marginBottom: 12, padding: "8px", backgroundColor: "#222", color: "#ffffff", border: "1px solid #444", borderRadius: "4px" }}
        /><br />
        <button type="submit" style={{ padding: "8px 16px", marginTop: 8, backgroundColor: "#007bff", color: "#ffffff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Login</button>
        <br />
        {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
        <p style={{ color: "#ffffff" }}>Don't have an account? <a href="/register" style={{ color: "#007bff" }}>Register</a></p>
      </form>
    </div>
  );
}

export default LoginPage;

