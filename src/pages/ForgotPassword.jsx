import React, { useState } from "react";
import { apiRequest } from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);
    try {
      await apiRequest("/api/auth/password/forgot", { method: "POST", body: { email } });
      setOk(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 className="h1">Forgot Password</h1>
        <p className="p">Enter your email. If it exists, you’ll receive a reset link.</p>
        {error ? <div className="error">{error}</div> : null}
        {ok ? <div className="success">If that email exists, a reset link has been sent.</div> : null}
        <form onSubmit={submit}>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <div style={{ height: 12 }} />
          <button className="btn" type="submit">Send Reset Email</button>
        </form>
      </div>
    </div>
  );
}