import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password, remember);
      nav("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `/api/oauth/${provider}`;
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 className="h1">Login</h1>
        {error ? <div className="error">{error}</div> : null}
        <form onSubmit={submit}>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <div style={{ height: 10 }} />
          <label className="label">Password</label>
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          <div style={{ height: 10 }} />
          <label className="label">
            <input checked={remember} onChange={(e) => setRemember(e.target.checked)} type="checkbox" /> Remember me
          </label>
          <div style={{ height: 10 }} />
          <button className="btn" type="submit">Login</button>
        </form>
        <div style={{ height: 12 }} />
        <div className="row" style={{ justifyContent: "space-between" }}>
          <Link to="/forgot">Forgot password</Link>
          <Link to="/signup">Create account</Link>
        </div>
        
        <div style={{ marginTop: 24, position: "relative", textAlign: "center" }}>
          <div style={{ borderTop: "1px solid #2a3a55", margin: "20px 0" }}></div>
          <span style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            background: "rgba(17, 24, 38, 0.95)", 
            padding: "0 12px",
            color: "#aeb9ca",
            fontSize: 14
          }}>
            OR
          </span>
        </div>
        
        <div className="row" style={{ justifyContent: "center", gap: 16, marginTop: 24 }}>
          <button 
            onClick={() => handleOAuth('google')}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#22324a",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500
            }}
          >
            <FcGoogle size={20} />
            Google
          </button>
          
          <button 
            onClick={() => handleOAuth('github')}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#22324a",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500
            }}
          >
            <FaGithub size={18} />
            GitHub
          </button>
          
          <button 
            onClick={() => handleOAuth('discord')}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#22324a",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500
            }}
          >
            <FaDiscord size={18} />
            Discord
          </button>
        </div>
      </div>
    </div>
  );
}