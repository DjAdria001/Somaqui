// src/components/UserInfo.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/UserInfo.css";

const UserInfo: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div
      style={{
        border: "1px solid #39e4c9",
        borderRadius: "8px",
        padding: "1rem",
        maxWidth: "280px",
        backgroundColor: "#e0fbf9",
        color: "#003333",
        fontFamily: "var(--font-primary)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        margin: "1rem auto",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0" }}>
        {user.displayName || "Usuario"}
      </h3>
      <p style={{ margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
        {user.email}
      </p>
      <button
        onClick={logout}
        style={{
          backgroundColor: "#39e4c9",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserInfo;
