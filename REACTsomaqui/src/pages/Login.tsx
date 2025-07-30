import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: () => void;
  switchToRegister: () => void;
  onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, switchToRegister, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal-overlay"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9999,
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="login-form"
        style={{
          backgroundColor: "white",
          padding: "3rem 2.5rem",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "90%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          position: "relative",
        }}
        onClick={handleModalClick}
      >
        {/* Volver al inicio */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            background: "none",
            border: "none",
            color: "#39e4c9",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          ← Volver al inicio
        </button>

        {/* Cerrar */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#888",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        )}

        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </div>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          ¿No tienes cuenta?{" "}
          <button
            onClick={switchToRegister}
            style={{
              background: "none",
              border: "none",
              color: "#39e4c9",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "1rem",
            }}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
