import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface LoginProps {
  onLoginSuccess: () => void;
  switchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, switchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      setError(null);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
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
  );
};

export default Login;
