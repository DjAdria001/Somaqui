import React, { useState, useEffect } from 'react';
import '../styles/voluntario-new.css';

interface Emergency {
  id: number;
  tipo: string;
  ubicacion: string;
  descripcion: string;
  fecha: string;
  estado: string;
}

const Voluntario: React.FC = () => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Simulamos datos de emergencias
  useEffect(() => {
    const mockEmergencies: Emergency[] = [
      {
        id: 1,
        tipo: 'incendio',
        ubicacion: 'Barcelona, España',
        descripcion: 'Incendio forestal en la zona norte de la ciudad',
        fecha: '2024-01-15',
        estado: 'activa'
      },
      {
        id: 2,
        tipo: 'inundacion',
        ubicacion: 'Valencia, España',
        descripcion: 'Inundaciones por lluvias torrenciales',
        fecha: '2024-01-14',
        estado: 'activa'
      },
      {
        id: 3,
        tipo: 'medica',
        ubicacion: 'Madrid, España',
        descripcion: 'Necesidad de personal médico voluntario',
        fecha: '2024-01-13',
        estado: 'activa'
      }
    ];
    setEmergencies(mockEmergencies);
  }, []);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredEmergencies = emergencies.filter(emergency =>
    filter === '' || emergency.tipo === filter
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

      {/* Habilidades Section */}
      <section className="habilidades-section">
        <div className="container">
          <h2>¿En qué puedes ayudar?</h2>
          <p>Selecciona las habilidades que puedes ofrecer como voluntario:</p>
          
          <div className="habilidades-grid">
            {volunteerSkills.map(skill => (
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

      {/* Emergencias Activas Section */}
      <section className="emergencias-section">
        <div className="container">
          <h2>Emergencias Activas</h2>
          <p>Encuentra oportunidades de voluntariado cerca de ti</p>

          {/* Filtros */}
          <div className="filtros">
            <button 
              className={filter === '' ? 'active' : ''}
              onClick={() => setFilter('')}
            >
              Todas
            </button>
            <button 
              className={filter === 'incendio' ? 'active' : ''}
              onClick={() => setFilter('incendio')}
            >
              Incendios
            </button>
            <button 
              className={filter === 'inundacion' ? 'active' : ''}
              onClick={() => setFilter('inundacion')}
            >
              Inundaciones
            </button>
            <button 
              className={filter === 'medica' ? 'active' : ''}
              onClick={() => setFilter('medica')}
            >
              Emergencias Médicas
            </button>
            <button 
              className={filter === 'rescate' ? 'active' : ''}
              onClick={() => setFilter('rescate')}
            >
              Rescates
            </button>
          </div>

          {/* Lista de Emergencias */}
          <div className="emergencias-grid">
            {filteredEmergencies.map(emergency => (
              <div key={emergency.id} className="emergencia-card">
                <div className="emergencia-header">
                  <span className={`emergencia-tipo ${emergency.tipo}`}>
                    {emergency.tipo.charAt(0).toUpperCase() + emergency.tipo.slice(1)}
                  </span>
                  <span className="emergencia-estado">Activa</span>
                </div>
                <h3>{emergency.descripcion}</h3>
                <p className="emergencia-ubicacion">
                  <i className="fas fa-map-marker-alt"></i>
                  {emergency.ubicacion}
                </p>
                <p className="emergencia-fecha">
                  <i className="fas fa-calendar"></i>
                  {new Date(emergency.fecha).toLocaleDateString('es-ES')}
                </p>
                <button className="btn-ayudar">
                  <i className="fas fa-hand-helping"></i>
                  Quiero Ayudar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="como-funciona">
        <div className="container">
          <h2>¿Cómo Funciona?</h2>
          <div className="pasos-grid">
            <div className="paso">
              <div className="paso-numero">1</div>
              <h3>Regístrate</h3>
              <p>Completa tu perfil de voluntario con tus habilidades y disponibilidad</p>
            </div>
            <div className="paso">
              <div className="paso-numero">2</div>
              <h3>Encuentra Oportunidades</h3>
              <p>Explora las emergencias activas y encuentra donde puedes ayudar más</p>
            </div>
            <div className="paso">
              <div className="paso-numero">3</div>
              <h3>Ayuda</h3>
              <p>Conecta con las personas que necesitan ayuda y marca la diferencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Registro de Voluntario */}
      {showVolunteerModal && (
        <div className="modal-overlay" onClick={() => setShowVolunteerModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Registro de Voluntario</h3>
              <button 
                className="modal-close"
                onClick={() => setShowVolunteerModal(false)}
              >
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
                  {volunteerSkills.map(skill => (
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
                  <span>Acepto los términos y condiciones y autorizo el tratamiento de mis datos personales *</span>
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
