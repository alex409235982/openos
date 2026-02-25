import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
  const nav = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    try {
      await signup(name, email, password);
      nav("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 className="h1">Sign Up</h1>
        {error ? <div className="error">{error}</div> : null}
        <form onSubmit={submit}>
          <label className="label">Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          <div style={{ height: 10 }} />
          <label className="label">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <div style={{ height: 10 }} />
          <label className="label">Password</label>
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} />
          <div style={{ height: 12 }} />
          <button className="btn" type="submit">Create Account</button>
        </form>
        <div style={{ height: 12 }} />
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}
