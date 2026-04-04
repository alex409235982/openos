import React from "react";
import { useAuth } from "../auth/AuthContext";
import { 
  FaUserCircle, 
  FaDesktop, 
  FaTh, 
  FaCog,
  FaCrown
} from "react-icons/fa";

export default function Sidebar({ activeSection, setActiveSection }) {
  const { user } = useAuth();

  const menuItems = [
    { id: "sessions", label: "Sessions", icon: <FaDesktop size={18} /> },
    { id: "distros", label: "Distros", icon: <FaTh size={18} /> },
    { id: "settings", label: "Settings", icon: <FaCog size={18} /> }
  ];

  return (
    <div style={{
      width: 280,
      background: "rgba(17, 24, 38, 0.6)",
      backdropFilter: "blur(12px)",
      border: "1px solid #2a3a55",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      height: "fit-content",
      position: "sticky",
      top: 20
    }}>
      <div style={{ padding: "24px 20px", borderBottom: "1px solid #2a3a55" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#22324a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <FaUserCircle size={40} color="#aeb9ca" />
            )}
          </div>
          <div>
            <div style={{ color: "#ffffff", fontWeight: 600, fontSize: 16 }}>{user?.name || "User"}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              {user?.plan === "premium" ? (
                <>
                  <FaCrown size={12} color="#ffb86b" />
                  <span style={{ color: "#ffb86b", fontSize: 12, fontWeight: 500 }}>Premium</span>
                </>
              ) : (
                <span style={{ color: "#aeb9ca", fontSize: 12 }}>Free</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav style={{ padding: "16px" }}>
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
              background: activeSection === item.id ? "#1f6feb" : "transparent",
              border: "none",
              borderRadius: 12,
              color: activeSection === item.id ? "#ffffff" : "#cdd6e5",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: activeSection === item.id ? 500 : 400,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.background = "rgba(31, 111, 235, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}