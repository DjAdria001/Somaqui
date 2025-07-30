import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoImage from '../assets/LogoSF.png';
import { useAuth } from "../context/AuthContext";
import UserInfo from "./UserInfo";

interface HeaderProps {
  onLoginClick?: () => void; // en caso de que quieras abrir modal aún
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Hook para detectar si estamos en móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setShowUserDropdown(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Toggle desplegable usuario o login
  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };

  // Cerrar desplegables al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        userDropdownRef.current && 
        !userDropdownRef.current.contains(target)
      ) {
        setShowUserDropdown(false);
      }
    }

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  return (
    <header className="site-header">
      <button 
        className="menu-toggle" 
        aria-controls="main-menu" 
        aria-expanded={isMenuOpen}
        aria-label="Abrir menú de navegación"
        onClick={toggleMenu}
      >
        <i className="fa fa-bars"></i>
      </button>

      <Link to="/" className="logo" aria-label="Ir a la página principal de SomAqui.cat">
        <img src={LogoImage} alt="Logo SomAqui.cat" />
        SomAqui.cat
      </Link>

      <div className="header-top">
        <div className="user-dropdown-container" ref={userDropdownRef} style={{ position: "relative" }}>
          <button 
            id="btn-login" 
            aria-label={user ? "Perfil de usuario" : "Iniciar sesión"} 
            onClick={toggleUserDropdown}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="28" height="28" viewBox="0 0 24 24">
              <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 14c-4.418 0-8 3.134-8 7h2c0-2.761 2.686-5 6-5s6 2.239 6 5h2c0-3.866-3.582-7-8-7z" />
            </svg>
          </button>

          {showUserDropdown && (
            <div 
              className="user-dropdown"
              style={{
                position: "absolute",
                top: "calc(100% + 5px)",
                right: isMobile ? "auto" : 0,
                left: isMobile ? "50%" : "auto",
                transform: isMobile ? "translateX(-50%)" : "none",
                backgroundColor: "#e0fbf9",
                border: "1px solid #39e4c9",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                width: isMobile ? "240px" : "260px",
                zIndex: 1000
              }}
            >
              {user ? (
                <UserInfo />
              ) : (
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    if (onLoginClick) onLoginClick();
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#39e4c9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <nav className="main-nav" role="navigation" aria-label="Menú principal">
        <ul className={`nav-list ${isMenuOpen ? 'show' : ''}`} id="main-menu">
          {/* aquí va tu nav list igual */}
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Home
            </Link>
          </li>
          {/* Resto de links... */}
          <li className="nav-item">
            <Link 
              to="/ayuda" 
              className={`nav-link ${isActive('/ayuda') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Necesito Ayuda
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/voluntario" 
              className={`nav-link ${isActive('/voluntario') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Quiero ser voluntario
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/quiero-donar" 
              className={`nav-link ${isActive('/quiero-donar') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Quiero Donar
            </Link>
          </li>
          <li 
            className={`nav-item dropdown ${isDropdownOpen ? 'expanded' : ''}`} 
            tabIndex={0}
          >
            <button 
              className="nav-link" 
              aria-haspopup="true" 
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              ¿Quiénes Somos? <i className="fa fa-caret-down" aria-hidden="true"></i>
            </button>
            <ul className="dropdown-menu" aria-label="Submenú Quienes Somos">
              <li>
                <Link to="/equipo" className="dropdown-link" onClick={closeMenu}>
                  Equipo
                </Link>
              </li>
              <li>
                <Link to="/mision-vision" className="dropdown-link" onClick={closeMenu}>
                  Misión y Visión
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="dropdown-link" onClick={closeMenu}>
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="dropdown-link" onClick={closeMenu}>
                  Contacto
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
