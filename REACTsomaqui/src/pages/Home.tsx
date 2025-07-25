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

      {/* Slider de imágenes */}
      <Slider images={sliderImages} />

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
    </main>
  );
};

export default Home;
