import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../App";
import { apiRequest } from "../api";
import QRCode from "qrcode";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord, FaTrash, FaUserEdit, FaLock, FaShieldAlt, FaLink, FaUnlink, FaKey, FaQrcode, FaTachometerAlt, FaSun, FaMoon } from "react-icons/fa";

export default function Settings() {
  const { user, setUser, logout } = useAuth();
  const { theme, setTheme, blurLevel, setBlurLevel } = useTheme();
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingData, setPendingData] = useState(null);
  const [twoFactorInput, setTwoFactorInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(user?.profilePicture || null);
  
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [twoFactorSecret, setTwoFactorSecret] = useState(null);
  const [twoFactorQR, setTwoFactorQR] = useState(null);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [prefTheme, setPrefTheme] = useState(theme);
  const [prefBlur, setPrefBlur] = useState(blurLevel);
  const [savingPrefs, setSavingPrefs] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const blurOptions = [
    { value: 0, label: "None" },
    { value: 1, label: "Light" },
    { value: 2, label: "Normal" },
    { value: 3, label: "Medium" },
    { value: 4, label: "Heavy" }
  ];

  useEffect(() => {
    if (user?.preferences) {
      if (user.preferences.theme) {
        setPrefTheme(user.preferences.theme);
        setTheme(user.preferences.theme);
      }
      if (user.preferences.blurLevel !== undefined) {
        setPrefBlur(user.preferences.blurLevel);
        setBlurLevel(user.preferences.blurLevel);
      }
    }
  }, [user]);

  const savePreferences = async () => {
    setSavingPrefs(true);
    try {
      const response = await apiRequest("/api/users/preferences", {
        method: "PUT",
        body: { theme: prefTheme, blurLevel: prefBlur },
        token: localStorage.getItem("openos_access")
      });
      setTheme(prefTheme);
      setBlurLevel(prefBlur);
      setUser({ ...user, preferences: response.preferences });
      showMessage("success", "Preferences saved successfully");
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setSavingPrefs(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const executeWith2FA = (action, data = null) => {
    if (user?.twoFactorEnabled) {
      setPendingAction(action);
      setPendingData(data);
      setShow2FAModal(true);
      setTwoFactorInput("");
    } else {
      executeAction(action, data);
    }
  };

  const executeAction = async (action, data, twoFactorCode = null) => {
    setLoading(true);
    try {
      switch (action) {
        case 'updateProfilePicture':
          const pictureData = await apiRequest("/api/users/profile-picture", {
            method: "POST",
            body: { image: data.image, twoFactorCode },
            token: localStorage.getItem("openos_access")
          });
          setUser({ ...user, profilePicture: pictureData.profilePicture });
          showMessage("success", "Profile picture updated");
          break;
          
        case 'removeProfilePicture':
          await apiRequest("/api/users/profile-picture", {
            method: "DELETE",
            body: { twoFactorCode },
            token: localStorage.getItem("openos_access")
          });
          setProfilePreview(null);
          setUser({ ...user, profilePicture: null });
          showMessage("success", "Profile picture removed");
          break;
          
        case 'updateEmail':
          const emailData = await apiRequest("/api/users/email", {
            method: "PUT",
            body: { email: data.email, currentPassword: data.currentPassword, twoFactorCode },
            token: localStorage.getItem("openos_access")
          });
          setUser({ ...user, email: emailData.email });
          showMessage("success", "Email updated successfully");
          setCurrentPassword("");
          break;
          
        case 'updatePassword':
          await apiRequest("/api/users/password", {
            method: "PUT",
            body: { currentPassword: data.currentPassword, newPassword: data.newPassword, twoFactorCode },
            token: localStorage.getItem("openos_access")
          });
          showMessage("success", "Password updated successfully");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          break;
          
        case 'disconnectOAuth':
          await apiRequest("/api/users/oauth/disconnect", {
            method: "POST",
            body: { provider: data.provider, twoFactorCode },
            token: localStorage.getItem("openos_access")
          });
          setUser({ ...user, oauthProvider: null, oauthId: null });
          showMessage("success", `${data.provider} disconnected`);
          break;
          
        case 'deleteAccount':
          await apiRequest("/api/users/account", {
            method: "DELETE",
            body: { twoFactorCode },
            token: localStorage.getItem("openos_access")
          });
          logout();
          break;
      }
    } catch (err) {
      if (err.message === "2FA_REQUIRED") {
        setShow2FAModal(true);
      } else {
        showMessage("error", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = () => {
    if (pendingAction) {
      executeAction(pendingAction, pendingData, twoFactorInput);
      setShow2FAModal(false);
      setPendingAction(null);
      setPendingData(null);
      setTwoFactorInput("");
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      setProfilePreview(reader.result);
      executeWith2FA('updateProfilePicture', { image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePicture = () => {
    executeWith2FA('removeProfilePicture');
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    executeWith2FA('updateEmail', { email, currentPassword });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showMessage("error", "New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      showMessage("error", "Password must be at least 8 characters");
      return;
    }
    executeWith2FA('updatePassword', { currentPassword, newPassword });
  };

  const handleEnable2FA = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/users/2fa/enable", {
        method: "POST",
        token: localStorage.getItem("openos_access")
      });
      setTwoFactorSecret(data.secret);
      const qr = await QRCode.toDataURL(data.otpauthUrl);
      setTwoFactorQR(qr);
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!twoFactorCode) {
      showMessage("error", "Please enter the verification code");
      return;
    }
    setLoading(true);
    try {
      await apiRequest("/api/users/2fa/verify", {
        method: "POST",
        body: { code: twoFactorCode, secret: twoFactorSecret },
        token: localStorage.getItem("openos_access")
      });
      setTwoFactorEnabled(true);
      setTwoFactorSecret(null);
      setTwoFactorQR(null);
      setTwoFactorCode("");
      setUser({ ...user, twoFactorEnabled: true });
      showMessage("success", "2FA enabled successfully");
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!twoFactorCode) {
      showMessage("error", "Please enter your 2FA code to disable");
      return;
    }
    setLoading(true);
    try {
      await apiRequest("/api/users/2fa/disable", {
        method: "POST",
        body: { code: twoFactorCode },
        token: localStorage.getItem("openos_access")
      });
      setTwoFactorEnabled(false);
      setTwoFactorCode("");
      setUser({ ...user, twoFactorEnabled: false });
      showMessage("success", "2FA disabled successfully");
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText(twoFactorSecret);
    showMessage("success", "Secret key copied to clipboard");
  };

  const handleConnectOAuth = (provider) => {
    window.location.href = `/api/oauth/${provider}?connect=true`;
  };

  const handleDisconnectOAuth = (provider) => {
    executeWith2FA('disconnectOAuth', { provider });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== "DELETE ACCOUNT") {
      setDeleteError('Please type "DELETE ACCOUNT" to confirm');
      return;
    }
    executeWith2FA('deleteAccount');
  };

  const tabs = [
    { id: "account", label: "Manage Account", icon: <FaUserEdit size={16} /> },
    { id: "security", label: "Security", icon: <FaLock size={16} /> },
    { id: "delete", label: "Delete Account", icon: <FaTrash size={16} /> },
    { id: "preferences", label: "Preferences", icon: <FaTachometerAlt size={16} /> }
  ];

  const connectedProviders = [];
  if (user?.oauthProvider) {
    connectedProviders.push(user.oauthProvider);
  }

  const availableProviders = ["google", "github", "discord"].filter(p => !connectedProviders.includes(p));

  return (
    <div style={{ padding: isMobile ? "16px" : "24px" }}>
      <h1 style={{ fontSize: isMobile ? 24 : 28, marginBottom: 8, color: "#ffffff" }}>Settings</h1>
      <p style={{ color: "#aeb9ca", marginBottom: 24, fontSize: isMobile ? 14 : 16 }}>Manage your account preferences</p>

      {message.text && (
        <div style={{
          padding: isMobile ? "10px 12px" : "12px 16px",
          borderRadius: 10,
          marginBottom: 20,
          background: message.type === "success" ? "rgba(139, 255, 179, 0.1)" : "rgba(255, 139, 139, 0.1)",
          border: `1px solid ${message.type === "success" ? "#8bffb3" : "#ff8b8b"}`,
          color: message.type === "success" ? "#8bffb3" : "#ff8b8b",
          fontSize: isMobile ? 13 : 14
        }}>
          {message.text}
        </div>
      )}

      {show2FAModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
          padding: 20
        }} onClick={() => {
          setShow2FAModal(false);
          setPendingAction(null);
          setPendingData(null);
        }}>
          <div style={{
            background: "#0f1620",
            border: "1px solid #2a3a55",
            borderRadius: 24,
            padding: isMobile ? "24px" : "32px",
            maxWidth: 450,
            width: "100%"
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: "#ffffff", marginBottom: 16, fontSize: isMobile ? 20 : 24 }}>Two-Factor Authentication Required</h2>
            <p style={{ color: "#aeb9ca", marginBottom: 20, fontSize: isMobile ? 13 : 14 }}>
              Please enter your 2FA code to continue.
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit 2FA code"
              value={twoFactorInput}
              onChange={(e) => setTwoFactorInput(e.target.value)}
              style={{
                width: "100%",
                padding: isMobile ? "10px" : "12px",
                borderRadius: 10,
                border: "1px solid #2a3a55",
                background: "rgba(11, 18, 32, 0.85)",
                color: "#e8e8e8",
                marginBottom: 20,
                fontSize: isMobile ? 14 : 16,
                textAlign: "center"
              }}
            />
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => {
                  setShow2FAModal(false);
                  setPendingAction(null);
                  setPendingData(null);
                }}
                style={{
                  flex: 1,
                  padding: isMobile ? "10px" : "12px",
                  background: "#22324a",
                  border: "none",
                  borderRadius: 10,
                  color: "#cdd6e5",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handle2FASubmit}
                disabled={!twoFactorInput}
                style={{
                  flex: 1,
                  padding: isMobile ? "10px" : "12px",
                  background: twoFactorInput ? "#1f6feb" : "#2a3a55",
                  border: "none",
                  borderRadius: 10,
                  color: "white",
                  cursor: twoFactorInput ? "pointer" : "not-allowed",
                  fontWeight: 600
                }}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: isMobile ? 16 : 20, flexDirection: isMobile ? "column" : "row" }}>
        <div style={{ width: isMobile ? "100%" : 240, flexShrink: 0, overflowX: "auto" }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: 4 }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: isMobile ? "auto" : "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: isMobile ? "10px 16px" : "12px 16px",
                  background: activeTab === tab.id ? "rgba(31, 111, 235, 0.15)" : "transparent",
                  border: "none",
                  borderLeft: !isMobile && activeTab === tab.id ? "3px solid #1f6feb" : "3px solid transparent",
                  borderBottom: isMobile && activeTab === tab.id ? "2px solid #1f6feb" : "2px solid transparent",
                  color: activeTab === tab.id ? "#1f6feb" : "#cdd6e5",
                  cursor: "pointer",
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  textAlign: "left",
                  borderRadius: isMobile ? 8 : 8,
                  whiteSpace: "nowrap"
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {activeTab === "account" && (
            <div style={{
              background: "rgba(17, 24, 38, 0.6)",
              border: "1px solid #2a3a55",
              borderRadius: 16,
              padding: isMobile ? "20px" : "24px"
            }}>
              <h2 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 20, color: "#ffffff" }}>Profile Picture</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30, flexDirection: isMobile ? "column" : "row", textAlign: isMobile ? "center" : "left" }}>
                <div style={{
                  width: isMobile ? 80 : 100,
                  height: isMobile ? 80 : 100,
                  borderRadius: "50%",
                  background: "#22324a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}>
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <FaUserEdit size={isMobile ? 40 : 50} color="#aeb9ca" />
                  )}
                </div>
                <div>
                  <label style={{
                    display: "inline-block",
                    background: "#1f6feb",
                    padding: isMobile ? "6px 12px" : "8px 16px",
                    borderRadius: 8,
                    color: "white",
                    cursor: "pointer",
                    fontSize: isMobile ? 12 : 14,
                    marginRight: 12,
                    marginBottom: isMobile ? 8 : 0
                  }}>
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handleProfilePictureUpload} style={{ display: "none" }} />
                  </label>
                  {profilePreview && (
                    <button
                      onClick={handleRemoveProfilePicture}
                      style={{
                        background: "#ff8b8b20",
                        border: "1px solid #ff8b8b",
                        padding: isMobile ? "6px 12px" : "8px 16px",
                        borderRadius: 8,
                        color: "#ff8b8b",
                        cursor: "pointer",
                        fontSize: isMobile ? 12 : 14
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <h2 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 20, color: "#ffffff" }}>Change Email</h2>
              <form onSubmit={handleEmailChange} style={{ marginBottom: 30 }}>
                <label style={{ display: "block", marginBottom: 8, color: "#b9c2cf", fontSize: isMobile ? 12 : 14 }}>New Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 12px" : "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #2a3a55",
                    background: "rgba(11, 18, 32, 0.85)",
                    color: "#e8e8e8",
                    marginBottom: 16,
                    fontSize: isMobile ? 13 : 14
                  }}
                  required
                />
                <label style={{ display: "block", marginBottom: 8, color: "#b9c2cf", fontSize: isMobile ? 12 : 14 }}>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 12px" : "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #2a3a55",
                    background: "rgba(11, 18, 32, 0.85)",
                    color: "#e8e8e8",
                    marginBottom: 16,
                    fontSize: isMobile ? 13 : 14
                  }}
                  required
                />
                <button type="submit" disabled={loading} style={{
                  background: "#1f6feb",
                  border: "none",
                  padding: isMobile ? "8px 16px" : "10px 20px",
                  borderRadius: 8,
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: isMobile ? 13 : 14,
                  width: isMobile ? "100%" : "auto"
                }}>
                  Update Email
                </button>
              </form>

              <h2 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 20, color: "#ffffff", display: "flex", alignItems: "center", gap: 8 }}>
                Account Connections
              </h2>
              
              {connectedProviders.map(provider => (
                <div key={provider} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: isMobile ? "12px" : "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: 12,
                  marginBottom: 12,
                  flexWrap: "wrap",
                  gap: 10
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {provider === "google" && <FcGoogle size={isMobile ? 20 : 24} />}
                    {provider === "github" && <FaGithub size={isMobile ? 20 : 24} color="#ffffff" />}
                    {provider === "discord" && <FaDiscord size={isMobile ? 20 : 24} color="#5865f2" />}
                    <span style={{ color: "#ffffff", textTransform: "capitalize", fontSize: isMobile ? 13 : 14 }}>{provider}</span>
                    <span style={{
                      background: "#8bffb320",
                      padding: "2px 8px",
                      borderRadius: 20,
                      fontSize: isMobile ? 9 : 11,
                      color: "#8bffb3"
                    }}>
                      Connected
                    </span>
                  </div>
                  <button
                    onClick={() => handleDisconnectOAuth(provider)}
                    style={{
                      background: "transparent",
                      border: "1px solid #ff8b8b",
                      padding: isMobile ? "5px 10px" : "6px 12px",
                      borderRadius: 6,
                      color: "#ff8b8b",
                      cursor: "pointer",
                      fontSize: isMobile ? 11 : 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    <FaUnlink size={12} />
                    Disconnect
                  </button>
                </div>
              ))}

              {availableProviders.length > 0 && (
                <>
                  <h2 style={{ fontSize: isMobile ? 16 : 18, marginTop: 24, marginBottom: 16, color: "#ffffff" }}>Connect Additional Accounts</h2>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
                    {availableProviders.map(provider => (
                      <button
                        key={provider}
                        onClick={() => handleConnectOAuth(provider)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          background: "#22324a",
                          border: "none",
                          padding: isMobile ? "8px 16px" : "10px 20px",
                          borderRadius: 10,
                          color: "white",
                          cursor: "pointer",
                          fontSize: isMobile ? 12 : 14,
                          fontWeight: 500
                        }}
                      >
                        {provider === "google" && <FcGoogle size={isMobile ? 16 : 18} />}
                        {provider === "github" && <FaGithub size={isMobile ? 16 : 18} />}
                        {provider === "discord" && <FaDiscord size={isMobile ? 16 : 18} />}
                        Connect {provider.charAt(0).toUpperCase() + provider.slice(1)}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {connectedProviders.length === 0 && availableProviders.length === 0 && (
                <p style={{ color: "#aeb9ca", textAlign: "center", padding: 40, fontSize: isMobile ? 13 : 14 }}>
                  No OAuth connections available
                </p>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div style={{
              background: "rgba(17, 24, 38, 0.6)",
              border: "1px solid #2a3a55",
              borderRadius: 16,
              padding: isMobile ? "20px" : "24px"
            }}>
              <h2 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 20, color: "#ffffff" }}>Change Password</h2>
              <form onSubmit={handlePasswordChange} style={{ marginBottom: 40 }}>
                <label style={{ display: "block", marginBottom: 8, color: "#b9c2cf", fontSize: isMobile ? 12 : 14 }}>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 12px" : "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #2a3a55",
                    background: "rgba(11, 18, 32, 0.85)",
                    color: "#e8e8e8",
                    marginBottom: 16,
                    fontSize: isMobile ? 13 : 14
                  }}
                  required
                />
                <label style={{ display: "block", marginBottom: 8, color: "#b9c2cf", fontSize: isMobile ? 12 : 14 }}>New Password (min. 8 characters)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 12px" : "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #2a3a55",
                    background: "rgba(11, 18, 32, 0.85)",
                    color: "#e8e8e8",
                    marginBottom: 16,
                    fontSize: isMobile ? 13 : 14
                  }}
                  required
                />
                <label style={{ display: "block", marginBottom: 8, color: "#b9c2cf", fontSize: isMobile ? 12 : 14 }}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 12px" : "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #2a3a55",
                    background: "rgba(11, 18, 32, 0.85)",
                    color: "#e8e8e8",
                    marginBottom: 16,
                    fontSize: isMobile ? 13 : 14
                  }}
                  required
                />
                <button type="submit" disabled={loading} style={{
                  background: "#1f6feb",
                  border: "none",
                  padding: isMobile ? "8px 16px" : "10px 20px",
                  borderRadius: 8,
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: isMobile ? 13 : 14,
                  width: isMobile ? "100%" : "auto"
                }}>
                  Update Password
                </button>
              </form>

              <h2 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 20, color: "#ffffff", display: "flex", alignItems: "center", gap: 8 }}>
                Two-Factor Authentication
              </h2>
              
              {!twoFactorEnabled ? (
                <div>
                  {!twoFactorSecret ? (
                    <button
                      onClick={handleEnable2FA}
                      disabled={loading}
                      style={{
                        background: "#1f6feb",
                        border: "none",
                        padding: isMobile ? "8px 16px" : "10px 20px",
                        borderRadius: 8,
                        color: "white",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: isMobile ? 13 : 14,
                        width: isMobile ? "100%" : "auto"
                      }}
                    >
                      Enable 2FA
                    </button>
                  ) : (
                    <div>
                      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                        <button
                          onClick={() => setShowSecretKey(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: !showSecretKey ? "#1f6feb" : "#22324a",
                            border: "none",
                            padding: isMobile ? "6px 12px" : "8px 16px",
                            borderRadius: 8,
                            color: "white",
                            cursor: "pointer",
                            fontSize: isMobile ? 12 : 14
                          }}
                        >
                          <FaQrcode size={16} />
                          QR Code
                        </button>
                        <button
                          onClick={() => setShowSecretKey(true)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: showSecretKey ? "#1f6feb" : "#22324a",
                            border: "none",
                            padding: isMobile ? "6px 12px" : "8px 16px",
                            borderRadius: 8,
                            color: "white",
                            cursor: "pointer",
                            fontSize: isMobile ? 12 : 14
                          }}
                        >
                          <FaKey size={16} />
                          Secret Key
                        </button>
                      </div>

                      {!showSecretKey ? (
                        <>
                          <p style={{ color: "#aeb9ca", marginBottom: 16, fontSize: isMobile ? 12 : 14 }}>Scan this QR code with your authenticator app</p>
                          {twoFactorQR && <img src={twoFactorQR} alt="2FA QR Code" style={{ marginBottom: 16, background: "white", padding: 10, borderRadius: 8, maxWidth: "100%" }} />}
                        </>
                      ) : (
                        <div style={{
                          background: "rgba(11, 18, 32, 0.85)",
                          border: "1px solid #2a3a55",
                          borderRadius: 12,
                          padding: 16,
                          marginBottom: 16
                        }}>
                          <p style={{ color: "#aeb9ca", marginBottom: 12, fontSize: isMobile ? 12 : 14 }}>Enter this secret key manually in your authenticator app:</p>
                          <div style={{
                            background: "#0b0f14",
                            padding: isMobile ? "10px" : "12px",
                            borderRadius: 8,
                            fontFamily: "monospace",
                            fontSize: isMobile ? 11 : 14,
                            color: "#8bffb3",
                            wordBreak: "break-all",
                            marginBottom: 12
                          }}>
                            {twoFactorSecret}
                          </div>
                          <button
                            onClick={copySecretKey}
                            style={{
                              background: "#22324a",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: 6,
                              color: "white",
                              cursor: "pointer",
                              fontSize: isMobile ? 11 : 12
                            }}
                          >
                            Copy Secret Key
                          </button>
                        </div>
                      )}

                      <input
                        type="text"
                        placeholder="Enter 6-digit verification code"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                        style={{
                          width: "100%",
                          padding: isMobile ? "8px 12px" : "10px 12px",
                          borderRadius: 10,
                          border: "1px solid #2a3a55",
                          background: "rgba(11, 18, 32, 0.85)",
                          color: "#e8e8e8",
                          marginBottom: 16,
                          fontSize: isMobile ? 13 : 14
                        }}
                      />
                      <button
                        onClick={handleVerify2FA}
                        disabled={loading}
                        style={{
                          background: "#1f6feb",
                          border: "none",
                          padding: isMobile ? "8px 16px" : "10px 20px",
                          borderRadius: 8,
                          color: "white",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: isMobile ? 13 : 14,
                          width: isMobile ? "100%" : "auto"
                        }}
                      >
                        Verify and Enable
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p style={{ color: "#8bffb3", marginBottom: 16, fontSize: isMobile ? 13 : 14 }}>✓ Two-factor authentication is enabled</p>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 8, color: "#b9c2cf", fontSize: isMobile ? 12 : 14 }}>Enter 2FA code to disable</label>
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      style={{
                        width: "100%",
                        padding: isMobile ? "8px 12px" : "10px 12px",
                        borderRadius: 10,
                        border: "1px solid #2a3a55",
                        background: "rgba(11, 18, 32, 0.85)",
                        color: "#e8e8e8",
                        marginBottom: 16,
                        fontSize: isMobile ? 13 : 14
                      }}
                    />
                  </div>
                  <button
                    onClick={handleDisable2FA}
                    disabled={loading || !twoFactorCode}
                    style={{
                      background: "#ff8b8b20",
                      border: "1px solid #ff8b8b",
                      padding: isMobile ? "8px 16px" : "10px 20px",
                      borderRadius: 8,
                      color: "#ff8b8b",
                      cursor: twoFactorCode ? "pointer" : "not-allowed",
                      fontWeight: 600,
                      opacity: twoFactorCode ? 1 : 0.5,
                      fontSize: isMobile ? 13 : 14,
                      width: isMobile ? "100%" : "auto"
                    }}
                  >
                    Disable 2FA
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "delete" && (
            <div style={{
              background: "rgba(17, 24, 38, 0.6)",
              border: "1px solid #ff8b8b",
              borderRadius: 16,
              padding: isMobile ? "20px" : "24px"
            }}>
              <h2 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 16, color: "#ff8b8b" }}>Delete Account</h2>
              <p style={{ color: "#aeb9ca", marginBottom: 16, fontSize: isMobile ? 13 : 14 }}>
                This action is permanent and cannot be undone. All your data will be permanently deleted.
              </p>
              {user?.twoFactorEnabled && (
                <p style={{ color: "#ffb86b", marginBottom: 16, fontSize: isMobile ? 12 : 14 }}>
                  ⚠️ You will need to provide your 2FA code to delete your account.
                </p>
              )}
              <p style={{ color: "#ffb86b", marginBottom: 20, fontSize: isMobile ? 12 : 14 }}>
                Type <strong>DELETE ACCOUNT</strong> below to confirm.
              </p>
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="DELETE ACCOUNT"
                style={{
                  width: "100%",
                  padding: isMobile ? "10px" : "12px",
                  borderRadius: 10,
                  border: "1px solid #ff8b8b",
                  background: "rgba(11, 18, 32, 0.85)",
                  color: "#e8e8e8",
                  marginBottom: 16,
                  fontFamily: "monospace",
                  fontSize: isMobile ? 13 : 14
                }}
              />
              {deleteError && <p style={{ color: "#ff8b8b", fontSize: isMobile ? 12 : 14, marginBottom: 16 }}>{deleteError}</p>}
              <button
                onClick={handleDeleteAccount}
                disabled={loading || deleteConfirm !== "DELETE ACCOUNT"}
                style={{
                  width: "100%",
                  background: "#ff8b8b",
                  border: "none",
                  padding: isMobile ? "10px" : "12px",
                  borderRadius: 10,
                  color: "white",
                  cursor: deleteConfirm === "DELETE ACCOUNT" ? "pointer" : "not-allowed",
                  fontWeight: 600,
                  opacity: deleteConfirm === "DELETE ACCOUNT" ? 1 : 0.5,
                  fontSize: isMobile ? 13 : 14
                }}
              >
                Permanently Delete Account
              </button>
            </div>
          )}

          {activeTab === "preferences" && (
            <div style={{
              background: "rgba(17, 24, 38, 0.6)",
              border: "1px solid #2a3a55",
              borderRadius: 16,
              padding: isMobile ? "20px" : "24px"
            }}>
              <h2 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 20, color: "#ffffff", display: "flex", alignItems: "center", gap: 8 }}>
                Appearance Preferences
              </h2>

              <div style={{ marginBottom: 30 }}>
                <label style={{ display: "block", marginBottom: 12, color: "#b9c2cf", fontSize: isMobile ? 12 : 14, fontWeight: 500 }}>
                  Theme Mode
                </label>
                <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row" }}>
                  <button
                    onClick={() => setPrefTheme("light")}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: isMobile ? "10px" : "12px",
                      background: prefTheme === "light" ? "#1f6feb" : "#22324a",
                      border: prefTheme === "light" ? "1px solid #1f6feb" : "1px solid #2a3a55",
                      borderRadius: 10,
                      color: "white",
                      cursor: "pointer",
                      fontWeight: prefTheme === "light" ? 600 : 400,
                      fontSize: isMobile ? 13 : 14
                    }}
                  >
                    <FaSun size={16} />
                    Light Mode
                  </button>
                  <button
                    onClick={() => setPrefTheme("dark")}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: isMobile ? "10px" : "12px",
                      background: prefTheme === "dark" ? "#1f6feb" : "#22324a",
                      border: prefTheme === "dark" ? "1px solid #1f6feb" : "1px solid #2a3a55",
                      borderRadius: 10,
                      color: "white",
                      cursor: "pointer",
                      fontWeight: prefTheme === "dark" ? 600 : 400,
                      fontSize: isMobile ? 13 : 14
                    }}
                  >
                    <FaMoon size={16} />
                    Dark Mode
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 30 }}>
                <label style={{ display: "block", marginBottom: 12, color: "#b9c2cf", fontSize: isMobile ? 12 : 14, fontWeight: 500 }}>
                  Background Blur
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
                  {blurOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPrefBlur(option.value)}
                      style={{
                        padding: isMobile ? "6px 12px" : "8px 16px",
                        background: prefBlur === option.value ? "#1f6feb" : "#22324a",
                        border: prefBlur === option.value ? "1px solid #1f6feb" : "1px solid #2a3a55",
                        borderRadius: 8,
                        color: "white",
                        cursor: "pointer",
                        fontSize: isMobile ? 11 : 13,
                        fontWeight: prefBlur === option.value ? 600 : 400
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={savePreferences}
                disabled={savingPrefs}
                style={{
                  width: "100%",
                  padding: isMobile ? "10px" : "12px",
                  background: savingPrefs ? "#2a3a55" : "#1f6feb",
                  border: "none",
                  borderRadius: 10,
                  color: "white",
                  cursor: savingPrefs ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  opacity: savingPrefs ? 0.7 : 1,
                  fontSize: isMobile ? 13 : 14
                }}
              >
                {savingPrefs ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}