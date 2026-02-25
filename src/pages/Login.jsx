import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

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
      </div>
    </div>
  );
}