import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import '../styles/home.css';

const Home: React.FC = () => {
  const sliderImages = [
    { src: '/images/acompanar.jpg', alt: 'Comunidad de ayuda SomAqui' },
    { src: '/images/levantar.jpg', alt: 'Situaciones de emergencia' },
    { src: '/images/sillaruedas.jpg', alt: 'Asistencia y apoyo' },
  ];

  const emergencyTypeImages = [
    { icon: '🏥', alt: 'Primeros Auxilios', title: 'Primeros Auxilios' },
    { icon: '⛑️', alt: 'Rescate', title: 'Rescate' },
    { icon: '📦', alt: 'Logística', title: 'Logística' },
    { icon: '📢', alt: 'Comunicación', title: 'Comunicación' },
    { icon: '🚗', alt: 'Transporte', title: 'Transporte' },
    { icon: '🔨', alt: 'Construcción', title: 'Construcción' },
    { icon: '🍳', alt: 'Cocina', title: 'Cocina' },
    { icon: '👥', alt: 'Cuidado de Personas', title: 'Cuidado de Personas' },
  ];

  return (
    <main>
      {/* Sección hero combinado */}
      <section className="hero-combinado">
        <div className="contenido-hero">
          <h1><span className="destacado">Emergencias invisibles.</span> <span className="respuestas-humanas">Respuestas humanas.</span></h1>
          <p className="frase-impacto">
            No todas las urgencias se ven: una crisis emocional, una persona mayor sola, la falta de alimentos...
          </p>
          <p className="frase-destacada">
            <span className="resaltado">Para eso estamos aquí.</span>
          </p>
          <p className="frase-info">
            <strong>SomAqui.cat</strong> es una plataforma comunitaria que conecta a quienes <u>necesitan ayuda</u> con personas que <u>pueden ofrecerla</u>, en situaciones donde el 112 no llega.
          </p>
          <div className="botones-accion">
            <Link to="/formulario-ayuda" className="btn btn-ayuda">🆘 Necesito ayuda</Link>
            <Link to="/voluntario" className="btn btn-voluntario">🤝 Quiero ayudar</Link>
          </div>
        </div>
      </section>


  

      {/* Gallery compacto */}
      <Slider images={sliderImages} compact={true} />

      {/* Sección de Apoyo y Donaciones */}
      <section className="apoyo-donaciones">
        <div className="apoyo-content">
          <div className="apoyo-text">
            <h2>Tu apoyo <span className="highlight">salva vidas</span></h2>
            <p>
              Cada donación nos permite mantener una red de respuesta rápida ante emergencias, 
              entrenar voluntarios especializados y proporcionar recursos esenciales cuando 
              más se necesitan.
            </p>
            
            <div className="impacto-stats">
              <div className="stat">
                <span className="stat-number">1.247</span>
                <span className="stat-label">Personas ayudadas</span>
              </div>
              <div className="stat">
                <span className="stat-number">89</span>
                <span className="stat-label">Emergencias atendidas</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Disponibilidad</span>
              </div>
            </div>

            <div className="donacion-actions">
              <Link to="/quiero-donar" className="btn-donar-primary">
                <i className="fas fa-heart"></i>
                Quiero Donar
              </Link>
              <Link to="/voluntario" className="btn-voluntario-secondary">
                <i className="fas fa-hands-helping"></i>
                Ser Voluntario
              </Link>
            </div>
          </div>

          <div className="apoyo-visual">
            <div className="apoyo-card">
              <div className="apoyo-icon">💰</div>
              <h3>Donación Económica</h3>
              <p>Contribuye económicamente para mantener nuestros recursos de emergencia y entrenar voluntarios.</p>
            </div>
            
            <div className="apoyo-card">
              <div className="apoyo-icon">⏰</div>
              <h3>Donación de Tiempo</h3>
              <p>Ofrece tu tiempo como voluntario y participa directamente en operaciones de rescate y apoyo.</p>
            </div>
            
            <div className="apoyo-card">
              <div className="apoyo-icon">🎯</div>
              <h3>Donación de Habilidades</h3>
              <p>Comparte tus conocimientos especializados en primeros auxilios, rescate o coordinación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="features">
        <div className="feature">
          <i className="fa fa-heart" aria-hidden="true"></i>
          <h3>Ayuda inmediata</h3>
          <p>
            Conecta al instante con personas de tu zona dispuestas a ayudar 
            en situaciones de emergencia.
          </p>
          <Link to="/formulario-ayuda">Solicitar ayuda</Link>
        </div>
        
        <div className="feature">
          <i className="fa fa-users" aria-hidden="true"></i>
          <h3>Red de voluntarios</h3>
          <p>
            Únete a una comunidad solidaria y marca la diferencia 
            ayudando a quienes más lo necesitan.
          </p>
          <Link to="/voluntario">Ser voluntario</Link>
        </div>
        
        <div className="feature">
          <i className="fa fa-map-marker" aria-hidden="true"></i>
          <h3>Ayuda local</h3>
          <p>
            Encuentra y ofrece ayuda en tu zona utilizando nuestra 
            geolocalización inteligente.
          </p>
          <Link to="/contacto">Más información</Link>
        </div>

        <div className="feature">
          <i className="fa fa-shield" aria-hidden="true"></i>
          <h3>Ayuda segura</h3>
          <p>
            Plataforma verificada con medidas de seguridad para 
            proteger tanto a solicitantes como a voluntarios.
          </p>
          <Link to="/preguntas-frecuentes">Conocer más</Link>
        </div>
      </section>

      {/* Teoría del cambio */}
      <section className="teoria-cambio">
        <h2>Teoría del Cambio</h2>
        <p className="subtitulo">
          Nuestro objetivo es amplificar 20 millones de voces ciudadanas antes de 2026.
¿Cómo lo lograremos? A través de esta hipótesis en tres partes:
        </p>
        
        <div className="contenido-cambio">
          <div className="grafico-cambio">
            <img src="/images/Globo.png" alt="Proceso de ayuda comunitaria" />
          </div>
          
          <div className="pasos-cambio">
            <div className="paso">
              <img src="/images/Icono1.png" alt="Paso 1" />
              <div>
                <strong>Parte 1: Tecnología</strong>
                <p>
                  Proporcionamos herramientas digitales y experiencia 
                  a organizaciones alineadas con nuestra misión.
                </p>
              </div>
            </div>
            
            <div className="paso">
              <img src="/images/Icono2.png" alt="Paso 2" />
              <div>
                <strong>Parte 2: Colaboradores</strong>
                <p>
                  Aliados utilizan nuestra plataforma para 
                  recopilar datos y elevar las voces ciudadanas.
                </p>
              </div>
            </div>
            
            <div className="paso">
              <img src="/images/Icono3.png" alt="Paso 3" />
              <div>
                <strong>Parte 3: Impacto Social</strong>
                <p>
                  A medida que las voces se amplifican, se fortalece 
                  la efectividad de las organizaciones y el cambio social.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de ayuda que puedes ofrecer */}
      <section className="emergency-types">
        <h2>🤝 ¿En qué puedes ayudar?</h2>
        <div className="emergency-grid">
          {emergencyTypeImages.map((emergency, index) => (
            <div key={index} className="emergency-card">
              <div className="emergency-icon">{emergency.icon}</div>
              <h3>{emergency.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
