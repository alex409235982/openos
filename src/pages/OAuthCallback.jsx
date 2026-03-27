import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      navigate("/login", { state: { error: "OAuth login failed" } });
      return;
    }

    if (token) {
      localStorage.setItem("openos_access", token);
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Completing login</h2>
        <p>Please wait while we redirect you.</p>
      </div>
    </div>
  );
}