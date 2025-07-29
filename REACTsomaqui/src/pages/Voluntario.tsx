import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Login from '../pages/Login';
import Register from '../components/RegisterModal';
import '../styles/voluntario-new.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
//<<<<<<< HEAD
import { Link } from 'react-router-dom'; // Add this at the top of the file
import '../styles/global.css'; // Import global styles

import { useNavigate } from 'react-router-dom';


interface Emergency {
  id: string;
  nombre: string;
  ubicacion: string;
  desc_ubic: string;
  fecha_envio: string;
  descripcion: string;
  tipo: string;
  tags: string[];
  otros_detalle?: string;
  activo?: boolean;
}

const Voluntario: React.FC = () => {
  const { user } = useAuth();
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const emergenciesRef = ref(database, 'Emergencias');
    onValue(emergenciesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted: Emergency[] = Object.entries(data).map(([id, value]: any) => ({
          id,
          nombre: value.nombre || 'Anónimo',
          ubicacion: value.ubicacion || '',
          desc_ubic: value.desc_ubic || '',
          fecha_envio: value.fecha_envio || '',
          descripcion: value.descripcion || '',
          tipo: value.tipo || 'general',
          tags: value.tags || [],
          otros_detalle: value.otros_detalle || '',

          activo: value.activo !== undefined ? value.activo : true,
        }));
        setEmergencies(formatted);
      }
    });
  }, [user]);

  const filteredEmergencies = emergencies.filter(
    (emergency) => emergency.activo && (filter === '' || emergency.tipo === filter)
  );

  const handleLoginSuccess = () => {
    setShowAuthModal(false);
  };

  return (
    <>

      {showAuthModal && (
        <div
          className="modal-overlay"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: 'white',
              padding: '3rem 2.5rem',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '90%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Botón "Volver al Inicio" arriba a la izquierda */}
            <button
              onClick={() => navigate('/')}
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'none',
                border: 'none',
                color: '#39e4c9',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: 0,
              }}
              aria-label="Volver al inicio"
            >
              <span style={{ fontSize: '1.2rem' }}>←</span> Volver al inicio
            </button>

            {isLoginMode ? (
              <Login
                onLoginSuccess={handleLoginSuccess}
                switchToRegister={() => setIsLoginMode(false)}
              />
            ) : (
              <Register
                onClose={() => setShowAuthModal(false)}
                onSwitchToLogin={() => setIsLoginMode(true)}
                onRegisterSuccess={handleLoginSuccess}
              />
            )}

            <button
              style={{
                marginTop: '1rem',
                background: 'none',
                border: 'none',
                color: '#39e4c9',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '1rem',
                display: 'block',
                width: '100%',
                textAlign: 'center',
              }}
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      )}

      {user && (
        <main className="voluntario-page">
          <section className="emergencias-section">
            <div className="container">
              <h2>Emergencias Activas</h2>
              <p>Encuentra oportunidades de voluntariado cerca de ti</p>

              <div className="filtros">
                <button className={filter === '' ? 'active' : ''} onClick={() => setFilter('')}>Todas</button>
                <button className={filter === 'incendio' ? 'active' : ''} onClick={() => setFilter('incendio')}>Incendios</button>
                <button className={filter === 'inundacion' ? 'active' : ''} onClick={() => setFilter('inundacion')}>Inundaciones</button>
                <button className={filter === 'medica' ? 'active' : ''} onClick={() => setFilter('medica')}>Emergencias Médicas</button>
                <button className={filter === 'rescate' ? 'active' : ''} onClick={() => setFilter('rescate')}>Rescates</button>
              </div>

              <div className="emergencias-grid">
                {filteredEmergencies.map((emergency) => (
                  <div key={emergency.id} className="emergencia-card">
                    <div className="emergencia-header">
                      <span className={`emergencia-tipo ${emergency.tipo}`}>
                        {emergency.tipo.charAt(0).toUpperCase() + emergency.tipo.slice(1)}
                      </span>
                      <span className="emergencia-estado">Activa</span>
                    </div>
                    <h3>{emergency.nombre}</h3>
                    <p className="emergencia-ubicacion">
                      <i className="fas fa-map-marker-alt"></i>
                      {emergency.ubicacion} - {emergency.desc_ubic}
                    </p>
                    <p className="emergencia-fecha">
                      <i className="fas fa-calendar"></i>
                      {new Date(emergency.fecha_envio).toLocaleDateString('es-ES')}
                    </p>
                    <div className="emergencia-tags">
  {emergency.tags.map((tag, index) => (
    <span key={index} className="tag">
      {tag === 'Otros' && emergency.otros_detalle
        ? `Otros: ${emergency.otros_detalle}`
        : tag}
    </span>
  ))}
</div>
<Link to={`/chat/${emergency.id}`}>
  <button className="btn-ayudar">
    <i className="fas fa-hand-helping"></i>
    Quiero Ayudar
  </button>
</Link>

                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Voluntario;
