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
        { value: 'Incendios forestales', label: 'Incendios forestales' },
        { value: 'Inundaciones', label: 'Lluvias intensas' },
        { value: 'Ola de calor', label: 'Ola de calor' },
        { value: 'Ola de frío', label: 'Ola de frío' },
        { value: 'Vientos fuertes', label: 'Vientos fuertes' }
      ]
    },
    cortes: {
      titulo: '🛑 Cortes o fallos',
      opciones: [
        { value: 'Corte de luz', label: 'Corte de luz' },
        { value: 'Corte de agua', label: 'Corte de agua' },
        { value: 'Corte de gas', label: 'Corte de gas' },
        { value: 'Corte de Internet', label: 'Corte de Internet' },
        { value: 'Apagón general', label: 'Apagón general' }
      ]
    },
    humanas: {
      titulo: '👥 Necesidades humanas',
      opciones: [
        { value: 'Mayores solos', label: 'Mayores solos' },
        { value: 'Personas sin hogar', label: 'Personas sin hogar' },
        { value: 'Movilidad reducida', label: 'Movilidad reducida' },
        { value: 'Falta de alimentos', label: 'Falta de alimentos' },
        { value: 'Falta de medicamentos', label: 'Falta de medicamentos' },
        { value: 'Necesidad de transporte', label: 'Necesidad de transporte' }
      ]
    },
    psicosocial: {
      titulo: '🧠 Apoyo psicosocial',
      opciones: [
        { value: 'Ansiedad o crisis emocional', label: 'Ansiedad o crisis emocional' },
        { value: 'Necesito hablar', label: 'Necesito hablar' },
        { value: 'Necesito contención emocional', label: 'Necesito contención emocional' },
        { value: 'Acompañamiento', label: 'Acompañamiento' },
        { value: 'Ataques de pánico', label: 'Ataques de pánico' }
      ]
    },
    estructurales: {
      titulo: '🏘️ Problemas estructurales',
      opciones: [
        { value: 'Desalojo', label: 'Peligro de desalojo' },
        { value: 'Calles bloqueadas', label: 'Calles bloqueadas' },
        { value: 'Inundación interna en la vivienda', label: 'Inundación interna en la vivienda' },
        { value: 'Daños en la vivienda (techos, paredes, ventanas)', label: 'Daños en la vivienda (techos, paredes, ventanas)' },
        { value: 'Riesgo de derrumbe por lluvias o sismos', label: 'Riesgo de derrumbe por lluvias o sismos' }
      ]
    },
    infraestructura: {
      titulo: '🧰 Infraestructura',
      opciones: [
        { value: 'Alcantarillado colapsado o desbordado', label: 'Alcantarillado colapsado o desbordado' },
        { value: 'Centro cerrado', label: 'Centro cívico cerrado' },
        { value: 'Colapso en centros de salud', label: 'Centro de salud colapsado' },
        { value: 'Falta de servicios básicos', label: 'Falta de servicios básicos' },
        { value: 'Problemas de infraestructura', label: 'Problemas de infraestructura' }
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

  const handleTagChange = (value: string, checked: boolean) => {
    if (value === 'Otros') {
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
        ? [...prev.tags, value]
        : prev.tags.filter(t => t !== value)
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
      alert('Tu navegador no soporta geolocalización. Por favor, selecciona tu ubicación manualmente en el mapa.');
      return;
    }

    setIsDetectingLocation(true);
    setUbicacionTexto('🔍 Detectando ubicación...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Ubicación detectada:', { latitude, longitude });
        
        // Actualizar los datos del formulario
        handleLocationSelect(latitude, longitude);
        
        // Actualizar el mapa
        if (mapRef.current) {
          try {
            mapRef.current.updateLocation(latitude, longitude);
          } catch (error) {
            console.error('Error al actualizar el mapa:', error);
          }
        }
        
        setIsDetectingLocation(false);
        setUbicacionTexto(`📍 Ubicación detectada: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      },
      (error) => {
        console.error('Error al obtener ubicación:', error);
        setIsDetectingLocation(false);
        
        let errorMessage = 'No se pudo obtener la ubicación. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Permisos de ubicación denegados. Por favor, permite el acceso a tu ubicación y vuelve a intentarlo.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Información de ubicación no disponible.';
            break;
          case error.TIMEOUT:
            errorMessage += 'La solicitud de ubicación tardó demasiado tiempo.';
            break;
          default:
            errorMessage += 'Error desconocido.';
            break;
        }
        
        errorMessage += ' Puedes seleccionar tu ubicación manualmente haciendo clic en el mapa.';
        
        alert(errorMessage);
        setUbicacionTexto('📍 Detectar mi ubicación automáticamente');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Aumentar timeout a 15 segundos
        maximumAge: 300000 // 5 minutos
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
    <div className="formulario-ayuda-container">
      <header className="formulario-header">
        <h1>Solicitar ayuda inmediata</h1>
        <p>Conectamos tu necesidad con voluntarios cercanos</p>
      </header>

      <div className="formulario-content">
        <form onSubmit={handleSubmit} className="ayuda-form">
          {/* Sección de ubicación y contacto - Layout horizontal */}
          <section className="ubicacion-contacto-section">
            <div className="ubicacion-mapa">
              {/* Sección de ubicación - Lado izquierdo */}
              <div className="mapa-contenedor">
                <div className="ubicacion-controls">
                  <button 
                    type="button" 
                    onClick={detectLocation}
                    disabled={isDetectingLocation}
                    className="detect-location-btn"
                  >
                    {ubicacionTexto}
                  </button>
                  
                  <div className="ubicacion-input-group">
                    <label htmlFor="desc_ubic">Descripción específica del lugar:</label>
                    <input
                      type="text"
                      id="desc_ubic"
                      name="desc_ubic"
                      value={formData.desc_ubic}
                      onChange={handleInputChange}
                      placeholder="Ej: Calle Mayor 123, 2º piso, puerta izquierda"
                    />
                  </div>
                </div>

                <div className="map-container">
                  <MapComponent 
                    ref={mapRef}
                    onLocationSelect={handleLocationSelect}
                    height="400px"
                  />
                </div>
              </div>

              {/* Sección de contacto - Lado derecho */}
              <div className="form-derecha">
                <h2>📞 Información de contacto</h2>
                
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="correo">Correo electrónico:</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono de contacto:</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="personales">¿Cuántas personas necesitan ayuda?</label>
                  <input
                    type="number"
                    id="personales"
                    name="personales"
                    value={formData.personales}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tiempo">¿Desde cuándo ocurre la situación?</label>
                  <input
                    type="text"
                    id="tiempo"
                    name="tiempo"
                    value={formData.tiempo}
                    onChange={handleInputChange}
                    placeholder="Ej: 30 minutos, 2 días..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sección de etiquetas/categorías */}
          <section className="tags-section">
            <h2>🏷️ ¿Qué tipo de ayuda necesitas?</h2>
            <p>Selecciona todas las categorías que apliquen a tu situación:</p>

            {Object.entries(categorias).map(([key, categoria]) => (
              <div key={key} className="categoria-group">
                <h3>{categoria.titulo}</h3>
                <div className="tags-grid">
                  {categoria.opciones.map((opcion) => (
                    <label key={opcion.value} className="tag-checkbox">
                      <input
                        type="checkbox"
                        value={opcion.value}
                        checked={formData.tags.includes(opcion.value)}
                        onChange={(e) => handleTagChange(opcion.value, e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      {opcion.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Opción "Otros" */}
            <div className="categoria-group">
              <h3>🔧 Otros</h3>
              <div className="tags-grid">
                <label className="tag-checkbox">
                  <input
                    type="checkbox"
                    value="Otros"
                    checked={formData.tags.includes('Otros')}
                    onChange={(e) => handleTagChange('Otros', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Otros (especificar)
                </label>
              </div>
              
              {showOtrosDetalle && (
                <div className="form-group">
                  <label htmlFor="otros_detalle">Especifica qué otro tipo de ayuda necesitas:</label>
                  <input
                    type="text"
                    id="otros_detalle"
                    name="otros_detalle"
                    value={formData.otros_detalle}
                    onChange={handleInputChange}
                    placeholder="Describe brevemente tu necesidad específica"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Sección de descripción */}
          <section className="descripcion-section">
            <h2>📝 Descripción detallada</h2>
            <div className="form-group">
              <label htmlFor="descripcion">
                Describe tu situación con el mayor detalle posible para que los voluntarios puedan prepararse adecuadamente:
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={6}
                placeholder="Ej: Tengo 3 niños pequeños y necesito ayuda para trasladar algunas pertenencias desde el segundo piso. El ascensor no funciona y no tengo transporte. También necesitaríamos algo de comida para esta noche..."
                required
              />
            </div>
          </section>

          {/* Términos y condiciones */}
          <section className="terms-section">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span className="checkmark"></span>
              Acepto los{' '}
              <button 
                type="button" 
                className="terms-link"
                onClick={() => setShowTermsModal(true)}
              >
                términos y condiciones
              </button>
              {' '}y autorizo el tratamiento de mis datos personales para gestionar mi solicitud de ayuda.
            </label>
          </section>

          {/* Botón de envío */}
          <div className="submit-section">
            <button type="submit" className="submit-btn">
              🚨 Enviar solicitud de ayuda
            </button>
            <p className="submit-help">
              Una vez enviada tu solicitud, notificaremos a voluntarios cercanos que podrán contactarte directamente.
            </p>
          </div>
        </form>
      </div>

      {/* Modal de términos y condiciones */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Términos y Condiciones</h3>
              <button 
                className="modal-close"
                onClick={() => setShowTermsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Al utilizar esta plataforma, aceptas:</p>
              <ul>
                <li>Proporcionar información veraz sobre tu situación</li>
                <li>Usar el servicio únicamente para emergencias reales</li>
                <li>Tratamiento de tus datos personales para gestionar la solicitud</li>
                <li>Posible contacto directo de voluntarios registrados</li>
                <li>Responsabilidad propia en la interacción con voluntarios</li>
              </ul>
              <p>
                SomAqui actúa como intermediario entre personas que necesitan ayuda y voluntarios.
                No nos hacemos responsables de las acciones de terceros.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn-primary"
                onClick={() => {
                  setTermsAccepted(true);
                  setShowTermsModal(false);
                }}
              >
                Aceptar
              </button>
              <button 
                className="modal-btn-secondary"
                onClick={() => setShowTermsModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioAyuda;
