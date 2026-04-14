import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sessions from "../components/Sessions";
import Distros from "../components/Distros";
import Settings from "../components/Settings";
import Tutorials from "../components/Tutorials";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthContext";
import { FaDesktop, FaTh, FaCog, FaUserCircle, FaCrown, FaBook, FaBars, FaTimes } from "react-icons/fa";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("dashboardActiveSection") || "sessions";
  });
  const [newSessionData, setNewSessionData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (location.state?.newSession) {
      setNewSessionData(location.state.newSession);
      setActiveSection("sessions");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("dashboardActiveSection", activeSection);
  }, [activeSection]);

  const handleLaunchSession = (distro, config, response) => {
    setNewSessionData(response);
    setActiveSection("sessions");
    if (isMobile) setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "sessions":
        return <Sessions user={user} newSessionData={newSessionData} onLaunchSession={handleLaunchSession} />;
      case "distros":
        return <Distros onLaunchSession={handleLaunchSession} user={user} />;
      case "tutorials":
        return <Tutorials />;
      case "settings":
        return <Settings />;
      default:
        return <Sessions user={user} newSessionData={newSessionData} onLaunchSession={handleLaunchSession} />;
    }
  };

  const menuItems = [
    { id: "sessions", label: "Sessions", icon: <FaDesktop size={18} /> },
    { id: "distros", label: "Distros", icon: <FaTh size={18} /> },
    { id: "tutorials", label: "Tutorials", icon: <FaBook size={18} /> },
    { id: "settings", label: "Settings", icon: <FaCog size={18} /> }
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column"
    }}>
      <div className="container pageContent" style={{ padding: isMobile ? "16px" : "24px" }}>
        <Nav />
      </div>
      
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 100,
            background: "#1f6feb",
            border: "none",
            width: 50,
            height: 50,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          <FaBars size={24} color="#ffffff" />
        </button>
      )}

      {isMobile && sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 1000,
            padding: "20px"
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            style={{
              background: "#0f1620",
              borderRadius: 20,
              padding: 20,
              maxWidth: 300,
              margin: "0 auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: "pointer",
                  color: "#ffffff"
                }}
              >
                <FaTimes size={18} />
              </button>
            </div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1f6feb, #0a4a9e)",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <FaUserCircle size={52} color="#ffffff" />
                )}
              </div>
              <div style={{ color: "#ffffff", fontWeight: 600, fontSize: 18 }}>{user?.name || "User"}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 6 }}>
                {user?.plan === "premium" ? (
                  <>
                    <FaCrown size={12} color="#ffb86b" />
                    <span style={{ color: "#ffb86b", fontSize: 12, fontWeight: 500 }}>Premium</span>
                  </>
                ) : (
                  <span style={{ color: "#8bffb3", fontSize: 12, fontWeight: 500 }}>Free Plan</span>
                )}
              </div>
            </div>
            <div>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                    marginBottom: 8,
                    background: activeSection === item.id ? "rgba(31, 111, 235, 0.2)" : "transparent",
                    border: "none",
                    borderRadius: 12,
                    color: activeSection === item.id ? "#1f6feb" : "#aeb9ca",
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: activeSection === item.id ? 600 : 400
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, padding: isMobile ? "0 16px 32px 16px" : "0 24px 32px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: isMobile ? 0 : 32 }}>
          {!isMobile && (
            <div style={{ width: 280, flexShrink: 0 }}>
              <div style={{
                background: "rgba(17, 24, 38, 0.7)",
                backdropFilter: "blur(12px)",
                borderRadius: 24,
                border: "1px solid rgba(31, 111, 235, 0.2)",
                overflow: "hidden",
                position: "sticky",
                top: 20
              }}>
                <div style={{ padding: "28px 20px", textAlign: "center", borderBottom: "1px solid rgba(31, 111, 235, 0.1)" }}>
                  <div style={{
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1f6feb, #0a4a9e)",
                    margin: "0 auto 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(31, 111, 235, 0.3)"
                  }}>
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <FaUserCircle size={52} color="#ffffff" />
                    )}
                  </div>
                  <div style={{ color: "#ffffff", fontWeight: 600, fontSize: 18 }}>{user?.name || "User"}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 6 }}>
                    {user?.plan === "premium" ? (
                      <>
                        <FaCrown size={12} color="#ffb86b" />
                        <span style={{ color: "#ffb86b", fontSize: 12, fontWeight: 500 }}>Premium</span>
                      </>
                    ) : (
                      <span style={{ color: "#8bffb3", fontSize: 12, fontWeight: 500 }}>Free Plan</span>
                    )}
                  </div>
                </div>
                <div style={{ padding: "16px" }}>
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 16px",
                        marginBottom: 8,
                        background: activeSection === item.id ? "rgba(31, 111, 235, 0.2)" : "transparent",
                        border: "none",
                        borderRadius: 12,
                        color: activeSection === item.id ? "#1f6feb" : "#aeb9ca",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: activeSection === item.id ? 600 : 400,
                        transition: "all 0.2s"
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            {renderContent()}
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: isMobile ? "16px" : "24px" }}>
        <Footer />
      </div>
    </div>
  );
}