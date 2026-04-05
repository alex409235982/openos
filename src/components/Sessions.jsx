import React, { useState, useEffect, useRef } from "react";
import { FaStop, FaExpand, FaClock, FaDesktop } from "react-icons/fa";

export default function Sessions({ user, newSessionData }) {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [endingSession, setEndingSession] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(() => {
      if (activeSession && activeSession.status === "running") {
        fetchSessions();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (newSessionData) {
      setActiveSession(newSessionData);
      setTimer(0);
    }
  }, [newSessionData]);

  useEffect(() => {
    let interval;
    if (activeSession && activeSession.status === "running") {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (activeSession && activeSession.novncUrl && iframeRef.current) {
      const url = `${activeSession.novncUrl}/vnc.html?autoconnect=true&resize=scale&reconnect=true&reconnect_delay=3000`;
      iframeRef.current.src = url;
    }
  }, [activeSession]);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("openos_access");
      const response = await fetch("/api/sessions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setSessions(data);
      const running = data.find(s => s.status === "running");
      if (running && (!activeSession || activeSession._id !== running._id)) {
        setActiveSession(running);
        setTimer(running.elapsedTime || 0);
      } else if (!running && activeSession && activeSession.status !== 'ended') {
        setActiveSession(null);
        setTimer(0);
      }
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      return `${hrs}h ${mins % 60}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const handleEnd = async () => {
    if (endingSession || !activeSession) return;
    setEndingSession(true);
    
    try {
      const response = await fetch('https://openos-api.ngrok-free.dev/api/end-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vmName: activeSession.vmId })
      });
      
      if (!response.ok) {
        throw new Error('Failed to end session');
      }
      
      const token = localStorage.getItem("openos_access");
      const sessionId = activeSession._id;
      
      await fetch(`/api/sessions/${sessionId}/end`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      setActiveSession(null);
      setTimer(0);
      await fetchSessions();
      
    } catch (err) {
      console.error("Failed to end session:", err);
      alert("Failed to end session. Please try again.");
    } finally {
      setEndingSession(false);
    }
  };

  const toggleFullscreen = () => {
    const elem = iframeRef.current;
    if (!elem) return;
    
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const maxSessionTime = user?.plan === "premium" ? Infinity : 1800;

  useEffect(() => {
    if (timer >= maxSessionTime && user?.plan !== "premium" && activeSession) {
      alert('Session time limit reached (30 minutes). Ending session...');
      handleEnd();
    }
  }, [timer]);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8, color: "#ffffff" }}>Sessions</h1>
      <p style={{ color: "#aeb9ca", marginBottom: 24 }}>Manage your active and past Linux sessions</p>

      {activeSession ? (
        <div style={{
          background: "rgba(17, 24, 38, 0.6)",
          border: "1px solid #2a3a55",
          borderRadius: 16,
          marginBottom: 24,
          overflow: "hidden"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            background: "rgba(0, 0, 0, 0.3)",
            borderBottom: "1px solid #2a3a55",
            flexWrap: "wrap",
            gap: 12
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <FaDesktop size={20} color="#1f6feb" />
              <span style={{ fontWeight: 600, color: "#ffffff" }}>{activeSession.distroName}</span>
              <div style={{
                padding: "4px 10px",
                borderRadius: 20,
                background: timer >= maxSessionTime ? "#ff8b8b20" : "#8bffb320",
                border: `1px solid ${timer >= maxSessionTime ? "#ff8b8b" : "#8bffb3"}`
              }}>
                <FaClock size={12} style={{ marginRight: 6, color: timer >= maxSessionTime ? "#ff8b8b" : "#8bffb3" }} />
                <span style={{ color: timer >= maxSessionTime ? "#ff8b8b" : "#8bffb3", fontSize: 14 }}>
                  {user?.plan !== "premium" ? `${formatTime(timer)} / 30m` : formatTime(timer)}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={toggleFullscreen}
                style={{
                  background: "#22324a",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 8,
                  color: "#cdd6e5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <FaExpand size={14} />
                Fullscreen
              </button>
              <button
                onClick={handleEnd}
                disabled={endingSession}
                style={{
                  background: "#ff8b8b20",
                  border: "1px solid #ff8b8b",
                  padding: "8px 14px",
                  borderRadius: 8,
                  color: "#ff8b8b",
                  cursor: endingSession ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: endingSession ? 0.6 : 1
                }}
              >
                <FaStop size={14} />
                {endingSession ? "Ending..." : "End Session"}
              </button>
            </div>
          </div>
          
          <div style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden"
          }}>
            <iframe
              ref={iframeRef}
              src=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
                background: "#000"
              }}
              title="VM Session"
              allow="clipboard-read; clipboard-write; fullscreen; keyboard; pointer-lock"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-pointer-lock"
              tabIndex={0}
            />
          </div>
          
          <div style={{
            padding: "12px 20px",
            background: "rgba(0, 0, 0, 0.3)",
            borderTop: "1px solid #2a3a55",
            fontSize: 12,
            color: "#6b7b93",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8
          }}>
            <span>Note: Changes do NOT persist after the session ends.</span>
          </div>
        </div>
      ) : (
        <div style={{
          background: "rgba(17, 24, 38, 0.6)",
          border: "1px solid #2a3a55",
          borderRadius: 16,
          padding: "60px 20px",
          textAlign: "center",
          marginBottom: 24
        }}>
          <FaDesktop size={48} color="#2a3a55" style={{ marginBottom: 16 }} />
          <h3 style={{ color: "#ffffff", marginBottom: 8 }}>No Active Session</h3>
          <p style={{ color: "#aeb9ca", marginBottom: 16 }}>Launch a distro from the Distros section to start a session</p>
        </div>
      )}

      <h2 style={{ fontSize: 20, marginBottom: 16, color: "#ffffff" }}>Session History</h2>
      
      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#aeb9ca" }}>Loading sessions...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sessions.filter(s => s.status === "ended" || s.status === "expired").slice(0, 10).map((session) => (
            <div
              key={session._id}
              style={{
                background: "rgba(17, 24, 38, 0.6)",
                border: "1px solid #2a3a55",
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={session.distroLogo} alt={session.distroName} style={{ width: 32, height: 32, objectFit: "contain" }} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 500 }}>{session.distroName}</div>
                  <div style={{ color: "#aeb9ca", fontSize: 12 }}>
                    {new Date(session.createdAt).toLocaleString()} • {formatTime(session.duration || 0)}
                  </div>
                </div>
              </div>
              <div style={{
                padding: "4px 12px",
                borderRadius: 20,
                background: session.status === "expired" ? "#ff8b8b20" : "#8bffb320",
                fontSize: 12,
                color: session.status === "expired" ? "#ff8b8b" : "#8bffb3"
              }}>
                {session.status}
              </div>
            </div>
          ))}
          {sessions.filter(s => s.status === "ended" || s.status === "expired").length === 0 && !loading && (
            <div style={{ textAlign: "center", padding: 40, color: "#aeb9ca" }}>
              No past sessions found
            </div>
          )}
        </div>
      )}
    </div>
  );
}