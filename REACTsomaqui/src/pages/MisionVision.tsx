import React from 'react';
import '../styles/mision-vision.css';

const MisionVision: React.FC = () => {
  return (
    <main className="mision-vision-page">
      {/* Header Section */}
      <section className="mv-header">
        <div className="container">
          <h1>Misión y Visión</h1>
          <p className="subtitle">
            Descubre los principios que guían nuestro trabajo y el futuro que queremos construir juntos.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="content-text">
              <h2>Nuestra Misión</h2>
              <p>
                Facilitar la conexión inmediata entre personas que necesitan ayuda y voluntarios 
                dispuestos a brindarla durante situaciones de emergencia, creando una red de 
                solidaridad que fortalezca la capacidad de respuesta comunitaria en Catalunya.
              </p>
              <div className="mission-points">
                <div className="point">
                  <div className="point-icon">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <div className="point-text">
                    <h3>Conectar Comunidades</h3>
                    <p>Unimos a personas que necesitan ayuda con voluntarios capacitados y disponibles.</p>
                  </div>
                </div>
                
                <div className="point">
                  <div className="point-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="point-text">
                    <h3>Respuesta Rápida</h3>
                    <p>Minimizamos el tiempo de respuesta en situaciones críticas mediante tecnología eficiente.</p>
                  </div>
                </div>
                
                <div className="point">
                  <div className="point-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="point-text">
                    <h3>Seguridad y Confianza</h3>
                    <p>Garantizamos la seguridad de todos los participantes mediante verificación y protocolos.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-visual">
              <div className="mission-graphic">
                <div className="graphic-circle">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="graphic-text">Solidaridad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="container">
          <div className="vision-content">
            <div className="content-visual">
              <div className="vision-graphic">
                <div className="graphic-circle">
                  <i className="fas fa-eye"></i>
                </div>
                <div className="graphic-text">Futuro</div>
              </div>
            </div>
            <div className="content-text">
              <h2>Nuestra Visión</h2>
              <p>
                Ser la plataforma de referencia en España para la gestión colaborativa de emergencias, 
                donde cada comunidad tenga la capacidad de autoorganizarse y responder eficazmente 
                ante cualquier crisis, construyendo una sociedad más resiliente y solidaria.
              </p>
              <div className="vision-goals">
                <div className="goal">
                  <h4>2024-2025: Consolidación en Catalunya</h4>
                  <p>Establecer una red sólida de voluntarios en todas las comarcas catalanas.</p>
                </div>
                <div className="goal">
                  <h4>2026-2027: Expansión Nacional</h4>
                  <p>Extender nuestros servicios a otras comunidades autónomas de España.</p>
                </div>
                <div className="goal">
                  <h4>2028+: Innovación Continua</h4>
                  <p>Desarrollar nuevas tecnologías de prevención y respuesta a emergencias.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Nuestros Valores Fundamentales</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Colaboración</h3>
              <p>Creemos en el poder de trabajar juntos para lograr objetivos comunes y crear un impacto positivo en nuestras comunidades.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Sostenibilidad</h3>
              <p>Desarrollamos soluciones que perduran en el tiempo y contribuyen al bienestar a largo plazo de la sociedad.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovación</h3>
              <p>Adoptamos y desarrollamos nuevas tecnologías y metodologías para mejorar continuamente nuestros servicios.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Transparencia</h3>
              <p>Operamos con total transparencia en nuestras acciones, decisiones y uso de recursos para mantener la confianza pública.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Inclusión</h3>
              <p>Garantizamos que nuestros servicios sean accesibles para todas las personas, independientemente de su situación personal.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Aprendizaje</h3>
              <p>Fomentamos el aprendizaje continuo y el intercambio de conocimientos para mejorar nuestra capacidad de respuesta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <h2>Nuestro Impacto</h2>
          <div className="impact-stats">
            <div className="impact-item">
              <div className="impact-number">15min</div>
              <div className="impact-label">Tiempo promedio de respuesta</div>
            </div>
            <div className="impact-item">
              <div className="impact-number">98%</div>
              <div className="impact-label">Satisfacción de usuarios</div>
            </div>
            <div className="impact-item">
              <div className="impact-number">24/7</div>
              <div className="impact-label">Disponibilidad del servicio</div>
            </div>
            <div className="impact-item">
              <div className="impact-number">100%</div>
              <div className="impact-label">Gratuito para todos</div>
            </div>
          </div>
          
          <div className="impact-testimonial">
            <blockquote>
              "SomAqui.cat no es solo una plataforma tecnológica, es una manifestación del espíritu 
              solidario que caracteriza a nuestra sociedad. Cada conexión que facilitamos, cada ayuda 
              que coordinamos, construye un futuro más resiliente y humano."
            </blockquote>
            <cite>— Equipo Fundador de SomAqui.cat</cite>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Únete a Nuestra Misión</h2>
            <p>
              Cada persona que se suma a SomAqui.cat contribuye a construir una sociedad más preparada 
              y solidaria. Tu participación, sea como voluntario o como persona que recibe ayuda, 
              fortalece nuestra red comunitaria.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">
                <i className="fas fa-user-plus"></i>
                Ser Voluntario
              </button>
              <button className="btn-secondary">
                <i className="fas fa-envelope"></i>
                Contacta con Nosotros
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MisionVision;
