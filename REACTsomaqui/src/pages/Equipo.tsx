import React from 'react';
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
}

const Equipo: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      nombre: "Maria Paula Diaz Fernández",
      cargo: "Fundadora y Directora Ejecutiva",
      descripcion: "Experta en gestión de emergencias con más de 10 años de experiencia en organizaciones humanitarias. Lidera la visión estratégica de SomAqui.cat.",
      imagen: "/api/placeholder/200/200",
      linkedin: "https://www.linkedin.com/in/maria-paula-diaz-hernandez/",
      email: "maria@somaqui.cat"
    },
    {
      id: 2,
      nombre: "Adrià Galera",
      cargo: "Director de Tecnología",
      descripcion: "Ingeniero de software especializado en sistemas de respuesta a emergencias. Responsable del desarrollo y mantenimiento de la plataforma.",
      imagen: "/api/placeholder/200/200",
      linkedin: "https://www.linkedin.com/in/adriagalerasanchez/",
      twitter: "#"
    },
    {
      id: 3,
      nombre: "Malik Hassan",
      cargo: "Coordinadora de Voluntarios",
      descripcion: "Psicóloga social con experiencia en gestión de equipos de voluntarios. Coordina la formación y asignación de voluntarios en emergencias.",
      imagen: "/api/placeholder/200/200",
      linkedin: "https://www.linkedin.com/in/malik-hassan-58b4b41b9/",
      email: "ana@somaqui.cat"
    },
    {
      id: 4,
      nombre: "Enya Stephanie Rodriguez",
      cargo: "Especialista en Comunicaciones",
      descripcion: "Periodista especializado en comunicación de crisis. Gestiona las comunicaciones públicas y relaciones con medios durante emergencias.",
      imagen: "/api/placeholder/200/200",
      linkedin: "https://www.linkedin.com/in/enya-stephanie-rodr%C3%ADguez/",
      email: "david@somaqui.cat"
    },
 
  ];

  const advisors = [
    {
      nombre: "Dr. Elena Ruiz",
      cargo: "Asesora Médica",
      organizacion: "Hospital Clínic Barcelona"
    },
    {
      nombre: "Ing. Roberto Vega",
      cargo: "Asesor en Protección Civil",
      organizacion: "Generalitat de Catalunya"
    },
    {
      nombre: "Dra. Carmen Torres",
      cargo: "Asesora en Psicología de Emergencias",
      organizacion: "Universidad de Barcelona"
    }
  ];

  return (
    <main className="equipo-page">
      {/* Header Section */}
      <section className="equipo-header">
        <div className="container">
          <h1>Nuestro Equipo</h1>
          <p className="subtitle">
            Conoce a las personas comprometidas que hacen posible SomAqui.cat, 
            trabajando incansablemente para conectar comunidades y salvar vidas.
          </p>
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
          <h2>Nuestro Equipo</h2>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-photo">
                  <div className="photo-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
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
          <h2>Consejo Asesor</h2>
          <p className="advisors-intro">
            Contamos con la colaboración de expertos reconocidos que nos orientan 
            en las mejores prácticas y nos ayudan a mejorar constantemente nuestros servicios.
          </p>
          <div className="advisors-grid">
            {advisors.map((advisor, index) => (
              <div key={index} className="advisor-card">
                <div className="advisor-info">
                  <h3>{advisor.nombre}</h3>
                  <h4>{advisor.cargo}</h4>
                  <p>{advisor.organizacion}</p>
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
              <button className="btn-volunteer">
                <i className="fas fa-hand-helping"></i>
                Ser Voluntario
              </button>
              <button className="btn-careers">
                <i className="fas fa-briefcase"></i>
                Oportunidades Laborales
              </button>
              <button className="btn-collaborate">
                <i className="fas fa-handshake"></i>
                Colaborar con Nosotros
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Equipo;
