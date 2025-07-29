import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Configura tu Firebase aquí
const firebaseConfig = {
  apiKey: "AIzaSyDoMMmcbrpDhtLuKIdxCxIoB7cIcEB4So8",
  authDomain: "somaqui-23447.firebaseapp.com",
  databaseURL: "https://somaqui-23447-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "somaqui-23447",
  storageBucket: "somaqui-23447.firebasestorage.app",
  messagingSenderId: "364554008068",
  appId: "1:364554008068:web:4616e6e578611605d72751",
  measurementId: "G-4BQ9G568KQ"
};
initializeApp(firebaseConfig);

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirige o muestra mensaje de éxito aquí
        } catch (err: any) {
            setError(err.message);
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
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
        </div>
    );
};

export default Login;