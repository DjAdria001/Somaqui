import React, { useState, useRef } from 'react';
import MapComponent from '../components/MapComponent';
import '../styles/formulario-ayuda.css';

interface FormData {
  ubicacion: string;
  desc_ubic: string;
  nombre: string;
  correo: string;
  telefono: string;
  personales: string;
  tiempo: string;
  tags: string[];
  otros_detalle: string;
  descripcion: string;
}

const FormularioAyuda: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ubicacion: '',
    desc_ubic: '',
    nombre: '',
    correo: '',
    telefono: '',
    personales: '',
    tiempo: '',
    tags: [],
    otros_detalle: '',
    descripcion: '',
  });

  const [ubicacionTexto, setUbicacionTexto] = useState('📍 Detectar mi ubicación automáticamente');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [showOtrosDetalle, setShowOtrosDetalle] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  const mapRef = useRef<{ updateLocation: (lat: number, lng: number) => void }>(null);

  const categorias = {
    climaticas: {
      titulo: '🌪️ Emergencias climáticas',
      opciones: [
        'Incendios forestales',
        'Lluvias intensas',
        'Ola de calor',
        'Ola de frío',
        'Vientos fuertes'
      ]
    },
    cortes: {
      titulo: '🛑 Cortes o fallos',
      opciones: [
        'Corte de luz',
        'Corte de agua',
        'Corte de gas',
        'Corte de Internet',
        'Apagón general'
      ]
    },
    humanas: {
      titulo: '👥 Necesidades humanas',
      opciones: [
        'Mayores solos',
        'Personas sin hogar',
        'Movilidad reducida',
        'Falta de alimentos',
        'Falta de medicamentos',
        'Necesidad de transporte'
      ]
    },
    psicosocial: {
      titulo: '🧠 Apoyo psicosocial',
      opciones: [
        'Ansiedad o crisis emocional',
        'Necesito hablar',
        'Necesito contención emocional',
        'Acompañamiento',
        'Ataques de pánico'
      ]
    },
    estructurales: {
      titulo: '🏘️ Problemas estructurales',
      opciones: [
        'Peligro de desalojo',
        'Calles bloqueadas',
        'Inundación interna en la vivienda',
        'Daños en la vivienda (techos, paredes, ventanas)',
        'Riesgo de derrumbe por lluvias o sismos'
      ]
    },
    infraestructura: {
      titulo: '🧰 Infraestructura',
      opciones: [
        'Alcantarillado colapsado o desbordado',
        'Centro cívico cerrado',
        'Centro de salud colapsado',
        'Falta de servicios básicos',
        'Problemas de infraestructura'
      ]
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    if (tag === 'Otros') {
      setShowOtrosDetalle(checked);
      if (!checked) {
        setFormData(prev => ({
          ...prev,
          otros_detalle: ''
        }));
      }
    }

    setFormData(prev => ({
      ...prev,
      tags: checked 
        ? [...prev.tags, tag]
        : prev.tags.filter(t => t !== tag)
    }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    const ubicacionStr = `${lat.toFixed(6)},${lng.toFixed(6)}`;
    setFormData(prev => ({
      ...prev,
      ubicacion: ubicacionStr
    }));
    setUbicacionTexto(`📍 Ubicación seleccionada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalización no soportada en este navegador');
      return;
    }

    setIsDetectingLocation(true);
    setUbicacionTexto('🔍 Detectando ubicación...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleLocationSelect(latitude, longitude);
        
        // Actualizar el mapa
        if (mapRef.current) {
          mapRef.current.updateLocation(latitude, longitude);
        }
        
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error('Error al obtener ubicación:', error);
        alert('No se pudo obtener la ubicación. Por favor, selecciona manualmente en el mapa.');
        setUbicacionTexto('📍 Selecciona tu ubicación en el mapa');
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ubicacion) {
      alert('Por favor, indica tu ubicación o usa el botón para detectarla.');
      return;
    }

    if (formData.tags.length === 0) {
      alert('Selecciona al menos una etiqueta que describa tu situación.');
      return;
    }

    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones para continuar.');
      return;
    }

    try {
      // Aquí iría la llamada a la API para enviar los datos
      console.log('Enviando solicitud de ayuda:', formData);
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Solicitud enviada con éxito. Pronto recibirás ayuda de voluntarios cercanos.');
      
      // Reset del formulario
      setFormData({
        ubicacion: '',
        desc_ubic: '',
        nombre: '',
        correo: '',
        telefono: '',
        personales: '',
        tiempo: '',
        tags: [],
        otros_detalle: '',
        descripcion: '',
      });
      setUbicacionTexto('📍 Detectar mi ubicación automáticamente');
      setTermsAccepted(false);
      setShowOtrosDetalle(false);
      
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <main>
      <h2>🚨 Solicita ayuda en tu zona</h2>
      <p>
        Selecciona una o más situaciones que estás viviendo. La ubicación no se mostrará públicamente.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="ubicacion-mapa">
          {/* Mapa a la izquierda */}
          <div className="mapa-contenedor">
            <button 
              type="button" 
              className={`ubicacion-display ${isDetectingLocation ? 'detectando' : formData.ubicacion ? 'ubicacion-detectada' : ''}`}
              onClick={detectLocation}
              disabled={isDetectingLocation}
            >
              {ubicacionTexto}
            </button>

            <div className="descripcion-ubicacion">
              Haz clic arriba para detectar automáticamente o selecciona manualmente en el mapa.
              Es necesaria para conectar con servicios cercanos.
            </div>

            <MapComponent
              ref={mapRef}
              onLocationSelect={handleLocationSelect}
              height="400px"
            />

            <label htmlFor="desc_ubic">🗺️ Detalles de ubicación (opcional)</label>
            <input
              type="text"
              name="desc_ubic"
              id="desc_ubic"
              value={formData.desc_ubic}
              onChange={handleInputChange}
              placeholder="Ej: En la rotonda, cerca del ambulatorio..."
            />
          </div>

          {/* Formulario a la derecha */}
          <div className="form-derecha">
            <label htmlFor="nombre">👤 Nombre o alias *</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              placeholder="Tu nombre o alias"
            />

            <label htmlFor="correo">📧 Correo electrónico *</label>
            <input
              type="email"
              name="correo"
              id="correo"
              value={formData.correo}
              onChange={handleInputChange}
              required
              placeholder="ejemplo@correo.com"
            />

            <label htmlFor="telefono">📱 Teléfono móvil (opcional)</label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Ej: 612 345 678"
            />

            <label htmlFor="personales">👥 ¿Es solo para ti o para otras personas también?</label>
            <input
              type="text"
              name="personales"
              id="personales"
              value={formData.personales}
              onChange={handleInputChange}
              placeholder="Ej: Solo para mí o para mi familia"
            />

            <label htmlFor="tiempo">⏰ ¿Desde cuándo ocurre la situación? *</label>
            <input
              type="text"
              name="tiempo"
              id="tiempo"
              value={formData.tiempo}
              onChange={handleInputChange}
              required
              placeholder="Ej: 30 minutos"
            />
          </div>
        </div>

        <div className="seccion-emergencia">
          <h2 className="titulo-emergencia">Emergencia</h2>
          <label className="etiquetas-titulo">🆘 Selecciona una o más etiquetas *</label>
        </div>

        {/* Grid de categorías */}
        <div className="categorias-grid">
          {Object.entries(categorias).map(([key, categoria]) => (
            <div key={key} className="categoria-recuadro">
              <div className="categoria-header">
                <h3>{categoria.titulo}</h3>
              </div>
              <div className="etiquetas">
                {categoria.opciones.map((opcion) => (
                  <label key={opcion} className="etiqueta">
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(opcion)}
                      onChange={(e) => handleTagChange(opcion, e.target.checked)}
                    />
                    <span>{opcion}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Categoría "Otros" */}
          <div className="categoria-recuadro categoria-otros">
            <div className="categoria-header">
              <h3>➕ Otra emergencia</h3>
            </div>
            <div className="etiquetas">
              <label className="etiqueta">
                <input
                  type="checkbox"
                  checked={formData.tags.includes('Otros')}
                  onChange={(e) => handleTagChange('Otros', e.target.checked)}
                />
                <span>Otros</span>
              </label>
            </div>
            {showOtrosDetalle && (
              <div style={{ marginTop: '1rem' }}>
                <label htmlFor="otros_detalle">🔍 Describe tu emergencia:</label>
                <input
                  type="text"
                  name="otros_detalle"
                  id="otros_detalle"
                  value={formData.otros_detalle}
                  onChange={handleInputChange}
                  placeholder="Describe brevemente tu situación..."
                />
              </div>
            )}
          </div>
        </div>

        <div className="descripcion-seccion">
          <label htmlFor="descripcion">📝 Describe tu situación (opcional)</label>
          <textarea
            name="descripcion"
            id="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            placeholder="Ej: Estoy sin electricidad desde hace 3 horas y necesito ayuda urgente..."
          />
        </div>

        <div className="checkbox-term">
          <input
            type="checkbox"
            id="terminos"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="terminos">
            Acepto los{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#39e4c9',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              términos y condiciones
            </button>{' '}
            *
          </label>
        </div>

        <button type="submit">Enviar solicitud</button>
        
        <div className="privacidad">Tus datos se usan únicamente para activar ayuda cercana.</div>
        <div className="privacidad">Por favor, usa este formulario de manera seria y responsable.</div>
      </form>

      {/* Modal de términos y condiciones */}
      {showTermsModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => setShowTermsModal(false)}
        >
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              maxWidth: '700px',
              width: '90%',
              height: '90%',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTermsModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            
            <h2>Términos y Condiciones de Uso – SomAqui.cat</h2>
            <p><strong>Última actualización: julio de 2025</strong></p>
            
            <p><strong>1. Objeto del servicio</strong><br />
            SomAqui.cat permite a los usuarios registrarse para compartir su ubicación aproximada y necesidades específicas mediante etiquetas, conectarse con personas u organizaciones dispuestas a colaborar y participar en iniciativas comunitarias.</p>
            
            <p><strong>2. Registro de usuarios</strong><br />
            Se recopilan datos como nombre/alias, correo electrónico y ubicación aproximada. El usuario debe proporcionar información veraz.</p>
            
            <p><strong>3. Protección de datos personales</strong><br />
            Se aplica el RGPD. Los datos se tratan confidencialmente y no se comparten sin consentimiento.</p>
            
            <p><strong>4. Uso adecuado</strong><br />
            Está prohibido el uso con fines fraudulentos, políticos, comerciales o discriminatorios.</p>
            
            <p><strong>5. Limitación de responsabilidad</strong><br />
            SomAqui.cat actúa como intermediario. No garantiza la veracidad ni disponibilidad de ayuda.</p>
            
            <p><strong>6. Modificaciones</strong><br />
            Nos reservamos el derecho a modificar los términos en cualquier momento.</p>
            
            <p><strong>7. Aceptación</strong><br />
            Usar la plataforma implica aceptar estos términos.</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default FormularioAyuda;
