import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      setTerminalOutput(`Hello ${terminalInput.trim()}!`);
    } else {
      setTerminalOutput("Please enter a name!");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 24, textAlign: "center" }}>
        <h1 className="h1">About OPENOS</h1>
        <p className="p" style={{ maxWidth: 600, margin: "0 auto" }}>
          Your gateway to exploring Linux distributions safely from your browser. There is no installation or risk, just pure learning.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 32, background: "#0a0e15", borderColor: "#2a3a55" }}>
        <div style={{ 
          display: "flex", 
          gap: 8, 
          marginBottom: 16,
          borderBottom: "1px solid #2a3a55",
          paddingBottom: 12
        }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ marginLeft: "auto", color: "#aeb9ca", fontSize: 14 }}>terminal@openos:~</span>
        </div>
        
        <div style={{ fontFamily: "monospace", fontSize: 16 }}>
          <div style={{ color: "#8bffb3", marginBottom: 8 }}>
            <span style={{ color: "#1f6feb" }}>user@openos</span>:<span style={{ color: "#ff8b8b" }}>~</span>$ echo "Hello [Your Name]"
          </div>
          
          <form onSubmit={handleTerminalSubmit} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ color: "#1f6feb" }}>➜</span>
              <span style={{ color: "#8bffb3" }}>echo</span>
              <span style={{ color: "#ffb86b" }}>"Hello</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Your Name"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px dashed #4a5a75",
                  color: "#ffb86b",
                  fontFamily: "monospace",
                  fontSize: 16,
                  padding: "4px 8px",
                  width: 150,
                  outline: "none"
                }}
              />
              <span style={{ color: "#ffb86b" }}>"</span>
              <button 
                type="submit"
                style={{
                  background: "#1f6feb",
                  border: "none",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontFamily: "monospace",
                  cursor: "pointer"
                }}
              >
                Run
              </button>
            </div>
          </form>

          {terminalOutput && (
            <div style={{ 
              background: "#111a24", 
              padding: 12, 
              borderRadius: 8,
              border: "1px solid #2a3a55",
              color: "#8bffb3"
            }}>
              {terminalOutput}
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 32 }}>
        <h2 className="h2">What is OPENOS?</h2>
        <p className="p">
          OPENOS is a browser-based platform that lets you experience different Linux distributions without the commitment of installation. Think of it as a test drive for operating systems.
        </p>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 20
        }}>
          <div style={{ background: "rgba(31, 111, 235, 0.1)", padding: 16, borderRadius: 10 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 18 }}>Instant Access</h3>
            <p className="p muted" style={{ margin: 0, fontSize: 14 }}>No downloads and no dual-booting needed.</p>
          </div>
          
          <div style={{ background: "rgba(139, 255, 179, 0.1)", padding: 16, borderRadius: 10 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 18 }}>Safe Testing</h3>
            <p className="p muted" style={{ margin: 0, fontSize: 14 }}>Your real system stays untouched.</p>
          </div>
          
          <div style={{ background: "rgba(255, 139, 139, 0.1)", padding: 16, borderRadius: 10 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📚</div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 18 }}>Learn by Doing</h3>
            <p className="p muted" style={{ margin: 0, fontSize: 14 }}>Explore real Linux environments hands-on.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 32 }}>
        <h2 className="h2">Why Switch To Linux?</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          marginTop: 10
        }}>
          <div>
            <h3 style={{ fontSize: 18, margin: "0 0 8px 0", color: "#8bffb3" }}>🔓 Freedom & Open Source</h3>
            <p className="p muted" style={{ margin: 0 }}>Linux gives you complete control over your system. You can view, modify, and share the code however you want.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 18, margin: "0 0 8px 0", color: "#8bffb3" }}>🛡️ Security & Privacy</h3>
            <p className="p muted" style={{ margin: 0 }}>There are better permission systems and zero telemetry spying on your activities.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 18, margin: "0 0 8px 0", color: "#8bffb3" }}>💸 Completely Free</h3>
            <p className="p muted" style={{ margin: 0 }}>No license fees and no subscriptions. Linux is free for everyone, forever.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 18, margin: "0 0 8px 0", color: "#8bffb3" }}>🔄 Revive Old Hardware</h3>
            <p className="p muted" style={{ margin: 0 }}>Give old computers a second life. Linux runs fast on hardware that Windows abandoned.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 18, margin: "0 0 8px 0", color: "#8bffb3" }}>🎮 Gaming Ready</h3>
            <p className="p muted" style={{ margin: 0 }}>You can use tools like Proton to play thousands of Windows games on Linux. Start up an emulator while you are at it!</p>
          </div>
          <div>
            <h3 style={{ fontSize: 18, margin: "0 0 8px 0", color: "#8bffb3" }}>🌍 Community Driven</h3>
            <p className="p muted" style={{ margin: 0 }}>Join millions of users and developers who believe in open source and collaboration.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 32 }}>
        <h2 className="h2">How It Works</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ 
              background: "#1f6feb", 
              width: 32, 
              height: 32, 
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}>1</div>
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: 18 }}>Choose a Distribution</h3>
              <p className="p muted">Browse our collection and pick the Linux distro you want to explore.</p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ 
              background: "#1f6feb", 
              width: 32, 
              height: 32, 
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}>2</div>
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: 18 }}>Launch in Browser</h3>
              <p className="p muted">Click launch and we'll spin up a virtual machine instantly.</p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ 
              background: "#1f6feb", 
              width: 32, 
              height: 32, 
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}>3</div>
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: 18 }}>Explore Freely</h3>
              <p className="p muted">Use the desktop, install software, test workflows. There are no limits, and more importantly, no risk.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ 
        textAlign: "center", 
        background: "linear-gradient(145deg, rgba(31,111,235,0.15) 0%, rgba(17,24,38,0.9) 100%)",
        borderColor: "#1f6feb"
      }}>
        <h2 className="h2" style={{ marginBottom: 16 }}>Ready to get started?</h2>
        <p className="p" style={{ maxWidth: 500, margin: "0 auto 20px auto" }}>
          Head over to our <strong>distributions page</strong> and try any Linux distro instantly in your browser.
        </p>
        <Link to="/distros" className="btn" style={{ fontSize: 18, padding: "12px 28px" }}>
          Browse Distributions
        </Link>
      </div>
    </div>
  );
}