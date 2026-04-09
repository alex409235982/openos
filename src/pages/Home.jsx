import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reasons = [
    {
      emoji: "🔓",
      title: "Freedom & Open Source",
      description: "Linux gives you complete control over your system. You can view, modify, and share the code however you want."
    },
    {
      emoji: "🛡️",
      title: "Security & Privacy",
      description: "There are better permission systems and zero telemetry spying on your activities."
    },
    {
      emoji: "💸",
      title: "Completely Free",
      description: "No license fees and no subscriptions. Linux is free for everyone, forever."
    },
    {
      emoji: "🔄",
      title: "Revive Old Hardware",
      description: "Give old computers a second life. Linux runs fast on hardware that Windows abandoned."
    },
    {
      emoji: "🎮",
      title: "Gaming Ready",
      description: "You can use tools like Proton to play thousands of Windows games on Linux. Start up an emulator while you are at it!"
    },
    {
      emoji: "🌍",
      title: "Linux is Community Driven",
      description: "Join millions of users and developers who believe in open source and collaboration."
    }
  ];

  const nextReason = () => {
    setCurrentReasonIndex((prev) => (prev + 1) % reasons.length);
  };

  const prevReason = () => {
    setCurrentReasonIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  };

  const currentReason = reasons[currentReasonIndex];

  return (
    <>
      <div className="card">
        <h1 className="h1">Try Before You Install</h1>
        <p className="p">
          OPENOS lets you explore Linux distributions safely from the browser.
          No installation and no risk to your personal device.
        </p>
        <div className="row" style={{ marginTop: 14 }}>
          <Link className="btn" to="/signup">Launch Demo</Link>
          <Link className="btn secondary" to="/about">Learn More</Link>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h2 className="sectionTitle">Popular Distributions</h2>
        <p className="p muted" style={{ marginTop: 0 }}>
          Choose a path based on your experience level.
        </p>

        <div className="row" style={{ marginTop: 10 }}>
          <div
            className="card"
            style={{
              flex: "1 1 300px",
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Linux_Mint_logo_without_wordmark.svg"
              alt="Linux Mint"
              style={{ width: 62, height: 62 }}
            />
            <div>
              <div className="badge">Beginner</div>
              <h2 className="h2" style={{ marginTop: 10 }}>Linux Mint</h2>
              <p className="p">Friendly entry point for new users.</p>
            </div>
          </div>

          <div
            className="card"
            style={{
              flex: "1 1 300px",
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg"
              alt="Ubuntu"
              style={{ width: 62, height: 62 }}
            />
            <div>
              <div className="badge">Intermediate</div>
              <h2 className="h2" style={{ marginTop: 10 }}>Ubuntu</h2>
              <p className="p">General-purpose distro with huge community support.</p>
            </div>
          </div>

          <div
            className="card"
            style={{
              flex: "1 1 300px",
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Arch_Linux_%22Crystal%22_icon.svg/3840px-Arch_Linux_%22Crystal%22_icon.svg.png"
              alt="Arch Linux"
              style={{ width: 62, height: 62 }}
            />
            <div>
              <div className="badge">Advanced</div>
              <h2 className="h2" style={{ marginTop: 10 }}>Arch Linux</h2>
              <p className="p">Powerful and customizable for experienced users.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <h2 className="sectionTitle" style={{ textAlign: "center" }}>Why Move To Linux?</h2>
        <p className="p muted" style={{ marginTop: 0, textAlign: "center", marginBottom: 20 }}>
          What is the point of actually making the switch?
        </p>

        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          gap: 24,
          alignItems: "stretch"
        }}>
          <div className="card" style={{ 
            display: "flex", 
            flexDirection: "column",
            padding: 0,
            overflow: "hidden",
            flex: 1
          }}>
            <div style={{ 
              padding: "16px 20px", 
              borderBottom: "1px solid #2a3a55",
              background: "rgba(0,0,0,0.2)"
            }}>
              <h3 style={{ fontSize: 18, margin: 0, color: "#ffffff" }}>Should You Switch To Linux?</h3>
            </div>
            <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/I9fGwELPlQY"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none"
                }}
                title="Should You Switch To Linux?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{ 
              padding: "8px 16px", 
              borderTop: "1px solid #2a3a55",
              background: "rgba(0,0,0,0.15)",
              textAlign: "center"
            }}>
              <p style={{ margin: 0, fontSize: 12, color: "#aeb9ca" }}>This video is by Michael Horn.</p>
            </div>
          </div>

          <div className="card" style={{ flex: 1, textAlign: "center" }}>
            <h3 style={{ fontSize: 20, marginBottom: 16, color: "#ffffff" }}>More Reasons For The Move</h3>
            
            <div style={{ 
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: 20
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{currentReason.emoji}</div>
              <h4 style={{ fontSize: 18, margin: "0 0 12px 0", color: "#8bffb3" }}>
                {currentReason.title}
              </h4>
              <p className="p muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                {currentReason.description}
              </p>
            </div>

            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: 12,
              marginBottom: 16
            }}>
              <button
                onClick={prevReason}
                style={{
                  background: "#22324a",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#2a3a55"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#22324a"}
              >
                Previous
              </button>
              <button
                onClick={nextReason}
                style={{
                  background: "#1f6feb",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#2a7eef"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#1f6feb"}
              >
                Next
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {reasons.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReasonIndex(idx)}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: idx === currentReasonIndex ? "#1f6feb" : "#2a3a55",
                    border: "none",
                    cursor: "pointer",
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}