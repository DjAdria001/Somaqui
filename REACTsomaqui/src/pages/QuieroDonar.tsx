import React, { useState } from 'react';
import '../styles/quiero-donar.css';

const QuieroDonar: React.FC = () => {
  const [selectedDonationAmount, setSelectedDonationAmount] = useState<number>(150);
  const [donationPeriod, setDonationPeriod] = useState<'mensual' | 'anual'>('anual');

  return (
    <main className="quiero-donar-page">
      {/* Header Section */}
      <section className="quiero-donar-header">
        <div className="container">
          <h1>Quiero Donar</h1>
          <p className="subtitle">Tu apoyo hace la diferencia en situaciones de emergencia</p>
        </div>
      </section>

      {/* Información sobre Donaciones */}
      <section className="info-donaciones-section">
        <div className="container">
          <h2>¿Por qué es importante tu donación?</h2>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Respuesta Rápida</h3>
              <p>Nos permite mantener equipos de emergencia listos para actuar en cualquier momento, reduciendo el tiempo de respuesta crucial en situaciones críticas.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Recursos Especializados</h3>
              <p>Financiamos equipamiento médico, herramientas de rescate, vehículos de emergencia y suministros esenciales para diferentes tipos de crisis.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">👥</div>
              <h3>Formación de Voluntarios</h3>
              <p>Invertimos en la capacitación continua de nuestros voluntarios en primeros auxilios, rescate y gestión de emergencias.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🌐</div>
              <h3>Red de Apoyo</h3>
              <p>Mantenemos una red coordinada de voluntarios y recursos que permite cubrir todo el territorio de manera eficiente.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>Tecnología de Emergencia</h3>
              <p>Desarrollamos y mantenemos sistemas tecnológicos como esta plataforma para coordinar ayuda de manera más efectiva.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🏥</div>
              <h3>Apoyo Post-Emergencia</h3>
              <p>Proporcionamos seguimiento y apoyo a las familias afectadas durante su proceso de recuperación y normalización.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Donaciones */}
      <section className="donaciones-section">
        <div className="container">
          <div className="donaciones-content">
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
                  {donationPeriod === 'anual' ? (
                    <>
                      <button 
                        className={selectedDonationAmount === 90 ? 'amount-btn selected' : 'amount-btn'}
                        onClick={() => setSelectedDonationAmount(90)}
                      >
                        90€
                      </button>
                      <button 
                        className={selectedDonationAmount === 150 ? 'amount-btn selected primary' : 'amount-btn'}
                        onClick={() => setSelectedDonationAmount(150)}
                      >
                        150€
                      </button>
                      <button 
                        className={selectedDonationAmount === 250 ? 'amount-btn selected' : 'amount-btn'}
                        onClick={() => setSelectedDonationAmount(250)}
                      >
                        250€
                      </button>
                    </>
                  ) : (
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
      </section>

      {/* Otras Formas de Ayudar */}
      <section className="otras-formas-section">
        <div className="container">
          <h2>Otras formas de colaborar</h2>
          <p>Si no puedes donar económicamente, hay muchas otras maneras de ayudar a nuestra comunidad</p>
          
          <div className="formas-grid">
            <div className="forma-card">
              <div className="forma-icon">🙋‍♀️</div>
              <h3>Voluntariado</h3>
              <p>Únete a nuestro equipo de voluntarios y participa directamente en las operaciones de emergencia.</p>
              <a href="/voluntario" className="btn-forma">Ser Voluntario</a>
            </div>

            <div className="forma-card">
              <div className="forma-icon">📢</div>
              <h3>Difusión</h3>
              <p>Ayúdanos a llegar a más personas compartiendo nuestra misión en redes sociales.</p>
              <a href="#" className="btn-forma">Compartir</a>
            </div>

            <div className="forma-card">
              <div className="forma-icon">🏢</div>
              <h3>Empresa Colaboradora</h3>
              <p>Si representas una empresa, puedes formar parte de nuestro programa de responsabilidad social.</p>
              <a href="/contacto" className="btn-forma">Colaborar</a>
            </div>

            <div className="forma-card">
              <div className="forma-icon">🎓</div>
              <h3>Formación</h3>
              <p>Ofrece talleres o cursos especializados para mejorar las capacidades de nuestros voluntarios.</p>
              <a href="/contacto" className="btn-forma">Formar</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QuieroDonar;
