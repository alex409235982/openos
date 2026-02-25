import React from "react";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="card" style={{ marginTop: 20, textAlign: "center", padding: "40px 20px" }}>
        <h1 className="h1">Dashboard</h1>
        <p className="p">Welcome, {user?.name}!</p>
        <div style={{ marginTop: 30, padding: 30, background: "rgba(31, 111, 235, 0.05)", borderRadius: 12 }}>
          <h2 className="h2" style={{ opacity: 0.7 }}>Empty for now</h2>
          <p className="p muted">More features coming soon!</p>
        </div>
      </div>
    </div>
  );
}