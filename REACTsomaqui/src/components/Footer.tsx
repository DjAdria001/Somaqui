import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onTermsClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onTermsClick }) => {
  return (
    <footer>
      <p>
        <button 
          onClick={onTermsClick} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            textDecoration: 'underline', 
            cursor: 'pointer',
            margin: '0 0.5rem'
          }}
        >
          Términos y condiciones
        </button>
        |
        <Link to="/contacto">Contacto</Link>
        |
        <Link to="/">Inicio</Link>
      </p>
      <small>© 2025 SomAqui.cat – Todos los derechos reservados.</small>
    </footer>
  );
};

export default Footer;
