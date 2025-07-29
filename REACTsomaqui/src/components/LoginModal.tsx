import React from "react";
import Login from "../pages/Login";

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToRegister }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <Login />
      <p>
        ¿No tienes cuenta?{" "}
        <button onClick={onSwitchToRegister} style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}>
          Regístrate aquí
        </button>
      </p>
    </div>
  </div>
);

export default LoginModal;