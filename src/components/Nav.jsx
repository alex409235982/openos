import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <div className="nav">
      <div
        className="row"
        style={{
          alignItems: "center",
          gap: 24
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <img
            src="https://i.ibb.co/xt4WD25L/OPENOS-Logo.png"
            alt="OPENOS"
            style={{
              height: 28,
              width: "auto",
              display: "block"
            }}
          />
        </Link>

        <div className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          {user ? <Link to="/dashboard">Dashboard</Link> : null}
        </div>
      </div>

      <div
        className="row"
        style={{
          alignItems: "center",
          gap: 12
        }}
      >
        {user ? (
          <>
            <span className="badge">{user.email}</span>
            <button className="btn secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn secondary" to="/login">
              Login
            </Link>
            <Link className="btn" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}