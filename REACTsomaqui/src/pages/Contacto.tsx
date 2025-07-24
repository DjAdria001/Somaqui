import React, { useState } from 'react';
import '../styles/contacto-new.css';

interface ContactForm {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  tipoConsulta: string;
}

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    tipoConsulta: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
        tipoConsulta: 'general'
      });
    } catch (error) {
      setSubmitMessage('Error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contacto-page">
      {/* Header Section */}
      <section className="contacto-header">
        <div className="container">
          <h1>Contacta con Nosotros</h1>
          <p className="subtitle">Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contacto-content">
        <div className="container">
          <div className="contacto-grid">
            
            {/* Información de Contacto */}
            <div className="contacto-info">
              <h2>Información de Contacto</h2>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="info-content">
                  <h3>Correo Electrónico</h3>
                  <p>info@somaqui.cat</p>
                  <p>emergencias@somaqui.cat</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="info-content">
                  <h3>Teléfono</h3>
                  <p>+34 123 456 789</p>
                  <p className="emergency-phone">Emergencias: 112</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="info-content">
                  <h3>Ubicación</h3>
                  <p>Barcelona, Catalunya</p>
                  <p>España</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="info-content">
                  <h3>Horario de Atención</h3>
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Emergencias: 24/7</p>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="social-links">
                <h3>Síguenos</h3>
                <div className="social-icons">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="contacto-form-container">
              <h2>Envíanos un Mensaje</h2>
              
              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contacto-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre Completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono (opcional)</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="+34 123 456 789"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="tipoConsulta">Tipo de Consulta</label>
                    <select
                      id="tipoConsulta"
                      name="tipoConsulta"
                      value={formData.tipoConsulta}
                      onChange={handleInputChange}
                    >
                      <option value="general">Consulta General</option>
                      <option value="voluntario">Ser Voluntario</option>
                      <option value="emergencia">Reportar Emergencia</option>
                      <option value="tecnico">Soporte Técnico</option>
                      <option value="prensa">Prensa y Medios</option>
                      <option value="colaboracion">Colaboración</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">Asunto *</label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    required
                    placeholder="Breve resumen de tu consulta"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Describe tu consulta o mensaje detalladamente..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn-enviar"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>¿Cómo puedo reportar una emergencia?</h3>
              <p>Puedes reportar una emergencia a través de nuestro formulario de ayuda o contactando directamente al 112 para emergencias inmediatas.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿Cómo me registro como voluntario?</h3>
              <p>Visita nuestra sección "Quiero ser Voluntario" y completa el formulario de registro con tus habilidades y disponibilidad.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿SomAqui.cat es gratuito?</h3>
              <p>Sí, todos nuestros servicios son completamente gratuitos. Nuestro objetivo es ayudar a las comunidades sin fines de lucro.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿En qué zonas operamos?</h3>
              <p>Actualmente operamos en Catalunya, España, pero estamos expandiendo nuestros servicios a otras regiones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="emergency-notice">
        <div className="container">
          <div className="notice-content">
            <div className="notice-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="notice-text">
              <h3>¿Es una Emergencia?</h3>
              <p>Si estás en una situación de emergencia inmediata, no uses este formulario. Llama directamente al <strong>112</strong> o a los servicios de emergencia locales.</p>
            </div>
            <a href="tel:112" className="btn-emergency">
              <i className="fas fa-phone"></i>
              Llamar 112
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;
