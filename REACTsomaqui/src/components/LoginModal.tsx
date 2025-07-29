import React from "react";
import Login from "../pages/Login";

interface LoginModalProps {
  onClose: () => void;
  switchToRegister: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, switchToRegister, onLoginSuccess }) => (
  <div className="modal-overlay" onClick={onClose} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <Login onLoginSuccess={onLoginSuccess} switchToRegister={switchToRegister} />
    </div>
  </div>
);

export default LoginModal;
