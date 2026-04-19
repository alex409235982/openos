import React, { createContext, useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Distros from "./pages/Distros.jsx";
import Premium from "./pages/Premium.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OAuthCallback from "./pages/OAuthCallback.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  
  const [blurLevel, setBlurLevel] = useState(() => {
    return parseInt(localStorage.getItem("blurLevel")) || 2;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-blur", blurLevel);
    localStorage.setItem("blurLevel", blurLevel);
  }, [blurLevel]);

  const value = {
    theme,
    setTheme,
    blurLevel,
    setBlurLevel
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function AppContent() {
  return (
    <div className="appShell">
      <div className="bg"></div>
      <Routes>
        <Route path="/" element={
          <>
            <div className="container pageContent">
              <Nav />
              <Home />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/about" element={
          <>
            <div className="container pageContent">
              <Nav />
              <About />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/distros" element={
          <>
            <div className="container pageContent">
              <Nav />
              <Distros />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/premium" element={
          <>
            <div className="container pageContent">
              <Nav />
              <Premium />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/terms" element={
          <>
            <div className="container pageContent">
              <Nav />
              <Terms />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/privacy" element={
          <>
            <div className="container pageContent">
              <Nav />
              <Privacy />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/login" element={
          <>
            <div className="container pageContent">
              <Nav />
              <Login />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/signup" element={
          <>
            <div className="container pageContent">
              <Nav />
              <Signup />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/forgot" element={
          <>
            <div className="container pageContent">
              <Nav />
              <ForgotPassword />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/reset" element={
          <>
            <div className="container pageContent">
              <Nav />
              <ResetPassword />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route path="/oauth-callback" element={
          <>
            <div className="container pageContent">
              <Nav />
              <OAuthCallback />
            </div>
            <div className="container">
              <Footer />
            </div>
          </>
        } />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}