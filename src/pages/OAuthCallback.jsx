import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      navigate("/login", { state: { error: "OAuth login failed" } });
      return;
    }

    if (token) {
      localStorage.setItem("openos_access", token);
      window.location.href = "/";
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Completing login</h2>
        <p>Please wait while we redirect you.</p>
      </div>
    </div>
  );
}