import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequest } from "../api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    try {
      await apiRequest("/api/auth/password/reset", { method: "POST", body: { token, newPassword: password } });
      setOk(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 className="h1">Reset Password</h1>
        {!token ? <div className="error">Missing token. Use the link from your email.</div> : null}
        {error ? <div className="error">{error}</div> : null}
        {ok ? <div className="success">Password updated. You can now log in.</div> : null}
        <form onSubmit={submit}>
          <label className="label">New Password (min. 8 characters)</label>
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} />
          <div style={{ height: 12 }} />
          <button className="btn" type="submit" disabled={!token}>Update Password</button>
        </form>
      </div>
    </div>
  );
}