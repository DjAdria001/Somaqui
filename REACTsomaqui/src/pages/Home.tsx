import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import '../styles/home.css';

const Home: React.FC = () => {
  const sliderImages = [
    { src: '/images/medicamento.jpg', alt: 'Comunidad de ayuda SomAqui' },
    { src: '/images/levantar.jpg', alt: 'Situaciones de emergencia' },
    { src: '/images/Ayuda.png', alt: 'Asistencia y apoyo' },
  ];

  const emergencyTypeImages = [
    { src: '/images/icono_medica.png', alt: 'Emergencia médica', title: 'Asistencia médica' },
    { src: '/images/icono_incendio.png', alt: 'Incendios', title: 'Incendios' },
    { src: '/images/icono_inundacion.png', alt: 'Inundaciones', title: 'Inundaciones' },
    { src: '/images/icono_rescate.png', alt: 'Rescate', title: 'Rescate' },
    { src: '/images/icono_otros.png', alt: 'Otras emergencias', title: 'Otras emergencias' },
    { src: '/images/icono_default.png', alt: 'Ayuda general', title: 'Ayuda general' },
  ];

  return (
    <main>
      {/* Sección ¿Cómo funciona? */}
      <section className="como-funciona">
        <div className="container">
          <h2>¿Cómo Funciona SomAqui.cat?</h2>
          <p className="subtitle">Un proceso simple y efectivo para conectar ayuda</p>
          <div className="pasos-grid">
            <div className="paso">
              <div className="paso-icono">
                <div className="paso-numero">1</div>
                <i className="fa fa-user-plus" aria-hidden="true"></i>
              </div>
              <div className="paso-contenido">
                <h3>Regístrate</h3>
                <p>Completa tu perfil con tus habilidades y disponibilidad para ayudar a tu comunidad</p>
              </div>
            </div>
            <div className="paso">
              <div className="paso-icono">
                <div className="paso-numero">2</div>
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
              <div className="paso-contenido">
                <h3>Encuentra Oportunidades</h3>
                <p>Explora las emergencias activas en tu zona y encuentra donde puedes ayudar más</p>
              </div>
            </div>
            <div className="paso">
              <div className="paso-icono">
                <div className="paso-numero">3</div>
                <i className="fa fa-heart" aria-hidden="true"></i>
              </div>
              <div className="paso-contenido">
                <h3>Ayuda y Conecta</h3>
                <p>Conecta con personas que necesitan ayuda y marca la diferencia en tu comunidad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slider de imágenes */}
      <Slider images={sliderImages} />

      {/* Sección hero */}
      <section className="hero">
        <h2> Conectamos a quienes necesitan ayuda con quienes pueden ofrecerla</h2>
        <p>
          SomAqui.cat es una plataforma comunitaria que facilita la conexión entre personas 
          que necesitan asistencia y voluntarios dispuestos a ayudar en situaciones de emergencia.
        </p>
        <Link to="/ayuda">Pedir ayuda ahora</Link>
        <Link to="/voluntario">Ser voluntario</Link>
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
          <Link to="/ayuda">Solicitar ayuda</Link>
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
      </section>

      {/* Tipos de emergencias que manejamos */}
      <section className="emergency-types">
        <h2>🚨 Tipos de emergencias que atendemos</h2>
        <div className="emergency-grid">
          {emergencyTypeImages.map((emergency, index) => (
            <div key={index} className="emergency-card">
              <img src={emergency.src} alt={emergency.alt} />
              <h3>{emergency.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Formas de ayudar */}
      {/* <section className="help-activities">
        <h2>💪 Formas en las que puedes ayudar</h2>
        <div className="activities-grid">
          {helpActivityImages.map((activity, index) => (
            <div key={index} className="activity-card">
              <img src={activity.src} alt={activity.alt} />
              <h3>{activity.title}</h3>
            </div>
          ))}
        </div>
      </section> */}

      {/* Teoría del cambio */}
      <section className="teoria-cambio">
        <h2>¿Cómo funciona SomAqui.cat?</h2>
        <p className="subtitulo">
          Un proceso simple para conectar necesidades con soluciones
        </p>
        
        <div className="contenido-cambio">
          <div className="grafico-cambio">
            <img src="/images/Globo.png" alt="Proceso de ayuda comunitaria" />
          </div>
          
          <div className="pasos-cambio">
            <div className="paso">
              <img src="/images/Icono1.png" alt="Paso 1" />
              <div>
                <strong>1. Solicita ayuda</strong>
                <p>
                  Describe tu situación y ubicación en nuestro formulario. 
                  Tu información se mantiene privada y segura.
                </p>
              </div>
            </div>
            
            <div className="paso">
              <img src="/images/Icono2.png" alt="Paso 2" />
              <div>
                <strong>2. Conectamos voluntarios</strong>
                <p>
                  Notificamos a voluntarios cercanos que pueden ayudar 
                  con tu situación específica.
                </p>
              </div>
            </div>
            
            <div className="paso">
              <img src="/images/Icono3.png" alt="Paso 3" />
              <div>
                <strong>3. Recibe ayuda</strong>
                <p>
                  Los voluntarios se ponen en contacto contigo para 
                  coordinar la asistencia que necesitas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </main>
  );
};

export default Home;
