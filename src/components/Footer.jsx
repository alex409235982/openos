import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footerWrap">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <span className="badge">Try Before You Install</span>
        <div className="row" style={{ alignItems: "center" }}>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a href="https://github.com/alex409235982?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  );
}