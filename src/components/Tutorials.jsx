import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaCheck, FaSearch, FaFilter, FaBook, FaTerminal, FaNetworkWired, FaShieldAlt, FaHdd, FaCogs, FaCode, FaClock, FaExternalLinkAlt, FaSeedling, FaTools, FaRocket, FaMicrochip } from "react-icons/fa";
import { apiRequest } from "../api";
import { useAuth } from "../auth/AuthContext";

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({});
  const [showSidebar, setShowSidebar] = useState(true);
  const { user } = useAuth();
  const iframeRef = useRef(null);

  const categories = [
    { id: "all", label: "All Tutorials", icon: <FaBook size={14} /> },
    { id: "beginner", label: "Beginner", icon: <FaSeedling size={14} /> },
    { id: "intermediate", label: "Intermediate", icon: <FaTools size={14} /> },
    { id: "advanced", label: "Advanced", icon: <FaRocket size={14} /> },
    { id: "commands", label: "Commands", icon: <FaTerminal size={14} /> },
    { id: "processes", label: "Processes", icon: <FaMicrochip size={14} /> },
    { id: "networking", label: "Networking", icon: <FaNetworkWired size={14} /> },
    { id: "security", label: "Security", icon: <FaShieldAlt size={14} /> },
    { id: "system", label: "System", icon: <FaCogs size={14} /> },
    { id: "file-management", label: "File Management", icon: <FaHdd size={14} /> },
    { id: "package-management", label: "Package Management", icon: <FaCode size={14} /> }
  ];

  useEffect(() => {
    fetchTutorials();
    fetchProgress();
  }, []);

  useEffect(() => {
    filterTutorials();
  }, [selectedCategory, searchTerm, tutorials]);

  const fetchTutorials = async () => {
    try {
      const data = await apiRequest("/api/tutorials");
      setTutorials(data);
      setFilteredTutorials(data);
    } catch (err) {
      console.error("Failed to fetch tutorials", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    if (!user) return;
    try {
      const data = await apiRequest("/api/tutorials/progress");
      setProgress(data);
    } catch (err) {
      console.error("Failed to fetch progress", err);
    }
  };

  const filterTutorials = () => {
    let filtered = [...tutorials];
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(term)
      );
    }
    
    setFilteredTutorials(filtered);
  };

  const markCompleted = async (tutorialId) => {
    try {
      await apiRequest("/api/tutorials/progress", {
        method: "POST",
        body: { tutorialId, completed: true }
      });
      setProgress(prev => ({
        ...prev,
        [tutorialId]: { completed: true, completedAt: new Date() }
      }));
    } catch (err) {
      console.error("Failed to mark completed", err);
    }
  };

  const isCompleted = (tutorialId) => {
    return progress[tutorialId]?.completed === true;
  };

  const getYouTubeEmbedUrl = (videoId, timestamp = 0) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${timestamp}`;
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 1024) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const completedCount = Object.values(progress).filter(p => p.completed).length;
  const totalCount = tutorials.length;

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8, color: "#ffffff", display: "flex", alignItems: "center", gap: 12 }}>
          Linux Tutorials
        </h1>
        <p style={{ color: "#aeb9ca", marginBottom: 16 }}>
          Learn Linux with video tutorials from Learn Linux TV
        </p>
        
        <div style={{
          background: "rgba(31, 111, 235, 0.1)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12
        }}>
          <div>
            <span style={{ color: "#ffffff", fontWeight: 600 }}>
              Your Progress: {completedCount} / {totalCount} tutorials completed
            </span>
          </div>
          <div style={{
            width: 200,
            height: 8,
            background: "#2a3a55",
            borderRadius: 4,
            overflow: "hidden"
          }}>
            <div style={{
              width: `${(completedCount / totalCount) * 100}%`,
              height: "100%",
              background: "#8bffb3",
              transition: "width 0.3s"
            }} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 24, flexDirection: isMobile ? "column" : "row" }}>
        {showSidebar && !isMobile && (
          <div style={{ width: 280, flexShrink: 0 }}>
            <div style={{
              background: "rgba(17, 24, 38, 0.6)",
              border: "1px solid #2a3a55",
              borderRadius: 16,
              position: "sticky",
              top: 20
            }}>
              <div style={{ padding: 20, borderBottom: "1px solid #2a3a55" }}>
                <div style={{ position: "relative" }}>
                  <FaSearch style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aeb9ca" }} />
                  <input
                    type="text"
                    placeholder="Search tutorials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 36px",
                      background: "rgba(11, 18, 32, 0.85)",
                      border: "1px solid #2a3a55",
                      borderRadius: 10,
                      color: "#e8e8e8",
                      fontSize: 14
                    }}
                  />
                </div>
              </div>
              
              <div style={{ padding: 16 }}>
                <div style={{ marginBottom: 12, color: "#ffffff", fontSize: 13, fontWeight: 600, padding: "0 8px" }}>
                  Categories
                </div>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      marginBottom: 4,
                      background: selectedCategory === cat.id ? "rgba(31, 111, 235, 0.15)" : "transparent",
                      border: "none",
                      borderRadius: 10,
                      color: selectedCategory === cat.id ? "#1f6feb" : "#cdd6e5",
                      cursor: "pointer",
                      fontSize: 13,
                      textAlign: "left"
                    }}
                  >
                    <span style={{ width: 20 }}>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {!selectedTutorial ? (
            <>
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p className="p muted" style={{ fontSize: 14 }}>
                  Showing {filteredTutorials.length} tutorials
                </p>
                {isMobile && (
                  <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="btn secondary"
                    style={{ padding: "6px 12px", fontSize: 12 }}
                  >
                    <FaFilter size={12} style={{ marginRight: 6 }} />
                    Filter
                  </button>
                )}
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#aeb9ca' }}>
                  Loading tutorials...
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 16
                }}>
                  {filteredTutorials.map((tutorial) => (
                    <div
                      key={tutorial._id}
                      onClick={() => setSelectedTutorial(tutorial)}
                      style={{
                        background: 'rgba(17, 24, 38, 0.6)',
                        border: isCompleted(tutorial._id) ? '1px solid #8bffb3' : '1px solid #2a3a55',
                        borderRadius: 12,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, border-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!isMobile) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.borderColor = '#1f6feb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          if (!isCompleted(tutorial._id)) {
                            e.currentTarget.style.borderColor = '#2a3a55';
                          }
                        }
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img
                          src={`https://img.youtube.com/vi/${tutorial.videoId}/mqdefault.jpg`}
                          alt={tutorial.title}
                          style={{
                            width: '100%',
                            height: 180,
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: 'rgba(0,0,0,0.8)',
                          padding: '4px 8px',
                          borderRadius: 6,
                          fontSize: 11,
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}>
                          <FaClock size={10} />
                          {tutorial.duration}
                        </div>
                        {isCompleted(tutorial._id) && (
                          <div style={{
                            position: 'absolute',
                            bottom: 10,
                            left: 10,
                            background: '#8bffb3',
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: 11,
                            color: '#0f1620',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}>
                            <FaCheck size={10} />
                            Completed
                          </div>
                        )}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(31, 111, 235, 0.9)',
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s'
                        }}
                        className="play-overlay">
                          <FaPlay size={20} color="#ffffff" style={{ marginLeft: 2 }} />
                        </div>
                      </div>
                      <div style={{ padding: 16 }}>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{
                            background: '#22324a',
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontSize: 10,
                            color: '#aeb9ca'
                          }}>
                            {categories.find(c => c.id === tutorial.category)?.label || tutorial.category}
                          </span>
                        </div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#ffffff', lineHeight: 1.4 }}>
                          {tutorial.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredTutorials.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: 60, color: '#aeb9ca' }}>
                  No tutorials found matching your criteria.
                </div>
              )}
            </>
          ) : (
            <div>
              <button
                onClick={() => setSelectedTutorial(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 8,
                  color: '#aeb9ca',
                  cursor: 'pointer',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                ← Back to tutorials
              </button>

              <div style={{
                background: 'rgba(17, 24, 38, 0.6)',
                border: '1px solid #2a3a55',
                borderRadius: 16,
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  background: '#000'
                }}>
                  <iframe
                    ref={iframeRef}
                    src={getYouTubeEmbedUrl(selectedTutorial.videoId, selectedTutorial.timestamp || 0)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    title={selectedTutorial.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                    <div>
                      <span style={{
                        background: '#22324a',
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        color: '#aeb9ca',
                        display: 'inline-block',
                        marginBottom: 12
                      }}>
                        {categories.find(c => c.id === selectedTutorial.category)?.label || selectedTutorial.category}
                      </span>
                      <h2 style={{ margin: '8px 0 0 0', fontSize: 24, color: '#ffffff' }}>
                        {selectedTutorial.title}
                      </h2>
                    </div>
                    
                    {!isCompleted(selectedTutorial._id) && (
                      <button
                        onClick={() => markCompleted(selectedTutorial._id)}
                        style={{
                          background: '#8bffb320',
                          border: '1px solid #8bffb3',
                          padding: '10px 20px',
                          borderRadius: 10,
                          color: '#8bffb3',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontWeight: 600
                        }}
                      >
                        <FaCheck size={14} />
                        Mark as Completed
                      </button>
                    )}
                    
                    {isCompleted(selectedTutorial._id) && (
                      <div style={{
                        background: '#8bffb320',
                        padding: '10px 20px',
                        borderRadius: 10,
                        color: '#8bffb3',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}>
                        <FaCheck size={14} />
                        Completed
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#aeb9ca', fontSize: 14 }}>
                      <FaClock size={14} />
                      Duration: {selectedTutorial.duration}
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedTutorial.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: '#1f6feb',
                        fontSize: 14,
                        textDecoration: 'none'
                      }}
                    >
                      <FaExternalLinkAlt size={12} />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSidebar && isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.95)',
          zIndex: 1000,
          overflowY: 'auto',
          padding: 24
        }} onClick={() => setShowSidebar(false)}>
          <div style={{ background: '#0f1620', borderRadius: 16, padding: 20 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#ffffff' }}>Filters</h3>
              <button onClick={() => setShowSidebar(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(11, 18, 32, 0.85)',
                  border: '1px solid #2a3a55',
                  borderRadius: 10,
                  color: '#e8e8e8'
                }}
              />
            </div>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowSidebar(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px',
                  marginBottom: 8,
                  background: selectedCategory === cat.id ? 'rgba(31, 111, 235, 0.15)' : 'transparent',
                  border: 'none',
                  borderRadius: 10,
                  color: selectedCategory === cat.id ? '#1f6feb' : '#cdd6e5',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ width: 24 }}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}