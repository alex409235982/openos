import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { apiRequest } from '../api';

export default function Distros() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistro, setSelectedDistro] = useState(null);
  const [showGlossary, setShowGlossary] = useState(false);
  const [distributions, setDistributions] = useState([]);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [glossaryLoading, setGlossaryLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const categories = [
    { id: "all", label: "All Distributions" },
    { id: "beginner", label: "Beginner", emoji: "🌱" },
    { id: "intermediate", label: "Intermediate", emoji: "⚙️" },
    { id: "advanced", label: "Advanced", emoji: "🚀" },
    { id: "gaming", label: "Gaming Optimized", emoji: "🎮" },
    { id: "security", label: "Penetration Testing", emoji: "🔐" }
  ];

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 24, textAlign: 'center' }}>
        <h1 className="h1">Available Distributions</h1>
        <p className="p" style={{ maxWidth: 600, margin: '0 auto' }}>
          Browse our collection of Linux distributions. Click on any distribution to learn more.
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
          
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn ${selectedCategory === cat.id ? '' : 'secondary'}`}
                style={{ fontSize: 14, padding: '6px 12px' }}
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#1f6feb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#2a3a55';
                  }}
                >
                  <img
                    src={distro.logo}
                    alt={distro.name}
                    style={{
                      width: 48,
                      height: 48,
                      objectFit: 'contain'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: 18 }}>{distro.name}</h3>
                    <p className="p muted" style={{ margin: 0, fontSize: 13 }}>{distro.description}</p>
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
        }} onClick={() => setSelectedDistro(null)}>
          <div style={{
            width: '100%',
            minHeight: '100vh',
            background: '#0f1620',
            padding: '32px 48px'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ 
              maxWidth: 1400, 
              margin: '0 auto',
              position: 'relative'
            }}>
              <button 
                onClick={() => setSelectedDistro(null)} 
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid #2a3a55',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  fontSize: 24,
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

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, marginTop: 8 }}>
                <img src={selectedDistro.logo} alt={selectedDistro.name} style={{ width: 48, height: 48, objectFit: 'contain' }} />
                <div>
                  <h1 style={{ margin: 0, fontSize: 28, color: '#ffffff' }}>{selectedDistro.name}</h1>
                  <div style={{ marginTop: 6 }}>
                    <span className="badge" style={{ fontSize: 12, padding: '4px 10px' }}>
                      {categories.find(c => c.id === selectedDistro.category)?.label.split(' / ')[0] || selectedDistro.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
                <div>
                  <img 
                    src={selectedDistro.screenshot} 
                    alt={`${selectedDistro.name} screenshot`} 
                    style={{ 
                      width: '100%', 
                      borderRadius: 20, 
                      marginBottom: 32, 
                      border: '1px solid #2a3a55',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.4)'
                    }} 
                  />
                  <div>
                    <h2 style={{ fontSize: 24, marginBottom: 16, color: '#ffffff' }}>About {selectedDistro.name}</h2>
                    <p className="p" style={{ fontSize: 15, lineHeight: 1.7 }}>{selectedDistro.longDescription}</p>
                  </div>
                </div>
                
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 className="h2" style={{ margin: 0 }}>Linux Glossary</h2>
            <p className="p muted" style={{ margin: '4px 0 0 0', fontSize: 13 }}>
            Click "Show Glossary" to learn new definitions regarding operating systems and Linux.
            </p>
          </div>
          <button 
            onClick={() => setShowGlossary(!showGlossary)} 
            className="btn secondary"
            style={{ fontSize: 14 }}
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#1f6feb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#2a3a55';
                    }}
                  >
                    <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#ffffff' }}>{item.term}</h3>
                    <p className="p muted" style={{ margin: 0, fontSize: 13 }}>{item.definition}</p>
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