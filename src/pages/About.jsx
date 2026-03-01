import React, { useState } from "react";

export default function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");

  const distributions = [
    {
      name: "Linux Mint",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Linux_Mint_logo_without_wordmark.svg",
      category: "beginner",
      description: "Elegant, easy to use, and comfortable for newcomers."
    },
    {
      name: "Ubuntu",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg",
      category: "beginner",
      description: "Popular, well-supported, great for everyday use."
    },
    {
      name: "Fedora",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Fedora_icon_%282021%29.svg",
      category: "beginner",
      description: "Cutting-edge features with stability."
    },
    {
      name: "Arch Linux",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Arch_Linux_%22Crystal%22_icon.svg/3840px-Arch_Linux_%22Crystal%22_icon.svg.png",
      category: "advanced",
      description: "DIY approach, complete control over your system."
    },
    {
      name: "CachyOS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/CachyOS_Logo.svg",
      category: "gaming",
      description: "Optimized for performance and gaming."
    },
    {
      name: "Kali Linux",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg",
      category: "security",
      description: "Penetration testing and security auditing."
    },
    {
      name: "Manjaro",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Manjaro-logo.svg",
      category: "intermediate",
      description: "Arch-based with user-friendly approach."
    },
    {
      name: "Debian",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/66/Openlogo-debianV2.svg",
      category: "advanced",
      description: "Universal operating system, rock-solid stability."
    },
    {
      name: "KDE Neon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Neon-logo.svg",
      category: "intermediate",
      description: "Latest KDE software on a stable base."
    }
  ];

  const categories = [
    { id: "all", label: "All Distributions" },
    { id: "beginner", label: "Beginner", emoji: "🌱" },
    { id: "intermediate", label: "Intermediate", emoji: "⚙️" },
    { id: "advanced", label: "Advanced", emoji: "🚀" },
    { id: "gaming", label: "Gaming Optimized", emoji: "🎮" },
    { id: "security", label: "Penetration Testing", emoji: "🔐" }
  ];

  const filteredDistros = distributions.filter(dist => {
    const matchesSearch = dist.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dist.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          Your gateway to exploring Linux distributions safely from your browser. No installation, no risk, just pure learning.
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
            <p className="p muted" style={{ margin: 0, fontSize: 14 }}>No downloads, no VMs, no dual-boot setup.</p>
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

      <div className="card">
        <h2 className="h2" style={{ marginBottom: 20 }}>Available Distributions</h2>
        
        <div style={{ marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Search distributions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ marginBottom: 16 }}
          />
          
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn ${selectedCategory === cat.id ? "" : "secondary"}`}
                style={{ fontSize: 14, padding: "6px 12px" }}
              >
                {cat.emoji && <span style={{ marginRight: 4 }}>{cat.emoji}</span>}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="p muted" style={{ marginBottom: 16, fontSize: 14 }}>
          Showing {filteredDistros.length} distributions
        </p>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          maxHeight: 600,
          overflowY: "auto",
          padding: "4px 4px 16px 4px"
        }}>
          {filteredDistros.map((distro, index) => (
            <div
              key={index}
              style={{
                background: "rgba(17, 24, 38, 0.6)",
                border: "1px solid #2a3a55",
                borderRadius: 12,
                padding: 16,
                display: "flex",
                gap: 16,
                alignItems: "center",
                transition: "transform 0.2s, border-color 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "#1f6feb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#2a3a55";
              }}
            >
              <img
                src={distro.logo}
                alt={distro.name}
                style={{
                  width: 48,
                  height: 48,
                  objectFit: "contain"
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 4px 0", fontSize: 18 }}>{distro.name}</h3>
                <p className="p muted" style={{ margin: 0, fontSize: 13 }}>{distro.description}</p>
                <div style={{ marginTop: 8 }}>
                  <span className="badge" style={{ fontSize: 11 }}>
                    {categories.find(c => c.id === distro.category)?.label.split(" / ")[0] || distro.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDistros.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#aeb9ca" }}>
            No distributions found matching your criteria.
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
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
              <p className="p muted">Use the desktop, install software, test workflows. There is no limits, and more importantly, no risk.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}