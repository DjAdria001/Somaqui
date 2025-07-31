import React, { useState, useRef } from 'react';
import MapComponent from '../components/MapComponent';
import '../styles/formulario-ayuda.css';
import { ref, push, set } from 'firebase/database';
import { database } from '../firebase';

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
  activo?: boolean; // Campo opcional para indicar si la solicitud está activa
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
    activo: true // Por defecto, la solicitud está activa
  });

  const [ubicacionTexto, setUbicacionTexto] = useState('📍 Detectar mi ubicación automáticamente');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [ubicacionDetectada, setUbicacionDetectada] = useState(false);
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

  const handleLocationSelect = async (lat: number, lng: number) => {
    console.log('📍 Ubicación seleccionada manualmente en el mapa:', { lat, lng });
    
    const ubicacionStr = `${lat.toFixed(6)},${lng.toFixed(6)}`;
    setFormData(prev => ({
      ...prev,
      ubicacion: ubicacionStr
    }));
    
    console.log('✅ Datos del formulario actualizados:', { ubicacion: ubicacionStr });
    
    // Intentar obtener la dirección para el campo de descripción
    const address = await getAddressFromCoordinates(lat, lng);
    
    if (address) {
      console.log('✅ Dirección obtenida para ubicación seleccionada:', address);
      
      // Solo actualizar el campo de descripción, NO el texto del botón
      setFormData(prev => ({
        ...prev,
        desc_ubic: address
      }));
    }
    
    // Mantener el texto del botón sin cambios para selección manual
    console.log('📍 Ubicación seleccionada manualmente, botón mantiene su texto actual');
  };

  // Función para obtener la dirección a partir de coordenadas (geocodificación inversa)
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      console.log('🔍 Obteniendo dirección para coordenadas:', { lat, lng });
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=es`
      );
      
      if (!response.ok) {
        throw new Error('Error en la respuesta del servicio de geocodificación');
      }
      
      const data = await response.json();
      console.log('📍 Respuesta de geocodificación:', data);
      console.log('🔍 Address object completo:', data.address);
      
      if (data && data.address) {
        // Usar el mismo formato que MapComponent con más campos de búsqueda
        const address = data.address;
        console.log('🏠 house_number:', address.house_number);
        console.log('🛣️ road:', address.road);
        console.log('🏘️ suburb:', address.suburb);
        
        const addressParts = [];
        
        // Buscar el nombre de la calle en varios campos posibles
        const streetName = address.road || address.pedestrian || address.cycleway || address.footway || address.path || address.highway;
        
        // Buscar el número en varios campos posibles
        let houseNumber = address.house_number || address.street_number || address.addr_housenumber;
        
        // Si no encontramos el número, intentar extraerlo del display_name
        if (!houseNumber && data.display_name && streetName) {
          const displayParts = data.display_name.split(',');
          const firstPart = displayParts[0].trim();
          
          // Buscar patrón de número al final de la primera parte
          const numberMatch = firstPart.match(/(\d+)\s*$/);
          if (numberMatch) {
            houseNumber = numberMatch[1];
            console.log('🔍 Número extraído del display_name:', houseNumber);
          }
          
          // Otra estrategia: buscar patrón "calle, número"
          const streetNumberMatch = firstPart.match(/^(.+),\s*(\d+)$/);
          if (streetNumberMatch && !houseNumber) {
            houseNumber = streetNumberMatch[2];
            console.log('🔍 Número extraído del patrón calle,número:', houseNumber);
          }
        }
        
        console.log('🏗️ Street name found:', streetName);
        console.log('🔢 House number found:', houseNumber);
        
        // Agregar nombre de la calle y número
        if (streetName && houseNumber) {
          addressParts.push(`${streetName}, ${houseNumber}`);
          console.log('✅ Added street with number:', `${streetName}, ${houseNumber}`);
        } else if (streetName) {
          addressParts.push(streetName);
          console.log('✅ Added street without number:', streetName);
        }
        
        // Agregar barrio si no es "Eixample de Llevant" y no está ya incluido
        const neighborhood = address.suburb || address.neighbourhood || address.quarter;
        if (neighborhood && 
            neighborhood.toLowerCase() !== 'eixample de llevant' &&
            neighborhood.toLowerCase() !== "l'eixample" &&
            !addressParts.some(part => part.toLowerCase().includes(neighborhood.toLowerCase()))) {
          addressParts.push(neighborhood);
          console.log('✅ Added neighborhood:', neighborhood);
        }
        
        // Agregar ciudad/municipio
        const city = address.city || address.town || address.village || address.municipality || address.hamlet;
        if (city) {
          addressParts.push(city);
          console.log('✅ Added city:', city);
        }
        
        // Agregar provincia/estado
        const province = address.state || address.province || address.region;
        if (province) {
          addressParts.push(province);
          console.log('✅ Added province:', province);
        }
        
        const formattedAddress = addressParts.length > 0 ? addressParts.join(', ') : null;
        
        if (formattedAddress) {
          console.log('✅ Dirección completa generada:', formattedAddress);
          return formattedAddress;
        }
        
        // Si no pudimos construir una dirección específica, usar display_name como fallback
        if (data.display_name) {
          const parts = data.display_name.split(',');
          // Tomar las primeras partes más relevantes
          const relevantParts = parts.slice(0, 3).map((part: string) => part.trim());
          const fallbackAddress = relevantParts.join(', ');
          
          console.log('✅ Dirección de fallback generada:', fallbackAddress);
          return fallbackAddress;
        }
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error al obtener la dirección:', error);
      return null;
    }
  };

  // Función para manejar el cambio de dirección desde el MapComponent
  const handleAddressChange = (address: string) => {
    console.log('📍 Dirección recibida desde MapComponent:', address);
    setFormData(prev => ({
      ...prev,
      desc_ubic: address
    }));
  };

  // Función de detección de ubicación
  const detectLocation = () => {
    console.log('🔍 Iniciando detección de ubicación...');
    
    // Si ya se detectó la ubicación, permitir redetectar
    if (ubicacionDetectada) {
      console.log('🔄 Redetectando ubicación...');
      setUbicacionDetectada(false);
      setFormData(prev => ({
        ...prev,
        ubicacion: '',
        desc_ubic: ''
      }));
    }
    
    if (!navigator.geolocation) {
      console.error('❌ Geolocalización no soportada');
      alert('Tu navegador no soporta geolocalización. Por favor, selecciona tu ubicación manualmente en el mapa.');
      return;
    }

    setIsDetectingLocation(true);
    setUbicacionTexto('🔍 Detectando ubicación...');

    // Verificar permisos primero
    navigator.permissions?.query({name: 'geolocation'}).then((result) => {
      console.log('📍 Estado de permisos de geolocalización:', result.state);
    }).catch(() => {
      console.log('📍 No se pudo verificar el estado de permisos');
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log('✅ Ubicación detectada exitosamente:', { 
          latitude, 
          longitude, 
          accuracy,
          timestamp: new Date(position.timestamp).toLocaleString()
        });
        
        // Actualizar los datos del formulario con las coordenadas
        const ubicacionStr = `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setFormData(prev => ({
          ...prev,
          ubicacion: ubicacionStr
        }));
        
        // Actualizar el mapa
        if (mapRef.current) {
          try {
            console.log('🗺️ Actualizando posición en el mapa...');
            mapRef.current.updateLocation(latitude, longitude);
            console.log('✅ Mapa actualizado correctamente');
          } catch (error) {
            console.error('❌ Error al actualizar el mapa:', error);
          }
        } else {
          console.warn('⚠️ Referencia del mapa no disponible');
        }
        
        // Marcar que la ubicación fue detectada automáticamente
        setUbicacionDetectada(true);
        
        // Mostrar coordenadas inicialmente en el botón
        setUbicacionTexto(`📍 Ubicación detectada: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        
        // Intentar obtener la dirección
        setUbicacionTexto('🔍 Obteniendo dirección...');
        const address = await getAddressFromCoordinates(latitude, longitude);
        
        if (address) {
          console.log('✅ Dirección obtenida:', address);
          setUbicacionTexto(`📍 ${address}`);
          
          // Actualizar el campo de descripción con la dirección
          setFormData(prev => ({
            ...prev,
            desc_ubic: address
          }));
        } else {
          console.warn('⚠️ No se pudo obtener la dirección');
          setUbicacionTexto(`📍 Ubicación detectada: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error('❌ Error al obtener ubicación:', error);
        setIsDetectingLocation(false);
        
        let errorMessage = 'No se pudo obtener la ubicación. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Permisos de ubicación denegados. Por favor, permite el acceso a tu ubicación en la configuración del navegador y vuelve a intentarlo.';
            console.error('❌ Permisos denegados por el usuario');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Información de ubicación no disponible. Verifica tu conexión GPS o WiFi.';
            console.error('❌ Posición no disponible');
            break;
          case error.TIMEOUT:
            errorMessage += 'La solicitud de ubicación tardó demasiado tiempo. Inténtalo de nuevo.';
            console.error('❌ Timeout en la solicitud de ubicación');
            break;
          default:
            errorMessage += 'Error desconocido al acceder a tu ubicación.';
            console.error('❌ Error desconocido:', error.message);
            break;
        }
        
        errorMessage += '\n\n💡 Puedes seleccionar tu ubicación manualmente haciendo clic en el mapa.';
        
        alert(errorMessage);
        setUbicacionTexto('📍 Detectar mi ubicación automáticamente');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // 15 segundos
        maximumAge: 60000 // 1 minuto
      }
    );
    
    console.log('⏳ Solicitud de geolocalización enviada...');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones de campos requeridos
    if (!formData.ubicacion) {
      alert('Por favor, indica tu ubicación o usa el botón para detectarla.');
      return;
    }

    if (!formData.nombre.trim()) {
      alert('Por favor, introduce tu nombre completo.');
      return;
    }

    if (!formData.correo.trim()) {
      alert('Por favor, introduce tu correo electrónico.');
      return;
    }

    if (!formData.telefono.trim()) {
      alert('Por favor, introduce tu teléfono de contacto.');
      return;
    }

    if (!formData.descripcion.trim()) {
      alert('Por favor, describe tu situación en detalle.');
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
      const emergenciaRef = ref(database, 'Emergencias');
      const newRef = push(emergenciaRef);
      // Generar un ID único del solicitante
    const solicitanteId = crypto.randomUUID();
      await set(newRef, {
        ...formData,
        fecha_envio: new Date().toISOString(),
      });
      // Guardamos el ID localmente en el navegador para que este usuario tenga control
    localStorage.setItem(`emergencia_${newRef.key}`, solicitanteId);
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
        activo: true
      });
      setUbicacionTexto('📍 Detectar mi ubicación automáticamente');
      setUbicacionDetectada(false);
      setTermsAccepted(false);
      setShowOtrosDetalle(false);
      
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="formulario-ayuda-container">
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-text">
              <h1>Solicitar Ayuda Inmediata</h1>
              <p className="subtitle">
                Conectamos tu necesidad con voluntarios cercanos
              </p>
            </div>
          </div>
        </div>
      </section>


      
      {/* Indicador de pasos */}
      <div className="pasos-container">
        <div className="pasos-navegacion">
          <div className="paso">
            <div className="paso-numero activo">1</div>
            <div className="paso-texto activo">
              <strong>Ubicación</strong><br />
              <small>¿Dónde necesitas ayuda?</small>
            </div>
          </div>
          
          <div className="paso-linea"></div>
          
          <div className="paso">
            <div className="paso-numero">2</div>
            <div className="paso-texto">
              <strong>Tus datos</strong><br />
              <small>Información de contacto</small>
            </div>
          </div>
          
          <div className="paso-linea"></div>
          
          <div className="paso">
            <div className="paso-numero">3</div>
            <div className="paso-texto">
              <strong>Tipo de ayuda</strong><br />
              <small>¿Qué necesitas exactamente?</small>
            </div>
          </div>
        </div>
      </div>

      <div className="formulario-content">
      <form onSubmit={handleSubmit} className="ayuda-form">

        {/* PASO 1: Sección de ubicación y contacto */}
        <section className="ubicacion-contacto-section-flex">
          <div className="paso1-contenedor-flex">
            {/* Ubicación - Lado izquierdo, mismo estilo que form-derecha */}
            <div className="paso1-card">
              <div className="seccion-titulo">
                <div className="seccion-numero">1</div>
                <div className="seccion-info">
                  <h2>📍 Indica tu ubicación</h2>
                  <p>Necesitamos saber dónde estás para enviarte ayuda cercana</p>
                </div>
              </div>
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
                  <label htmlFor="desc_ubic">Dirección específica del lugar:</label>
                  <input
                    type="text"
                    id="desc_ubic"
                    name="desc_ubic"
                    value={formData.desc_ubic}
                    onChange={handleInputChange}
                    placeholder="Se completará automáticamente al detectar ubicación..."
                  />
                  <small style={{color: '#666', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block'}}>
                    💡 Este campo se completa automáticamente cuando detectas tu ubicación
                  </small>
                </div>
              </div>
              <div className="map-container">
                <MapComponent 
                  ref={mapRef}
                  onLocationSelect={handleLocationSelect}
                  onAddressChange={handleAddressChange}
                  height="400px"
                />
              </div>
            </div>
            {/* Contacto - Lado derecho, igual que antes */}
            <div className="paso1-card form-derecha">
              <div className="seccion-titulo">
                <div className="seccion-numero">2</div>
                <div className="seccion-info">
                  <h2>📞 Tus datos de contacto</h2>
                  <p>Para que los voluntarios puedan comunicarse contigo</p>
                </div>
              </div>
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

          {/* PASO 3: Sección de etiquetas/categorías */}
          <section className="tags-section">
            <div className="seccion-titulo">
              <div className="seccion-numero">3</div>
              <div className="seccion-info">
                <h2>🏷️ ¿Qué tipo de ayuda necesitas?</h2>
                <p>Selecciona todas las categorías que apliquen a tu situación</p>
              </div>
            </div>

            <div className="categorias-grid">
              {Object.entries(categorias).map(([key, categoria]) => (
                <div key={key} className="categoria-recuadro">
                  <div className="categoria-header">
                    <h3>{categoria.titulo}</h3>
                  </div>
                  <div className="etiquetas">
                    {categoria.opciones.map((opcion) => (
                      <label key={opcion.value} className="etiqueta">
                        <input
                          type="checkbox"
                          value={opcion.value}
                          checked={formData.tags.includes(opcion.value)}
                          onChange={(e) => handleTagChange(opcion.value, e.target.checked)}
                        />
                        <span>{opcion.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Opción "Otros" */}
            <div className="categoria-otros">
              <div className="categoria-recuadro">
                <div className="categoria-header">
                  <h3>🔧 Otros</h3>
                </div>
                <div className="etiquetas">
                  <label className="etiqueta">
                    <input
                      type="checkbox"
                      value="Otros"
                      checked={formData.tags.includes('Otros')}
                      onChange={(e) => handleTagChange('Otros', e.target.checked)}
                    />
                    <span>Otros (especificar)</span>
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
              <span>
                Acepto los <button 
                  type="button" 
                  className="terms-link"
                  onClick={() => setShowTermsModal(true)}
                >
                  términos y condiciones
                </button> y autorizo el tratamiento de mis datos personales para gestionar mi solicitud de ayuda. Comprendo que mis datos serán utilizados únicamente para coordinar la asistencia solicitada y se manejarán de acuerdo con la normativa de protección de datos vigente.
              </span>
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
             {/* Emergency Notice */}
        <section className="emergency-notice">
          <div className="container">
            <div className="notice-content">
              <div className="notice-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="notice-text">
                <h3>¿Es una Emergencia?</h3>
                <p>Si estás en una situación de emergencia inmediata, no uses este formulario. Llama directamente al <strong>112</strong> o a los servicios de emergencia locales.</p>
              </div>
              <a href="tel:112" className="btn-emergency">
                <i className="fas fa-phone"></i>
                Llamar 112
              </a>
            </div>
          </div>
        </section>
          </div>
         
        </form>
      </div>

      {/* Modal de términos y condiciones */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content terms-modal" onClick={(e) => e.stopPropagation()}>
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
              <h4>Términos y Condiciones de Uso – SomAqui.cat</h4>
              <p><strong>Última actualización: julio de 2025</strong></p>
              
              <div className="terms-content">
                <h5>1. Objeto del servicio</h5>
                <p>SomAqui.cat permite a los usuarios registrarse para compartir su ubicación aproximada y necesidades específicas mediante etiquetas, conectarse con personas u organizaciones dispuestas a colaborar y participar en iniciativas comunitarias.</p>
                
                <h5>2. Registro de usuarios</h5>
                <p>Se recopilan datos como nombre/alias, correo electrónico y ubicación aproximada. El usuario debe proporcionar información veraz.</p>
                
                <h5>3. Protección de datos personales</h5>
                <p>Se aplica el RGPD. Los datos se tratan confidencialmente y no se comparten sin consentimiento.</p>
                
                <h5>4. Uso adecuado</h5>
                <p>Está prohibido el uso con fines fraudulentos, políticos, comerciales o discriminatorios.</p>
                
                <h5>5. Limitación de responsabilidad</h5>
                <p>SomAqui.cat actúa como intermediario. No garantiza la veracidad ni disponibilidad de ayuda.</p>
                
                <h5>6. Modificaciones</h5>
                <p>Nos reservamos el derecho a modificar los términos en cualquier momento.</p>
                
                <h5>7. Aceptación</h5>
                <p>Usar la plataforma implica aceptar estos términos.</p>
                
                <h4>Política de Privacidad</h4>
                <p><strong>Responsable:</strong> SomAqui.cat</p>
                <p><strong>Finalidad:</strong> Plataforma de ayuda comunitaria. Datos tratados para conectar necesidades con ayuda local.</p>
                <p><strong>Base legal:</strong> Consentimiento del usuario.</p>
                <p><strong>Acceso a datos:</strong> Solo el equipo de SomAqui.cat. No hay cesiones sin consentimiento.</p>
                <p><strong>Conservación:</strong> Mientras seas usuario. Puedes solicitar la eliminación.</p>
                <p><strong>Seguridad:</strong> Se aplican medidas técnicas y organizativas de protección.</p>
                <p><strong>Derechos:</strong> Acceso, rectificación, eliminación, oposición. Contacta con nosotros para ejercerlos.</p>
              </div>
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
