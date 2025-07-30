import React, { useState, useEffect } from 'react';
import '../styles/quiero-donar.css';

const QuieroDonar: React.FC = () => {
  const [selectedDonationAmount, setSelectedDonationAmount] = useState<number>(15);
  const [donationPeriod, setDonationPeriod] = useState<'mensual' | 'anual'>('mensual');

  // Configurar los montos por defecto según el período
  useEffect(() => {
    if (donationPeriod === 'mensual') {
      setSelectedDonationAmount(15);
    } else {
      setSelectedDonationAmount(180);
    }
  }, [donationPeriod]);

  return (
    <main className="quiero-donar-page">
      {/* Header Section */}
      <section className="quiero-donar-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Quiero Donar</h1>
              <p className="subtitle">Tu apoyo hace la diferencia en situaciones de emergencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal con widget sticky */}
      <div className="main-content-with-widget">
        <div className="container">
          <div className="content-grid">
            {/* Contenido principal */}
            <div className="main-content">
              {/* Información sobre Donaciones */}
              <section className="info-donaciones-section">
                <h2>¿Por qué es importante tu donación?</h2>
                
                <div className="info-grid">
                  <div className="info-card">
                    <i className="info-icon fas fa-bolt"></i>
                    <h3>Respuesta Rápida</h3>
                    <p>Mantenemos equipos de emergencia listos para actuar en cualquier momento</p>
                  </div>

                  <div className="info-card">
                    <i className="info-icon fas fa-tools"></i>
                    <h3>Recursos Especializados</h3>
                    <p>Financiamos equipamiento médico, herramientas de rescate y suministros esenciales</p>
                  </div>

                  <div className="info-card">
                    <i className="info-icon fas fa-users"></i>
                    <h3>Formación de Voluntarios</h3>
                    <p>Capacitamos constantemente a nuestros voluntarios en primeros auxilios y gestión de emergencias</p>
                  </div>

                  <div className="info-card">
                    <i className="info-icon fas fa-mobile-alt"></i>
                    <h3>Tecnología de Emergencia</h3>
                    <p>Desarrollamos sistemas tecnológicos para coordinar ayuda de manera más efectiva</p>
                  </div>
                </div>
              </section>

              {/* Sección de Información sobre Donaciones */}
              <section className="donaciones-info-section">
                <div className="donaciones-text">
                  <h2>Necesitamos tu ayuda para seguir <span className="highlight">acompañando en emergencias</span></h2>
                  <p className="donaciones-description">
                    Tu donación nos permite mantener nuestros recursos de emergencia, entrenar voluntarios 
                    y responder rápidamente cuando la comunidad más lo necesita.
                  </p>
                  
                  <div className="estadisticas">
                    <div className="stat-card">
                      <div className="stat-number">1.247</div>
                      <div className="stat-label">Personas ayudadas este año</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">89</div>
                      <div className="stat-label">Emergencias atendidas</div>
                    </div>
                  </div>
                </div>

                {/* Qué hacemos con tu donación */}
                <div className="que-hacemos-section">
                  <h3>Qué hacemos con tu donación</h3>
                  <p className="compromiso">Nos comprometemos a destinar tu donación a los programas de respuesta a emergencias.</p>
                  
                  <div className="breakdown-grid">
                    <div className="breakdown-item">
                      <div className="breakdown-header">
                        <span className="breakdown-percentage">85%</span>
                        <h4>Respuesta directa a emergencias</h4>
                      </div>
                      <ul>
                        <li>Equipamiento médico y de rescate</li>
                        <li>Suministros de emergencia</li>
                        <li>Apoyo inmediato a afectados</li>
                        <li>Coordinación de voluntarios</li>
                        <li>Seguimiento post-emergencia</li>
                      </ul>
                    </div>

                    <div className="breakdown-item">
                      <div className="breakdown-header">
                        <span className="breakdown-percentage">10%</span>
                        <h4>Formación y capacitación</h4>
                      </div>
                      <ul>
                        <li>Entrenamiento de voluntarios</li>
                        <li>Cursos de primeros auxilios</li>
                        <li>Capacitación especializada</li>
                      </ul>
                    </div>

                    <div className="breakdown-item">
                      <div className="breakdown-header">
                        <span className="breakdown-percentage">5%</span>
                        <h4>Costes operacionales</h4>
                      </div>
                      <ul>
                        <li>Mantenimiento de la plataforma</li>
                        <li>Gastos administrativos básicos</li>
                      </ul>
                    </div>
                  </div>

                  <div className="transparency-note">
                    <p><i className="fas fa-shield-alt"></i> <strong>Donación segura</strong></p>
                    <p>Somos una organización independiente. Nuestra actividad se sostiene gracias al apoyo de personas comprometidas con la ayuda comunitaria.</p>
                  </div>
                </div>
              </section>

              {/* Otras Formas de Ayudar */}
              <section className="otras-formas-section">
                <h2>Otras formas de colaborar</h2>
                <p>Si no puedes donar económicamente, hay muchas otras maneras de ayudar a nuestra comunidad</p>
                
                                <div className="formas-grid">
                  <div className="forma-card">
                    <i className="forma-icon fas fa-hand-paper"></i>
                    <h3>Voluntariado</h3>
                    <p>Únete a nuestro equipo de voluntarios y participa directamente en las operaciones de emergencia.</p>
                    <a href="/voluntario" className="btn-forma">Ser Voluntario</a>
                  </div>

                  <div className="forma-card">
                    <i className="forma-icon fas fa-bullhorn"></i>
                    <h3>Difusión</h3>
                    <p>Ayúdanos a llegar a más personas compartiendo nuestra misión en redes sociales.</p>
                    <a href="#" className="btn-forma">Compartir</a>
                  </div>

                  <div className="forma-card">
                    <i className="forma-icon fas fa-building"></i>
                    <h3>Empresa Colaboradora</h3>
                    <p>Si representas una empresa, puedes formar parte de nuestro programa de responsabilidad social.</p>
                    <a href="/contacto" className="btn-forma">Colaborar</a>
                  </div>

                  <div className="forma-card">
                    <i className="forma-icon fas fa-graduation-cap"></i>
                    <h3>Formación</h3>
                    <p>Ofrece talleres o cursos especializados para mejorar las capacidades de nuestros voluntarios.</p>
                    <a href="/contacto" className="btn-forma">Formar</a>
                  </div>
                </div>
              </section>
            </div>

            {/* Widget sticky lateral */}
            <div className="donaciones-widget-sticky">
              <div className="donaciones-widget">
                <div className="donacion-progress">
                  <div className="progress-text">
                    <span className="current-progress">57%</span>
                    <span className="goal-text">Ya somos 1.247 colaboradores</span>
                  </div>
                  <div className="progress-subtext">Necesitamos llegar a 2.500 para continuar</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '57%'}}></div>
                  </div>
                </div>

                <div className="donacion-tabs">
                  <button 
                    className={donationPeriod === 'mensual' ? 'tab active' : 'tab'}
                    onClick={() => setDonationPeriod('mensual')}
                  >
                    Mensual
                  </button>
                  <button 
                    className={donationPeriod === 'anual' ? 'tab active' : 'tab'}
                    onClick={() => setDonationPeriod('anual')}
                  >
                    Anual
                  </button>
                </div>

                <div className="donacion-amounts">
                  <div className="amount-description">
                    {donationPeriod === 'anual' 
                      ? 'Apoyaremos emergencias durante todo el año'
                      : 'Ayudaremos en emergencias cada mes'
                    }
                  </div>
                  
                  <div className="amount-options">
                    {donationPeriod === 'mensual' ? (
                      <>
                        <button 
                          className={selectedDonationAmount === 10 ? 'amount-btn selected' : 'amount-btn'}
                          onClick={() => setSelectedDonationAmount(10)}
                        >
                          10€
                        </button>
                        <button 
                          className={selectedDonationAmount === 15 ? 'amount-btn selected primary' : 'amount-btn'}
                          onClick={() => setSelectedDonationAmount(15)}
                        >
                          15€
                        </button>
                        <button 
                          className={selectedDonationAmount === 25 ? 'amount-btn selected' : 'amount-btn'}
                          onClick={() => setSelectedDonationAmount(25)}
                        >
                          25€
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className={selectedDonationAmount === 120 ? 'amount-btn selected' : 'amount-btn'}
                          onClick={() => setSelectedDonationAmount(120)}
                        >
                          120€
                        </button>
                        <button 
                          className={selectedDonationAmount === 180 ? 'amount-btn selected primary' : 'amount-btn'}
                          onClick={() => setSelectedDonationAmount(180)}
                        >
                          180€
                        </button>
                        <button 
                          className={selectedDonationAmount === 300 ? 'amount-btn selected' : 'amount-btn'}
                          onClick={() => setSelectedDonationAmount(300)}
                        >
                          300€
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <button className="btn-donar">
                  Quiero donar {selectedDonationAmount}€ {donationPeriod === 'anual' ? 'al año' : 'al mes'}
                </button>

                <div className="donacion-info">
                  <p><i className="fas fa-shield-alt"></i> Donación segura y deducible</p>
                  <p><i className="fas fa-heart"></i> 100% destinado a emergencias</p>
                  <p><i className="fas fa-times-circle"></i> Puedes cancelar cuando quieras</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuieroDonar;
