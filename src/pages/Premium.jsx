import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { apiRequest } from "../api";
import { 
  FaCheck, FaCcStripe, FaMonero, FaClock, FaInfinity, 
  FaRocket, FaShieldAlt, FaArrowRight, FaCopy, FaCrown, 
  FaBolt, FaServer, FaHeadset, FaChartLine, FaGem,
  FaLock, FaCreditCard, FaCoins, FaTimes
} from "react-icons/fa";

export default function Premium() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cryptoModal, setCryptoModal] = useState(false);
  const [txid, setTxid] = useState("");
  const [copied, setCopied] = useState(false);
  const [prices, setPrices] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const isPremium = user?.plan === "premium";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await apiRequest("/api/premium/prices");
        setPrices(data);
      } catch (err) {
        console.error("Failed to fetch prices", err);
      }
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    const verifyStripePayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');
      const stripeSuccess = params.get('stripe_success');
      
      if (sessionId && stripeSuccess === 'true') {
        setLoading(true);
        try {
          const data = await apiRequest(`/api/premium/verify-stripe?session_id=${sessionId}`, {
            token: localStorage.getItem("openos_access")
          });
          
          if (data.success) {
            setUser({ ...user, plan: "premium" });
            setSuccessMessage("Premium activated successfully!");
            window.history.replaceState({}, document.title, '/premium');
          } else {
            setErrorMessage("Failed to activate premium. Please contact support.");
          }
        } catch (err) {
          setErrorMessage("Failed to verify payment. Please contact support.");
        } finally {
          setLoading(false);
        }
      }
    };
    
    verifyStripePayment();
  }, [user, setUser]);

  const handleStripeCheckout = async () => {
    const token = localStorage.getItem("openos_access");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    
    setLoading(true);
    try {
      const data = await apiRequest("/api/premium/create-checkout", {
        method: "POST",
        token: localStorage.getItem("openos_access")
      });
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setErrorMessage("Failed to start checkout. Please try again.");
      setLoading(false);
    }
  };

  const handleCryptoConfirm = async () => {
    const token = localStorage.getItem("openos_access");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    
    if (!txid.trim()) {
      setErrorMessage("Please enter a transaction ID");
      return;
    }
    
    setLoading(true);
    try {
      const data = await apiRequest("/api/premium/crypto-confirm", {
        method: "POST",
        body: { txid },
        token: localStorage.getItem("openos_access")
      });
      
      if (data.success) {
        setUser({ ...user, plan: "premium" });
        setCryptoModal(false);
        setShowPaymentModal(false);
        setTxid("");
        setSuccessMessage("Premium activated successfully!");
      }
    } catch (err) {
      setErrorMessage("Failed to confirm transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    if (prices?.crypto?.moneroAddress) {
      navigator.clipboard.writeText(prices.crypto.moneroAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGetPremium = () => {
    const token = localStorage.getItem("openos_access");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setShowPaymentModal(true);
  };

  const features = [
    { 
      icon: <FaInfinity size={isMobile ? 22 : 24} />, 
      title: "Unlimited Session Time", 
      description: "There will be no more 30 minute limits. You can now test all distributions as long as you need.",
      color: "#8bffb3"
    },
    { 
      icon: <FaBolt size={isMobile ? 22 : 24} />, 
      title: "Priority Access", 
      description: "Skip the queue and get instant VM access. Your sessions will start immediately.",
      color: "#ffb86b"
    },
    { 
      icon: <FaServer size={isMobile ? 22 : 24} />, 
      title: "Enhanced Resources", 
      description: "Premium VMs come with dedicated resources (RTX 5090) for a smoother experience.",
      color: "#1f6feb"
    },
    { 
      icon: <FaHeadset size={isMobile ? 22 : 24} />, 
      title: "Priority Support", 
      description: "24/7 priority email support with faster response times for premium users.",
      color: "#aeb9ca"
    },
    { 
      icon: <FaChartLine size={isMobile ? 22 : 24} />, 
      title: "Extended History", 
      description: "Keep your session history for longer and track your Linux journey.",
      color: "#8bffb3"
    },
    { 
      icon: <FaGem size={isMobile ? 22 : 24} />, 
      title: "Exclusive Badges", 
      description: "Show off your premium status with an exclusive profile badge called Premium.",
      color: "#ffb86b"
    }
  ];

  const testimonials = [
    { name: "Joel", role: "Administrative Assistant", text: "I have zero prior experience with using Linux (only Windows and MacOS), and OPENOS has allowed me to learn/use Linux without breaking my own computer.", rating: 5 },
    { name: "JC Denton", role: "Software Developer", text: "I've been using Linux for many years, and I am very comfortable with how the terminal works, so I wanted to find a more advanced distro which can better suit my workflow and give me full control over my system. OPENOS has allowed me to test distros I was very worried about installing on my system, like Arch, BlackArch, and Kali Linux.", rating: 5 },
    { name: "Wallace", role: "CEO of Mid-Sized Marketing Agency", text: "I run a company which has over 50 employees, and I'm responsible for decisions which will impact worker productivity and the costs. OPENOS has allowed me to standardize the company's operations on a reliable OS which is also cost effective.", rating: 5 }
  ];

  return (
    <div className="container">
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {successMessage && (
        <div style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 3000,
          background: "rgba(139, 255, 179, 0.95)",
          color: "#0f1620",
          padding: "12px 20px",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          animation: "slideDown 0.3s ease-out",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 3000,
          background: "rgba(255, 139, 139, 0.95)",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          animation: "slideDown 0.3s ease-out",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}>
          {errorMessage}
        </div>
      )}

      <div className="card" style={{ marginBottom: 24, textAlign: "center" }}>
        <h1 className="h1">Premium Upgrade</h1>
        <p className="p" style={{ maxWidth: 600, margin: "0 auto" }}>
          Get unlimited access to all of our Linux distributions with additional premium features.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: 32,
        maxWidth: 900,
        margin: "0 auto 64px auto"
      }}>
        <div 
          style={{ 
            background: "rgba(17, 24, 38, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: 32,
            border: "1px solid rgba(42, 58, 85, 0.5)",
            padding: isMobile ? 24 : 32,
            textAlign: "center"
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div style={{ 
              width: 60, 
              height: 60, 
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto"
            }}>
              <FaGem size={28} color="#aeb9ca" />
            </div>
            <h2 style={{ fontSize: 28, marginBottom: 8 }}>Free</h2>
            <div style={{ fontSize: 14, color: "#aeb9ca" }}>Perfect for trying out</div>
          </div>
          <div style={{ fontSize: 48, fontWeight: "bold", marginBottom: 24 }}>
            $0
            <span style={{ fontSize: 16, fontWeight: "normal", color: "#aeb9ca" }}>/month</span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left", marginBottom: 32 }}>
            <li style={{ padding: "10px 0", color: "#cdd6e5", display: "flex", alignItems: "center", gap: 12 }}>
              <FaCheck size={16} color="#8bffb3" /> 30-minute session limit
            </li>
            <li style={{ padding: "10px 0", color: "#cdd6e5", display: "flex", alignItems: "center", gap: 12 }}>
              <FaCheck size={16} color="#8bffb3" /> Basic distributions
            </li>
            <li style={{ padding: "10px 0", color: "#cdd6e5", display: "flex", alignItems: "center", gap: 12 }}>
              <FaCheck size={16} color="#8bffb3" /> Community support
            </li>
            <li style={{ padding: "10px 0", color: "#6b7b93", display: "flex", alignItems: "center", gap: 12 }}>
              <FaTimes size={14} color="#6b7b93" /> Unlimited sessions
            </li>
            <li style={{ padding: "10px 0", color: "#6b7b93", display: "flex", alignItems: "center", gap: 12 }}>
              <FaTimes size={14} color="#6b7b93" /> Priority access
            </li>
          </ul>
          {isPremium ? (
            <div style={{ 
              background: "#8bffb320", 
              padding: "12px", 
              borderRadius: 12,
              color: "#8bffb3",
              fontWeight: 600
            }}>
              You have Premium
            </div>
          ) : (
            <div style={{ fontSize: 13, color: "#6b7b93", paddingTop: 16, borderTop: "1px solid rgba(42, 58, 85, 0.5)" }}>
              Current Plan
            </div>
          )}
        </div>

        <div 
          style={{ 
            background: "rgba(17, 24, 38, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: 32,
            border: "1px solid #2a3a55",
            padding: isMobile ? 24 : 32,
            textAlign: "center"
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div style={{ 
              width: 60, 
              height: 60, 
              background: "rgba(31, 111, 235, 0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto"
            }}>
              <FaCrown size={28} color="#ffb86b" />
            </div>
            <h2 style={{ fontSize: 28, marginBottom: 8 }}>Premium</h2>
            <div style={{ fontSize: 14, color: "#8bffb3" }}>Best value for power users</div>
          </div>
          <div style={{ fontSize: 48, fontWeight: "bold", marginBottom: 8 }}>
            $1.99
            <span style={{ fontSize: 16, fontWeight: "normal", color: "#aeb9ca" }}>/month</span>
          </div>
          <div style={{ fontSize: 13, color: "#6b7b93", marginBottom: 24 }}>Billed monthly • Cancel anytime</div>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left", marginBottom: 32 }}>
            <li style={{ padding: "10px 0", color: "#cdd6e5", display: "flex", alignItems: "center", gap: 12 }}>
              <FaCheck size={16} color="#8bffb3" />
              <span><strong>Unlimited</strong> session time</span>
            </li>
            <li style={{ padding: "10px 0", color: "#cdd6e5", display: "flex", alignItems: "center", gap: 12 }}>
              <FaCheck size={16} color="#8bffb3" />
              <span><strong>All</strong> distributions</span>
            </li>
            <li style={{ padding: "10px 0", color: "#cdd6e5", display: "flex", alignItems: "center", gap: 12 }}>
              <FaCheck size={16} color="#8bffb3" />
              <span>Priority <strong>24/7 support</strong></span>
            </li>
            <li style={{ padding: "10px 0", color: "#cdd6e5", display: "flex", alignItems: "center", gap: 12 }}>
              <FaCheck size={16} color="#8bffb3" />
              <span><strong>Instant</strong> VM access</span>
            </li>
            <li style={{ padding: "10px 0", color: "#cdd6e5", display: "flex", alignItems: "center", gap: 12 }}>
              <FaCheck size={16} color="#8bffb3" />
              <span><strong>Extended</strong> session history</span>
            </li>
          </ul>
          {isPremium ? (
            <div style={{ 
              background: "#8bffb320", 
              padding: "14px", 
              borderRadius: 16,
              color: "#8bffb3",
              fontWeight: 600,
              textAlign: "center"
            }}>
              Your Current Plan
            </div>
          ) : (
            <button
              onClick={handleGetPremium}
              style={{
                width: "100%",
                padding: "14px",
                background: "#1f6feb",
                border: "none",
                borderRadius: 16,
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.background = "#2a7eef";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "#1f6feb";
              }}
            >
              Get Premium Now
            </button>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 64 }}>
        <h2 className="h2" style={{ textAlign: "center", marginBottom: 16 }}>Premium Features</h2>
        <p className="p muted" style={{ textAlign: "center", marginBottom: 40 }}>
          Everything you need to master Linux
        </p>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: 24
        }}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={{ 
                background: "rgba(17, 24, 38, 0.6)",
                borderRadius: 20,
                padding: 24,
                textAlign: "center",
                border: "1px solid #2a3a55",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = feature.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#2a3a55";
              }}
            >
              <div style={{ color: feature.color, marginBottom: 16 }}>{feature.icon}</div>
              <h3 style={{ marginBottom: 12, fontSize: 18 }}>{feature.title}</h3>
              <p className="p muted" style={{ fontSize: 13, lineHeight: 1.5 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <h2 className="h2" style={{ textAlign: "center", marginBottom: 16 }}>Loved by Developers</h2>
        <p className="p muted" style={{ textAlign: "center", marginBottom: 40 }}>
          Join thousands of satisfied premium users
        </p>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: 24
        }}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              style={{ 
                background: "rgba(17, 24, 38, 0.6)",
                borderRadius: 20,
                padding: 24,
                border: "1px solid #2a3a55"
              }}
            >
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ color: "#ffb86b", fontSize: 14 }}>★</span>
                ))}
              </div>
              <p className="p" style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>"{testimonial.text}"</p>
              <div>
                <div style={{ fontWeight: 600, color: "#ffffff" }}>{testimonial.name}</div>
                <div style={{ fontSize: 12, color: "#6b7b93" }}>{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 48 }}>
        <h2 className="h2" style={{ textAlign: "center", marginBottom: 32 }}>Frequently Asked Questions</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 24
        }}>
          <div>
            <h3 style={{ marginBottom: 12, fontSize: 16, color: "#1f6feb" }}>Can I cancel anytime?</h3>
            <p className="p muted" style={{ fontSize: 14 }}>Yes, you can cancel your subscription at any time from your account settings.</p>
          </div>
          <div>
            <h3 style={{ marginBottom: 12, fontSize: 16, color: "#1f6feb" }}>What happens if I cancel?</h3>
            <p className="p muted" style={{ fontSize: 14 }}>You will keep premium access until the end of your billing period, then you will be reverted back to the free plan.</p>
          </div>
          <div>
            <h3 style={{ marginBottom: 12, fontSize: 16, color: "#1f6feb" }}>Is there a free trial?</h3>
            <p className="p muted" style={{ fontSize: 14 }}>We don't offer free trials, but you can test any distro with our free tier first.</p>
          </div>
          <div>
            <h3 style={{ marginBottom: 12, fontSize: 16, color: "#1f6feb" }}>What cryptocurrencies do you accept?</h3>
            <p className="p muted" style={{ fontSize: 14 }}>Currently we accept Monero (XMR) for anonymous payments.</p>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.98)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
          padding: 20
        }} onClick={() => !loading && setShowPaymentModal(false)}>
          <div style={{
            background: "#0f1620",
            border: "1px solid #2a3a55",
            borderRadius: 32,
            padding: isMobile ? 24 : 32,
            maxWidth: 500,
            width: "100%",
            animation: "slideIn 0.3s ease-out"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: isMobile ? 22 : 26 }}>Choose Payment Method</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: "pointer",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FaTimes size={18} />
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div 
                style={{ 
                  background: "rgba(99, 91, 255, 0.1)",
                  borderRadius: 20,
                  padding: 24,
                  cursor: "pointer",
                  border: hoveredFeature === "stripe" ? "2px solid #635bff" : "1px solid #2a3a55",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={() => setHoveredFeature("stripe")}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ 
                    width: 50, 
                    height: 50, 
                    background: "rgba(99, 91, 255, 0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FaCcStripe size={28} color="#635bff" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18 }}>Credit / Debit Card</h3>
                    <p className="p muted" style={{ margin: "4px 0 0 0", fontSize: 13 }}>Pay securely with Stripe</p>
                  </div>
                </div>
                <button 
                  onClick={handleStripeCheckout}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: loading ? "#2a3a55" : "#635bff",
                    border: "none",
                    borderRadius: 12,
                    color: "white",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "all 0.3s ease"
                  }}
                >
                  {loading ? "Processing..." : "Pay with Card"}
                  <FaArrowRight size={14} />
                </button>
              </div>

              <div 
                style={{ 
                  background: "rgba(247, 147, 26, 0.1)",
                  borderRadius: 20,
                  padding: 24,
                  cursor: "pointer",
                  border: hoveredFeature === "crypto" ? "2px solid #f7931a" : "1px solid #2a3a55",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={() => setHoveredFeature("crypto")}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ 
                    width: 50, 
                    height: 50, 
                    background: "rgba(247, 147, 26, 0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FaMonero size={28} color="#f7931a" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18 }}>Cryptocurrency</h3>
                    <p className="p muted" style={{ margin: "4px 0 0 0", fontSize: 13 }}>Pay with Monero (XMR)</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowPaymentModal(false);
                    setCryptoModal(true);
                  }}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "#22324a",
                    border: "1px solid #f7931a",
                    borderRadius: 12,
                    color: "#f7931a",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(247, 147, 26, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#22324a";
                  }}
                >
                  Pay with Crypto
                  <FaCoins size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {cryptoModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.98)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
          padding: 20
        }} onClick={() => !loading && setCryptoModal(false)}>
          <div style={{
            background: "#0f1620",
            border: "1px solid #2a3a55",
            borderRadius: 32,
            padding: isMobile ? 24 : 32,
            maxWidth: 500,
            width: "100%",
            animation: "slideIn 0.3s ease-out"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <FaMonero size={28} color="#f7931a" />
                <h2 style={{ margin: 0, fontSize: isMobile ? 20 : 24 }}>Pay with Monero</h2>
              </div>
              <button
                onClick={() => setCryptoModal(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  cursor: "pointer",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FaTimes size={16} />
              </button>
            </div>
            
            <p className="p muted" style={{ marginBottom: 24, fontSize: isMobile ? 13 : 14 }}>
              Send exactly <strong>$1.99 USD</strong> worth of XMR to the address below
            </p>
            
            <div style={{
              background: "rgba(11, 18, 32, 0.85)",
              border: "1px solid #2a3a55",
              borderRadius: 16,
              padding: 20,
              marginBottom: 24
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ color: "#aeb9ca", fontSize: 12 }}>Monero Address (XMR)</span>
                <button
                  onClick={copyAddress}
                  style={{
                    background: "rgba(31, 111, 235, 0.2)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 8,
                    color: "#1f6feb",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(31, 111, 235, 0.4)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(31, 111, 235, 0.2)"}
                >
                  <FaCopy size={12} />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div style={{
                fontFamily: "monospace",
                fontSize: isMobile ? 11 : 12,
                color: "#8bffb3",
                wordBreak: "break-all",
                background: "#0b0f14",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #2a3a55"
              }}>
                {prices?.crypto?.moneroAddress || "48Vrti8AbJNfyysFPz9VsvZZviwnAguSvPbZqApz8RGuECfSuHhKgzgdZmq7rRj5i7jf8AguAgSdsMVobZk65u554JpKK9q"}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#b9c2cf", fontSize: 13 }}>Transaction ID</label>
              <input
                type="text"
                value={txid}
                onChange={(e) => setTxid(e.target.value)}
                placeholder="Enter your transaction ID to verify payment"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid #2a3a55",
                  background: "rgba(11, 18, 32, 0.85)",
                  color: "#e8e8e8",
                  fontSize: 14,
                  outline: "none",
                  transition: "all 0.2s"
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#1f6feb"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#2a3a55"}
              />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setCryptoModal(false)}
                className="btn secondary"
                style={{ flex: 1, padding: "12px" }}
              >
                Cancel
              </button>
              <button
                onClick={handleCryptoConfirm}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: loading ? "#2a3a55" : "linear-gradient(135deg, #f7931a, #e67e22)",
                  border: "none",
                  borderRadius: 12,
                  color: "white",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                {loading ? "Verifying..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}