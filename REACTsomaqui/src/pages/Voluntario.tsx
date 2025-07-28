import React, { useState, useEffect } from 'react';
import '../styles/voluntario-new.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

interface Emergency {
  id: string;
  nombre: string;
  ubicacion: string;
  desc_ubic: string;
  fecha_envio: string;
  descripcion: string;
  tipo: string;
  tags: string[];
  activo?: boolean; // Campo opcional para indicar si la emergencia está activa
}

const Voluntario: React.FC = () => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const emergenciesRef = ref(database, 'Emergencias');
    onValue(emergenciesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted: Emergency[] = Object.entries(data).map(([id, value]: any) => ({
          id,
          nombre: value.nombre || 'Anónimo',
          ubicacion: value.ubicacion || '',
          desc_ubic: value.desc_ubic || '',
          fecha_envio: value.fecha_envio || '',
          descripcion: value.descripcion || '',
          tipo: value.tipo || 'general',
          tags: value.tags || [],
          activo: value.activo !== undefined ? value.activo : true // Por defecto, la emergencia está activa
        }));
        setEmergencies(formatted);
      }
    });
  }, []);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

const filteredEmergencies = emergencies.filter(
  (emergency) =>
    emergency.activo && (filter === '' || emergency.tipo === filter)
);


  const volunteerSkills = [
    { id: 'primeros-auxilios', label: 'Primeros Auxilios', icon: '🏥' },
    { id: 'rescate', label: 'Rescate', icon: '⛑️' },
    { id: 'logistica', label: 'Logística', icon: '📦' },
    { id: 'comunicacion', label: 'Comunicación', icon: '📢' },
    { id: 'transporte', label: 'Transporte', icon: '🚗' },
    { id: 'construccion', label: 'Construcción', icon: '🔨' },
    { id: 'cocina', label: 'Cocina', icon: '🍳' },
    { id: 'cuidado-personas', label: 'Cuidado de Personas', icon: '👥' }
  ];

  return (
    
    <main className="voluntario-page">
      {/* Emergencias Activas Section */}
      <section className="emergencias-section">
        <div className="container">
          <h2>Emergencias Activas</h2>
          <p>Encuentra oportunidades de voluntariado cerca de ti</p>

          {/* Filtros */}
          <div className="filtros">
            <button className={filter === '' ? 'active' : ''} onClick={() => setFilter('')}>
              Todas
            </button>
            <button className={filter === 'incendio' ? 'active' : ''} onClick={() => setFilter('incendio')}>
              Incendios
            </button>
            <button className={filter === 'inundacion' ? 'active' : ''} onClick={() => setFilter('inundacion')}>
              Inundaciones
            </button>
            <button className={filter === 'medica' ? 'active' : ''} onClick={() => setFilter('medica')}>
              Emergencias Médicas
            </button>
            <button className={filter === 'rescate' ? 'active' : ''} onClick={() => setFilter('rescate')}>
              Rescates
            </button>
          </div>

          {/* Lista de Emergencias */}
          <div className="emergencias-grid">
            {filteredEmergencies.map((emergency) => (
              <div key={emergency.id} className="emergencia-card">
                <div className="emergencia-header">
                  <span className={`emergencia-tipo ${emergency.tipo}`}>
                    {emergency.tipo.charAt(0).toUpperCase() + emergency.tipo.slice(1)}
                  </span>
                  <span className="emergencia-estado">Activa</span>
                </div>
                <h3>{emergency.nombre}</h3>
                <p className="emergencia-ubicacion">
                  <i className="fas fa-map-marker-alt"></i>
                  {emergency.ubicacion} - {emergency.desc_ubic}
                </p>
                <p className="emergencia-fecha">
                  <i className="fas fa-calendar"></i>
                  {new Date(emergency.fecha_envio).toLocaleDateString('es-ES')}
                </p>
                <div className="emergencia-tags">
                  {emergency.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <button className="btn-ayudar">
                  <i className="fas fa-hand-helping"></i>
                  Quiero Ayudar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Habilidades Section */}
      <section className="habilidades-section">
        <div className="container">
          <h2>¿En qué puedes ayudar?</h2>
          <p>Selecciona las habilidades que puedes ofrecer como voluntario:</p>

          <div className="habilidades-grid">
            {volunteerSkills.map((skill) => (
              <div
                key={skill.id}
                className={`habilidad-card ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
                onClick={() => handleSkillToggle(skill.id)}
              >
                <div className="habilidad-icon">{skill.icon}</div>
                <h3>{skill.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información sobre Voluntariado Section */}
      <section className="info-voluntariado-section">
        <div className="container">
          <h2>¿Qué puedes hacer como voluntario?</h2>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🚨</div>
              <h3>Respuesta Inmediata</h3>
              <p>Participa en la respuesta inicial a emergencias, ayudando en evacuaciones, primeros auxilios y coordinación de recursos.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🏠</div>
              <h3>Apoyo Comunitario</h3>
              <p>Brinda apoyo directo a familias afectadas, desde distribución de alimentos hasta acompañamiento emocional.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🔧</div>
              <h3>Reconstrucción</h3>
              <p>Participa en tareas de limpieza, reparación y reconstrucción de infraestructuras comunitarias.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📋</div>
              <h3>Coordinación</h3>
              <p>Ayuda en la organización de recursos, voluntarios y comunicación entre diferentes grupos de ayuda.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🎓</div>
              <h3>Formación</h3>
              <p>Comparte tus conocimientos y habilidades, formando a otros voluntarios y a la comunidad.</p>
            </div>

            <div className="info-card">
              <div className="info-icon">💝</div>
              <h3>Prevención</h3>
              <p>Participa en actividades de prevención y concienciación para reducir riesgos en la comunidad.</p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Header Section */}
      <section className="voluntario-header">
        <div className="container">
          <h1>Quiero ser Voluntario</h1>
          <p className="subtitle">Únete a nuestra comunidad de ayuda mutua</p>
          <button 
            className="btn-registro-voluntario"
            onClick={() => setShowVolunteerModal(true)}
          >
            Registrarme como Voluntario
          </button>
        </div>
      </section>

      

      {/* Modal de Registro de Voluntario */}
      {showVolunteerModal && (
        <div className="modal-overlay" onClick={() => setShowVolunteerModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Registro de Voluntario</h3>
              <button className="modal-close" onClick={() => setShowVolunteerModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form className="volunteer-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input type="text" id="nombre" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input type="email" id="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input type="tel" id="telefono" required />
              </div>

              <div className="form-group">
                <label htmlFor="ubicacion">Ubicación *</label>
                <input type="text" id="ubicacion" placeholder="Ciudad, Región" required />
              </div>

              <div className="form-group">
                <label>Habilidades y Experiencia</label>
                <div className="skills-checkbox-group">
                  {volunteerSkills.map((skill) => (
                    <label key={skill.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={skill.id}
                        checked={selectedSkills.includes(skill.id)}
                        onChange={() => handleSkillToggle(skill.id)}
                      />
                      <span>{skill.icon} {skill.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="experiencia">Experiencia Previa (opcional)</label>
                <textarea
                  id="experiencia"
                  placeholder="Describe tu experiencia como voluntario o en situaciones de emergencia"
                  rows={4}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="disponibilidad">Disponibilidad</label>
                <select id="disponibilidad">
                  <option value="">Selecciona tu disponibilidad</option>
                  <option value="tiempo-completo">Tiempo completo</option>
                  <option value="fines-semana">Fines de semana</option>
                  <option value="tardes">Tardes</option>
                  <option value="emergencias">Solo emergencias</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label terms-checkbox">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    required
                  />
                  <span>
                    Acepto los términos y condiciones y autorizo el tratamiento de mis datos personales *
                  </span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowVolunteerModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Registrarme como Voluntario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Voluntario;
