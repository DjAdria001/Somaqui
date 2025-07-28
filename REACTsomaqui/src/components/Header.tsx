import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoImage from '../assets/LogoSF.png';

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.site-header')) {
        closeMenu();
      }
    };

    if (isMenuOpen || isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, isDropdownOpen]);

  return (
    <header className="site-header">
      <div className="header-top">
        <button id="btn-login" aria-label="Iniciar sesión" onClick={onLoginClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="28" height="28" viewBox="0 0 24 24">
            <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 14c-4.418 0-8 3.134-8 7h2c0-2.761 2.686-5 6-5s6 2.239 6 5h2c0-3.866-3.582-7-8-7z" />
          </svg>
        </button>
      </div>

      <Link to="/" className="logo" aria-label="Ir a la página principal de SomAqui.cat">
        <img src={LogoImage} alt="Logo SomAqui.cat" />
        SomAqui.cat
      </Link>

      <button 
        className="menu-toggle" 
        aria-controls="main-menu" 
        aria-expanded={isMenuOpen}
        aria-label="Abrir menú de navegación"
        onClick={toggleMenu}
      >
        <i className="fa fa-bars"></i>
      </button>

      <nav className="main-nav" role="navigation" aria-label="Menú principal">
        <ul className={`nav-list ${isMenuOpen ? 'show' : ''}`} id="main-menu">
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
              onClick={toggleDropdown}
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
