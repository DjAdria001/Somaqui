import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/equipo.css';

interface TeamMember {
  id: number;
  nombre: string;
  cargo: string;
  descripcion: string;
  imagen: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  github?: string;
}

const Equipo: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      nombre: "Maria Paula Diaz Fernández",
      cargo: "Desarrolladora Fullstack",
      descripcion: "Apasionada por ayudar a los demás, combina su experiencia en organizaciones sociales con sus estudios en desarrollo web. Le encanta encontrar soluciones digitales para situaciones reales que viven muchas personas en su día a día.",
      imagen: "https://pr0j3ct.com/wp-content/uploads/2025/07/Paula.png",
      linkedin: "https://www.linkedin.com/in/maria-paula-diaz-hernandez/",
      github: "https://github.com/pauladhernandez"
    },
    {
      id: 2,
      nombre: "Adrià Galera",
      cargo: "Desarrollador Fullstack",
      descripcion: "Le gusta crear cosas que funcionen bien y ayuden a las personas. Está estudiando desarrollo web y se encarga de que todo en la plataforma funcione correctamente, desde cómo se ve hasta cómo responde.",
      imagen: "https://pr0j3ct.com/wp-content/uploads/2025/07/Adria.jfif",
      linkedin: "https://www.linkedin.com/in/adriagalerasanchez/",
     github: "https://github.com/DjAdria001"
    },
    {
      id: 3,
      nombre: "Malik Hassan",
      cargo: "Desarrollador Fullstack",
      descripcion: "Tiene experiencia trabajando con personas en situaciones difíciles y ahora se forma en el desarrollo de páginas y aplicaciones web. Aporta una mirada social al proyecto y se enfoca en que la tecnología esté al servicio de quienes más lo necesitan.",
      imagen: "https://pr0j3ct.com/wp-content/uploads/2025/07/Malik.jfif",
      linkedin: "https://www.linkedin.com/in/malik-hassan-58b4b41b9/",
      github: "https://github.com/Hassansohail839"
    },
   
  ];

  const advisors = [
    {
      nombre: "Marc Esteve García",
      cargo: "Profesor",
    },
    {
      nombre: "Marc Torija Alfaro",
      cargo: "Tutor",
    },
    {
      nombre: "Nando Coronado",
      cargo: "Coach de Soft Skills y Comunicación",
    }
  ];

  return (
    <main className="equipo-page">
      {/* Header Section */}
      <section className="equipo-header">
        <div className="container">
          <div className="equipo-header-content">
            <div className="equipo-header-text">
              <h1>Nuestro Equipo</h1>
              <p className="subtitle">
                Conoce a las personas comprometidas que hacen posible SomAqui.cat, 
                trabajando incansablemente para conectar comunidades y salvar vidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-statement">
        <div className="container">
          <div className="mission-content">
            <p>
              En SomAqui.cat creemos que la solidaridad y la colaboración comunitaria son fundamentales 
              para superar las crisis y emergencias. Nuestro equipo multidisciplinario trabaja con 
              pasión y dedicación para crear una plataforma que facilite la ayuda mutua y fortalezca 
              los lazos entre las personas.
            </p>
            <div className="mission-stats">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Voluntarios Activos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Emergencias Atendidas</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Municipios Cubiertos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Disponibilidad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="team-members">
        <div className="container">
          <h2>Equipo</h2>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-photo">
                  {/* Solo mostrar el icono si es Maria Paula (id 1), los demás solo la foto */}
                  {member.id === 1 ? (
                    <>
                    
                      <img src={member.imagen} alt={member.nombre} className="team-image" />
                    </>
                  ) : (
                    <img src={member.imagen} alt={member.nombre} className="team-image" />
                  )}
                </div>
                <div className="team-info">
                  <h3>{member.nombre}</h3>
                  <h4>{member.cargo}</h4>
                  <p>{member.descripcion}</p>
                  <div className="team-social">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github.startsWith('http') ? member.github : `https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`}>
                        <i className="fas fa-envelope"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="advisors">
        <div className="container">
          <h2>Mentores de Aprendizaje</h2>
          <p className="advisors-intro">
            A lo largo de esta experiencia formativa, tuvimos el acompañamiento de profesionales que no solo compartieron 
            su conocimiento, sino que también nos inspiraron a crecer como personas y como equipo. Gracias por ser parte 
            esencial de este recorrido.
          </p>
          <div className="advisors-grid">
            {advisors.map((advisor, index) => (
              <div key={index} className="advisor-card">
                <div className="advisor-info">
                  <h3>{advisor.nombre}</h3>
                  <h4>{advisor.cargo}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="container">
          <h2>Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Solidaridad</h3>
              <p>Creemos en la fuerza de la ayuda mutua y la importancia de cuidarnos los unos a los otros.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Colaboración</h3>
              <p>Trabajamos juntos, uniendo esfuerzos para lograr un impacto mayor y más efectivo.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Rapidez</h3>
              <p>En situaciones de emergencia, cada segundo cuenta. Priorizamos la respuesta rápida y eficiente.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Confianza</h3>
              <p>Construimos relaciones basadas en la transparencia, la honestidad y la responsabilidad.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Inclusión</h3>
              <p>Nuestra plataforma está abierta a todas las personas, sin distinción de origen, edad o condición.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovación</h3>
              <p>Buscamos constantemente nuevas formas de mejorar y evolucionar nuestros servicios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Team */}
      <section className="join-team">
        <div className="container">
          <div className="join-content">
            <h2>¿Quieres Formar Parte del Equipo?</h2>
            <p>
              Estamos siempre buscando personas talentosas y comprometidas que compartan 
              nuestra visión de una sociedad más solidaria y preparada para las emergencias.
            </p>
            <div className="join-actions">
              <Link to="/voluntario" className="btn-volunteer">
                <i className="fas fa-hand-helping"></i>
                Ser Voluntario
              </Link>
              <Link to="/contacto" className="btn-collaborate">
                <i className="fas fa-handshake"></i>
                Colaborar con Nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Equipo;
