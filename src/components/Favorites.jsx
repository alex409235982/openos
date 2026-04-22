import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { apiRequest } from "../api";
import { FaHeart, FaRocket, FaTrash } from "react-icons/fa";

export default function Favorites({ onLaunchSession, onSwitchToDistros }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [launching, setLaunching] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const formatCategory = (category) => {
    const categories = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      gaming: "Gaming Optimized",
      security: "Penetration Testing"
    };
    return categories[category] || category;
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const data = await apiRequest("/api/favorites", {
        token: localStorage.getItem("openos_access")
      });
      setFavorites(data);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (distroId, e) => {
    e.stopPropagation();
    try {
      await apiRequest(`/api/favorites/${distroId}`, {
        method: "DELETE",
        token: localStorage.getItem("openos_access")
      });
      setFavorites(favorites.filter(f => f.distroId !== distroId));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  const handleLaunch = async (distroId, distroName) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLaunching(distroId);
    
    try {
      const response = await apiRequest("/api/sessions", {
        method: "POST",
        body: { distroId }
      });
      
      if (onLaunchSession) {
        onLaunchSession(null, null, response);
      } else {
        navigate('/dashboard', { state: { newSession: response } });
      }
    } catch (err) {
      console.error("Failed to launch session:", err);
      alert(err.message || "Failed to launch session. Please try again.");
    } finally {
      setLaunching(null);
    }
  };

  const handleBrowseDistros = () => {
    onSwitchToDistros();
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8, color: "#ffffff", display: "flex", alignItems: "center", gap: 12 }}>
          My Favorites
        </h1>
        <p style={{ color: "#aeb9ca", marginBottom: 16 }}>
          Your favorite distributions for quick access
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#aeb9ca' }}>
          Loading favorites...
        </div>
      ) : favorites.length === 0 ? (
        <div style={{
          background: "rgba(17, 24, 38, 0.6)",
          border: "1px solid #2a3a55",
          borderRadius: 16,
          padding: "60px 20px",
          textAlign: "center"
        }}>
          <FaHeart size={48} color="#2a3a55" style={{ marginBottom: 16 }} />
          <h3 style={{ color: "#ffffff", marginBottom: 8 }}>No favorites yet</h3>
          <p style={{ color: "#aeb9ca", marginBottom: 16, fontSize: 14 }}>
            Browse distributions and click the heart icon to add them to your favorites
          </p>
          <button
            onClick={handleBrowseDistros}
            style={{
              background: "#1f6feb",
              border: "none",
              padding: "10px 20px",
              borderRadius: 10,
              color: "white",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Browse Distributions
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16
        }}>
          {favorites.map((favorite) => (
            <div
              key={favorite._id}
              style={{
                background: 'rgba(17, 24, 38, 0.6)',
                border: '1px solid #1f6feb',
                borderRadius: 12,
                padding: 16,
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <img
                src={favorite.distroLogo}
                alt={favorite.distroName}
                style={{
                  width: 48,
                  height: 48,
                  objectFit: 'contain',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                  <h3 style={{ margin: 0, fontSize: 16, wordBreak: 'break-word' }}>
                    {favorite.distroName}
                  </h3>
                  <span className="badge" style={{ fontSize: 10 }}>
                    {formatCategory(favorite.distroCategory)}
                  </span>
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={() => handleLaunch(favorite.distroId, favorite.distroName)}
                    disabled={launching === favorite.distroId}
                    style={{
                      background: launching === favorite.distroId ? "#2a3a55" : "#1f6feb",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: 8,
                      color: "white",
                      cursor: launching === favorite.distroId ? "not-allowed" : "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    {launching === favorite.distroId ? "Starting..." : "Launch"}
                  </button>
                  <button
                    onClick={(e) => handleRemoveFavorite(favorite.distroId, e)}
                    style={{
                      background: "rgba(255, 107, 107, 0.2)",
                      border: "1px solid #ff6b6b",
                      padding: "6px 12px",
                      borderRadius: 8,
                      color: "#ff6b6b",
                      cursor: "pointer",
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}