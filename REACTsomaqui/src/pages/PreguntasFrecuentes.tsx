import React, { useState } from 'react';
import '../styles/preguntas-frecuentes.css';

interface FAQ {
  id: number;
  categoria: string;
  pregunta: string;
  respuesta: string;
}

const PreguntasFrecuentes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      categoria: 'general',
      pregunta: '¿Qué es SomAqui.cat?',
      respuesta: 'SomAqui.cat es una plataforma digital que conecta a personas que necesitan ayuda durante emergencias con voluntarios disponibles en su zona. Facilitamos la coordinación de ayuda comunitaria de manera rápida y eficiente.'
    },
    {
      id: 2,
      categoria: 'general',
      pregunta: '¿Es gratuito usar SomAqui.cat?',
      respuesta: 'Sí, todos nuestros servicios son completamente gratuitos tanto para quienes solicitan ayuda como para los voluntarios que la brindan. Nuestro objetivo es facilitar la ayuda mutua sin barreras económicas.'
    },
    {
      id: 3,
      categoria: 'emergencias',
      pregunta: '¿Qué tipos de emergencias se pueden reportar?',
      respuesta: 'Puedes reportar diversos tipos de emergencias como incendios, inundaciones, emergencias médicas, rescates, accidentes, situaciones de riesgo para personas vulnerables, y otras situaciones que requieran ayuda inmediata.'
    },
    {
      id: 4,
      categoria: 'emergencias',
      pregunta: '¿Qué debo hacer en caso de emergencia inmediata?',
      respuesta: 'Si estás en una situación de emergencia que pone en peligro vidas, llama inmediatamente al 112. SomAqui.cat es una herramienta complementaria para coordinar ayuda comunitaria, no reemplaza los servicios de emergencia oficiales.'
    },
    {
      id: 5,
      categoria: 'voluntarios',
      pregunta: '¿Cómo puedo registrarme como voluntario?',
      respuesta: 'Para registrarte como voluntario, ve a la sección "Quiero ser Voluntario", completa el formulario con tus datos, habilidades y disponibilidad. Nuestro equipo revisará tu solicitud y te contactará para completar el proceso.'
    },
    {
      id: 6,
      categoria: 'voluntarios',
      pregunta: '¿Qué requisitos necesito para ser voluntario?',
      respuesta: 'Los requisitos básicos son: ser mayor de 18 años, tener disponibilidad para responder a emergencias, completar nuestra formación básica en voluntariado de emergencias, y pasar una verificación de antecedentes.'
    },
    {
      id: 7,
      categoria: 'voluntarios',
      pregunta: '¿Recibo algún tipo de formación como voluntario?',
      respuesta: 'Sí, todos nuestros voluntarios reciben formación básica en primeros auxilios, protocolos de seguridad, comunicación en emergencias y uso de la plataforma. También ofrecemos cursos especializados según el tipo de emergencia.'
    },
    {
      id: 8,
      categoria: 'seguridad',
      pregunta: '¿Cómo garantizan la seguridad de los voluntarios?',
      respuesta: 'Implementamos múltiples medidas de seguridad: verificación de antecedentes, formación obligatoria, seguimiento GPS durante las misiones, comunicación constante con nuestro centro de coordinación, y protocolos de seguridad específicos.'
    },
    {
      id: 9,
      categoria: 'seguridad',
      pregunta: '¿Qué datos personales recopilan y cómo los protegen?',
      respuesta: 'Recopilamos solo los datos necesarios para coordinar la ayuda: nombre, contacto, ubicación y habilidades. Cumplimos estrictamente con la LOPD y RGPD. Tus datos están encriptados y solo se comparten con voluntarios verificados cuando solicitas ayuda.'
    },
    {
      id: 10,
      categoria: 'uso',
      pregunta: '¿Cómo solicito ayuda a través de la plataforma?',
      respuesta: 'Ve a "Necesito Ayuda", completa el formulario describiendo tu situación, ubicación y tipo de ayuda necesaria. El sistema automáticamente notificará a voluntarios cercanos que puedan asistirte.'
    },
    {
      id: 11,
      categoria: 'uso',
      pregunta: '¿Cuánto tiempo tarda en llegar la ayuda?',
      respuesta: 'El tiempo de respuesta depende de varios factores como la disponibilidad de voluntarios, tipo de emergencia y ubicación. En promedio, los primeros voluntarios se ponen en contacto en 15-30 minutos.'
    },
    {
      id: 12,
      categoria: 'tecnico',
      pregunta: '¿La aplicación funciona sin conexión a internet?',
      respuesta: 'La aplicación requiere conexión a internet para funcionar completamente. Sin embargo, puedes preparar tu perfil offline y sincronizar cuando recuperes la conexión. En emergencias sin internet, llama al 112.'
    },
    {
      id: 13,
      categoria: 'tecnico',
      pregunta: '¿En qué dispositivos puedo usar SomAqui.cat?',
      respuesta: 'SomAqui.cat funciona en cualquier dispositivo con navegador web: smartphones, tablets, ordenadores. También estamos desarrollando aplicaciones nativas para iOS y Android.'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', icon: 'fas fa-list' },
    { id: 'general', name: 'General', icon: 'fas fa-info-circle' },
    { id: 'emergencias', name: 'Emergencias', icon: 'fas fa-exclamation-triangle' },
    { id: 'voluntarios', name: 'Voluntarios', icon: 'fas fa-hands-helping' },
    { id: 'seguridad', name: 'Seguridad', icon: 'fas fa-shield-alt' },
    { id: 'uso', name: 'Uso de la Plataforma', icon: 'fas fa-mobile-alt' },
    { id: 'tecnico', name: 'Técnico', icon: 'fas fa-cog' }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.categoria === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <main className="preguntas-page">
      {/* Header Section */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-text">
              <h1>Preguntas Frecuentes</h1>
              <p className="subtitle">
                Encuentra respuestas a las preguntas más comunes sobre SomAqui.cat. 
                Si no encuentras lo que buscas, no dudes en contactarnos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="faq-navigation">
        <div className="container">
          <div className="categories-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="container">
          <div className="faq-list">
            {filteredFAQs.map(faq => (
              <div key={faq.id} className={`faq-item ${openFAQ === faq.id ? 'open' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span>{faq.pregunta}</span>
                  <i className={`fas fa-chevron-${openFAQ === faq.id ? 'up' : 'down'}`}></i>
                </button>
                <div className="faq-answer">
                  <p>{faq.respuesta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <h2>¿Necesitas Más Ayuda?</h2>
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Contacta con Nosotros</h3>
              <p>Si tu pregunta no está aquí, envíanos un mensaje y te responderemos pronto.</p>
              <button className="btn-action">Contactar</button>
            </div>
            
            <div className="action-card">
              <div className="action-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>Línea de Emergencias</h3>
              <p>Para emergencias inmediatas que pongan en peligro vidas, llama al 112.</p>
              <a href="tel:112" className="btn-action emergency">Llamar 112</a>
            </div>
            
            <div className="action-card">
              <div className="action-icon">
                <i className="fas fa-book"></i>
              </div>
              <h3>Guía de Usuario</h3>
              <p>Consulta nuestra guía completa para aprender a usar todas las funcionalidades.</p>
              <button className="btn-action">Ver Guía</button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Info */}
      <section className="support-info">
        <div className="container">
          <div className="support-content">
            <div className="support-text">
              <h2>Nuestro Compromiso con la Ayuda</h2>
              <p>
                En SomAqui.cat nos comprometemos a proporcionar respuestas claras y ayuda 
                cuando la necesites. Nuestro equipo de soporte está disponible para resolver 
                dudas técnicas, mientras que nuestros coordinadores de emergencias están 
                preparados para situaciones críticas.
              </p>
              <div className="support-stats">
                <div className="stat">
                  <strong>&lt; 24h</strong>
                  <span>Tiempo de respuesta promedio</span>
                </div>
                <div className="stat">
                  <strong>24/7</strong>
                  <span>Disponibilidad para emergencias</span>
                </div>
                <div className="stat">
                  <strong>98%</strong>
                  <span>Satisfacción en resolución</span>
                </div>
              </div>
            </div>
            <div className="support-visual">
              <div className="support-graphic">
                <i className="fas fa-headset"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PreguntasFrecuentes;
