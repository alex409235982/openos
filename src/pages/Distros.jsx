import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { apiRequest } from "../api";

export default function Distros() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistro, setSelectedDistro] = useState(null);
  const [showGlossary, setShowGlossary] = useState(false);
  const [distributions, setDistributions] = useState([]);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [glossaryLoading, setGlossaryLoading] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const isPremium = user?.plan === "premium";

  useEffect(() => {
    const fetchDistros = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        if (searchTerm) params.append('search', searchTerm);
        
        const data = await apiRequest(`/api/distros?${params.toString()}`);
        setDistributions(data);
      } catch (err) {
        console.error('Failed to fetch distributions');
      } finally {
        setLoading(false);
      }
    };

    fetchDistros();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const fetchGlossary = async () => {
      if (!showGlossary) return;
      
      setGlossaryLoading(true);
      try {
        const data = await apiRequest('/api/glossary');
        setGlossaryTerms(data);
      } catch (err) {
        console.error('Failed to fetch glossary terms');
      } finally {
        setGlossaryLoading(false);
      }
    };

    fetchGlossary();
  }, [showGlossary]);

  useEffect(() => {
    if (selectedDistro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedDistro]);

  const handleLaunchSession = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLaunching(true);
    setLaunchStatus('Starting your VM...');
    
    try {
      const response = await apiRequest("/api/sessions", {
        method: "POST",
        body: { distroId: selectedDistro._id }
      });
      
      navigate('/dashboard', { state: { newSession: response } });
    } catch (err) {
      console.error("Failed to launch session:", err);
      alert(err.message || "Failed to launch session. Please try again.");
      setLaunching(false);
    }
  };

  const categories = [
    { id: "all", label: "All Distributions" },
    { id: "beginner", label: "Beginner", emoji: "🌱" },
    { id: "intermediate", label: "Intermediate", emoji: "⚙️" },
    { id: "advanced", label: "Advanced", emoji: "🚀" },
    { id: "gaming", label: "Gaming Optimized", emoji: "🎮" },
    { id: "security", label: "Penetration Testing", emoji: "🔐" }
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 24, textAlign: 'center' }}>
        <h1 className="h1">Available Distributions</h1>
        <p className="p" style={{ maxWidth: 600, margin: '0 auto' }}>
          Browse and launch Linux distributions directly in your browser. Click on any distribution to learn more and start a session.
        </p>
      </div>

      <div className="card">
        <div style={{ marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Search distributions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ marginBottom: 16 }}
          />
          
          <div style={{ 
            display: 'flex', 
            gap: 8, 
            flexWrap: 'wrap',
            ...(isMobile && { justifyContent: 'center' })
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn ${selectedCategory === cat.id ? '' : 'secondary'}`}
                style={{ 
                  fontSize: isMobile ? 12 : 14, 
                  padding: isMobile ? '6px 10px' : '6px 12px',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.emoji && <span style={{ marginRight: 4 }}>{cat.emoji}</span>}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#aeb9ca' }}>
            Loading distributions...
          </div>
        ) : (
          <>
            <p className="p muted" style={{ marginBottom: 16, fontSize: 14 }}>
              Showing {distributions.length} distributions
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
              padding: '4px 4px 16px 4px'
            }}>
              {distributions.map((distro) => (
                <div
                  key={distro._id}
                  onClick={() => setSelectedDistro(distro)}
                  style={{
                    background: 'rgba(17, 24, 38, 0.6)',
                    border: '1px solid #2a3a55',
                    borderRadius: 12,
                    padding: 16,
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    transition: 'transform 0.2s, border-color 0.2s',
                    cursor: 'pointer'
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
                      e.currentTarget.style.borderColor = '#2a3a55';
                    }
                  }}
                >
                  <img
                    src={distro.logo}
                    alt={distro.name}
                    style={{
                      width: 48,
                      height: 48,
                      objectFit: 'contain',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: 18, wordBreak: 'break-word' }}>{distro.name}</h3>
                    <p className="p muted" style={{ margin: 0, fontSize: 13, wordBreak: 'break-word' }}>{distro.description}</p>
                    <div style={{ marginTop: 8 }}>
                      <span className="badge" style={{ fontSize: 11 }}>
                        {categories.find(c => c.id === distro.category)?.label.split(' / ')[0] || distro.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {distributions.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: '#aeb9ca' }}>
                No distributions found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>

      {selectedDistro && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          zIndex: 1000,
          overflowY: 'auto'
        }} onClick={() => !launching && setSelectedDistro(null)}>
          <div style={{
            width: '100%',
            minHeight: '100vh',
            background: '#0f1620',
            padding: isMobile ? '24px 16px' : '32px 48px'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ 
              maxWidth: 1400, 
              margin: '0 auto',
              position: 'relative'
            }}>
              {!launching && (
                <button 
                  onClick={() => setSelectedDistro(null)} 
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid #2a3a55',
                    borderRadius: '50%',
                    width: isMobile ? 36 : 40,
                    height: isMobile ? 36 : 40,
                    fontSize: isMobile ? 20 : 24,
                    cursor: 'pointer',
                    color: '#aeb9ca',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#aeb9ca';
                  }}
                >
                  ×
                </button>
              )}

              <div style={{ 
                display: 'flex', 
                gap: 16, 
                alignItems: 'center', 
                marginBottom: 24, 
                marginTop: isMobile ? 40 : 8,
                flexWrap: 'wrap'
              }}>
                <img 
                  src={selectedDistro.logo} 
                  alt={selectedDistro.name} 
                  style={{ 
                    width: isMobile ? 40 : 48, 
                    height: isMobile ? 40 : 48, 
                    objectFit: 'contain',
                    flexShrink: 0
                  }} 
                />
                <div>
                  <h1 style={{ 
                    margin: 0, 
                    fontSize: isMobile ? 24 : 28, 
                    color: '#ffffff',
                    wordBreak: 'break-word'
                  }}>
                    {selectedDistro.name}
                  </h1>
                  <div style={{ marginTop: 6 }}>
                    <span className="badge" style={{ fontSize: 12, padding: '4px 10px' }}>
                      {categories.find(c => c.id === selectedDistro.category)?.label.split(' / ')[0] || selectedDistro.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', 
                gap: isMobile ? 0 : 40,
                alignItems: 'start'
              }}>
                <div>
                  <img 
                    src={selectedDistro.screenshot} 
                    alt={`${selectedDistro.name} screenshot`} 
                    style={{ 
                      width: '100%', 
                      borderRadius: 20, 
                      marginBottom: 32, 
                      border: '1px solid #2a3a55',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                      height: 'auto'
                    }} 
                  />
                  <div>
                    <h2 style={{ fontSize: isMobile ? 22 : 24, marginBottom: 16, color: '#ffffff' }}>About {selectedDistro.name}</h2>
                    <p className="p" style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.7, wordBreak: 'break-word' }}>{selectedDistro.longDescription}</p>
                  </div>
                </div>
                
                <div>
                  <div style={{
                    background: 'rgba(17, 24, 38, 0.6)',
                    border: '1px solid #2a3a55',
                    borderRadius: 20,
                    padding: isMobile ? 20 : 24
                  }}>
                    <h2 style={{ fontSize: isMobile ? 20 : 22, marginBottom: 20, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
                      Session Configuration
                    </h2>
                    
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: 20,
                      marginBottom: 24
                    }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: 12, color: '#cdd6e5', fontWeight: 500 }}>
                          VM Username
                        </label>
                        <div style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(11, 18, 32, 0.85)',
                          border: '1px solid #2a3a55',
                          borderRadius: 12,
                          color: '#8bffb3',
                          fontSize: 14,
                          fontFamily: 'monospace'
                        }}>
                          openos
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: 12, color: '#cdd6e5', fontWeight: 500 }}>
                          VM Password
                        </label>
                        <div style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(11, 18, 32, 0.85)',
                          border: '1px solid #2a3a55',
                          borderRadius: 12,
                          color: '#8bffb3',
                          fontSize: 14,
                          fontFamily: 'monospace'
                        }}>
                          openos
                        </div>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(31, 111, 235, 0.05)',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 24,
                      border: '1px solid rgba(31, 111, 235, 0.2)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img 
                          src={selectedDistro.logo} 
                          alt={selectedDistro.name}
                          style={{ 
                            width: 32, 
                            height: 32, 
                            objectFit: 'contain'
                          }} 
                        />
                        <div>
                          <div style={{ color: '#ffffff', fontWeight: 500, marginBottom: 4 }}>
                            VM Specifications
                          </div>
                          <div style={{ color: '#aeb9ca', fontSize: 13 }}>
                            4 GB RAM • 50 GB Storage
                          </div>
                          <div style={{ color: '#aeb9ca', fontSize: 12, marginTop: 6 }}>
                            {isPremium ? (
                              <span style={{ color: '#8bffb3' }}>Premium: Unlimited session time</span>
                            ) : (
                              <span>Free: 30 minute session limit</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleLaunchSession}
                      disabled={launching}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: launching ? '#2a3a55' : '#1f6feb',
                        border: 'none',
                        borderRadius: 12,
                        color: '#ffffff',
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: launching ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        marginBottom: 16,
                        opacity: launching ? 0.7 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!launching) {
                          e.currentTarget.style.background = '#2a7eef';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!launching) {
                          e.currentTarget.style.background = '#1f6feb';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {launching ? 'Starting VM...' : `Launch ${selectedDistro.name} Session`}
                    </button>

                    <div style={{
                      textAlign: 'center',
                      padding: '12px',
                      background: 'rgba(255, 139, 139, 0.05)',
                      borderRadius: 8,
                      fontSize: 13,
                      color: '#ffb86b'
                    }}>
                      Note: All sessions are isolated and temporary. Changes will not persist after the session ends.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {launching && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.98)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: 400,
            padding: 40
          }}>
            <div style={{
              width: 80,
              height: 80,
              margin: '0 auto 24px',
              border: '3px solid #2a3a55',
              borderTopColor: '#1f6feb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
            <h2 style={{ color: '#ffffff', marginBottom: 12 }}>Starting Your Session</h2>
            <p style={{ color: '#aeb9ca', fontSize: 16, marginBottom: 8 }}>{launchStatus}</p>
            <p style={{ color: '#6b7b93', fontSize: 12, marginTop: 16 }}>
              This will take about 30 seconds...
            </p>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: 32 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 20, 
          flexWrap: 'wrap', 
          gap: 12 
        }}>
          <div>
            <h2 className="h2" style={{ margin: 0 }}>Linux Glossary</h2>
            <p className="p muted" style={{ margin: '4px 0 0 0', fontSize: isMobile ? 12 : 13 }}>
              Click "Show Glossary" to learn new definitions regarding operating systems and Linux.
            </p>
          </div>
          <button 
            onClick={() => setShowGlossary(!showGlossary)} 
            className="btn secondary"
            style={{ fontSize: isMobile ? 12 : 14, padding: isMobile ? '6px 12px' : '8px 16px' }}
          >
            {showGlossary ? 'Hide Glossary' : 'Show Glossary'}
          </button>
        </div>
        
        {showGlossary && (
          <>
            {glossaryLoading ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#aeb9ca' }}>
                Loading glossary terms...
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 16
              }}>
                {glossaryTerms.map((item) => (
                  <a
                    key={item._id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(17, 24, 38, 0.6)',
                      border: '1px solid #2a3a55',
                      borderRadius: 12,
                      padding: 16,
                      textDecoration: 'none',
                      transition: 'transform 0.2s, border-color 0.2s',
                      display: 'block'
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
                        e.currentTarget.style.borderColor = '#2a3a55';
                      }
                    }}
                  >
                    <h3 style={{ margin: '0 0 8px 0', fontSize: isMobile ? 15 : 16, color: '#ffffff', wordBreak: 'break-word' }}>{item.term}</h3>
                    <p className="p muted" style={{ margin: 0, fontSize: isMobile ? 12 : 13, wordBreak: 'break-word' }}>{item.definition}</p>
                  </a>
                ))}
              </div>
            )}

            {glossaryTerms.length === 0 && !glossaryLoading && (
              <div style={{ textAlign: 'center', padding: 40, color: '#aeb9ca' }}>
                No glossary terms found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}