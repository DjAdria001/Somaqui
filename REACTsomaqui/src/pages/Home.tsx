import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import '../styles/home.css';

const Home: React.FC = () => {
  const sliderImages = [
    { src: '/images/Banner.svg', alt: 'Comunidad de ayuda' },
    { src: '/images/Banner.svg', alt: 'Situaciones de emergencia' },
    { src: '/images/Banner.svg', alt: 'Asistencia médica' },
  ];

  const collageImages = [
    '/images/Banner.svg',
    '/images/Banner.svg',
    '/images/Banner.svg',
    '/images/Banner.svg',
    '/images/Banner.svg',
    '/images/Banner.svg',
  ];

  return (
    <main>
      {/* Slider de imágenes */}
      <Slider images={sliderImages} />

      {/* Sección hero */}
      <section className="hero">
        <h2>🤝 Conectamos a quienes necesitan ayuda con quienes pueden ofrecerla</h2>
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

      {/* Teoría del cambio */}
      <section className="teoria-cambio">
        <h2>¿Cómo funciona SomAqui.cat?</h2>
        <p className="subtitulo">
          Un proceso simple para conectar necesidades con soluciones
        </p>
        
        <div className="contenido-cambio">
          <div className="grafico-cambio">
            <img src="/images/LogoSF.svg" alt="Proceso de ayuda comunitaria" />
          </div>
          
          <div className="pasos-cambio">
            <div className="paso">
              <img src="/images/LogoSF.svg" alt="Paso 1" />
              <div>
                <strong>1. Solicita ayuda</strong>
                <p>
                  Describe tu situación y ubicación en nuestro formulario. 
                  Tu información se mantiene privada y segura.
                </p>
              </div>
            </div>
            
            <div className="paso">
              <img src="/images/LogoSF.svg" alt="Paso 2" />
              <div>
                <strong>2. Conectamos voluntarios</strong>
                <p>
                  Notificamos a voluntarios cercanos que pueden ayudar 
                  con tu situación específica.
                </p>
              </div>
            </div>
            
            <div className="paso">
              <img src="/images/LogoSF.svg" alt="Paso 3" />
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

      {/* Galería de imágenes */}
      <section className="collage-section">
        <h2>🌟 Juntos somos más fuertes</h2>
        <div className="collage">
          {collageImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen comunitaria ${index + 1}`}
              className="collage-img"
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
