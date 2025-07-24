import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/registro.css';

interface FormData {
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  fechaNacimiento: string;
  ubicacion: string;
  habilidades: string[];
  disponibilidad: string[];
  experiencia: string;
  motivacion: string;
  emergencias: boolean;
  terminos: boolean;
  privacidad: boolean;
}

interface FormErrors {
  nombre?: string;
  apellidos?: string;
  correo?: string;
  telefono?: string;
  password?: string;
  confirmPassword?: string;
  fechaNacimiento?: string;
  ubicacion?: string;
  terminos?: string;
  privacidad?: string;
}

const Registro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    ubicacion: '',
    habilidades: [],
    disponibilidad: [],
    experiencia: '',
    motivacion: '',
    emergencias: false,
    terminos: false,
    privacidad: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const habilidadesDisponibles = [
    'Primeros auxilios',
    'Transporte',
    'Cocina',
    'Limpieza',
    'Cuidado de personas mayores',
    'Cuidado de niños',
    'Apoyo emocional',
    'Traducción',
    'Reparaciones menores',
    'Jardinería',
    'Informática básica',
    'Otros'
  ];

  const disponibilidadOpciones = [
    'Mañanas (8:00-14:00)',
    'Tardes (14:00-20:00)',
    'Noches (20:00-24:00)',
    'Fines de semana',
    'Días festivos',
    'Emergencias 24h'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleArrayChange = (name: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...(prev[name] as string[]), value]
        : (prev[name] as string[]).filter(item => item !== value)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'El correo no tiene un formato válido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    if (!formData.ubicacion.trim()) newErrors.ubicacion = 'La ubicación es obligatoria';
    if (!formData.terminos) newErrors.terminos = 'Debes aceptar los términos y condiciones';
    if (!formData.privacidad) newErrors.privacidad = 'Debes aceptar la política de privacidad';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí iría la llamada a la API
      console.log('Datos de registro:', formData);
      
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('¡Registro completado exitosamente! Te hemos enviado un correo de confirmación.');
      
      // Redireccionar o resetear formulario
      setFormData({
        nombre: '',
        apellidos: '',
        correo: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        fechaNacimiento: '',
        ubicacion: '',
        habilidades: [],
        disponibilidad: [],
        experiencia: '',
        motivacion: '',
        emergencias: false,
        terminos: false,
        privacidad: false,
      });
      
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error al procesar el registro. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registro-container">
      <header className="registro-header">
        <h1>¡Únete a SomAqui.cat!</h1>
        <p>Regístrate para ser parte de nuestra comunidad de voluntarios</p>
      </header>

      <div className="registro-content">
        <form onSubmit={handleSubmit} className="registro-form">
          {/* Información personal */}
          <section className="form-section">
            <h2>📋 Información Personal</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={errors.nombre ? 'error' : ''}
                  required
                />
                {errors.nombre && <span className="error-message">{errors.nombre}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="apellidos">Apellidos *</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  className={errors.apellidos ? 'error' : ''}
                  required
                />
                {errors.apellidos && <span className="error-message">{errors.apellidos}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="correo">Correo Electrónico *</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className={errors.correo ? 'error' : ''}
                  required
                />
                {errors.correo && <span className="error-message">{errors.correo}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className={errors.telefono ? 'error' : ''}
                  placeholder="+34 123 456 789"
                  required
                />
                {errors.telefono && <span className="error-message">{errors.telefono}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Contraseña *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  required
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  className={errors.fechaNacimiento ? 'error' : ''}
                  required
                />
                {errors.fechaNacimiento && <span className="error-message">{errors.fechaNacimiento}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="ubicacion">Ubicación (Ciudad/Municipio) *</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  className={errors.ubicacion ? 'error' : ''}
                  placeholder="Ej: Barcelona, Madrid..."
                  required
                />
                {errors.ubicacion && <span className="error-message">{errors.ubicacion}</span>}
              </div>
            </div>
          </section>

          {/* Habilidades y disponibilidad */}
          <section className="form-section">
            <h2>🛠️ Habilidades y Disponibilidad</h2>
            
            <div className="form-group">
              <label>Habilidades (selecciona todas las que apliquen)</label>
              <div className="checkbox-grid">
                {habilidadesDisponibles.map((habilidad) => (
                  <label key={habilidad} className="checkbox-item">
                    <input
                      type="checkbox"
                      value={habilidad}
                      checked={formData.habilidades.includes(habilidad)}
                      onChange={(e) => handleArrayChange('habilidades', habilidad, e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    {habilidad}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Disponibilidad horaria</label>
              <div className="checkbox-grid">
                {disponibilidadOpciones.map((opcion) => (
                  <label key={opcion} className="checkbox-item">
                    <input
                      type="checkbox"
                      value={opcion}
                      checked={formData.disponibilidad.includes(opcion)}
                      onChange={(e) => handleArrayChange('disponibilidad', opcion, e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    {opcion}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="experiencia">Experiencia previa en voluntariado</label>
              <textarea
                id="experiencia"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleInputChange}
                rows={4}
                placeholder="Cuéntanos sobre tu experiencia previa como voluntario (opcional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivacion">¿Qué te motiva a ser voluntario?</label>
              <textarea
                id="motivacion"
                name="motivacion"
                value={formData.motivacion}
                onChange={handleInputChange}
                rows={4}
                placeholder="Comparte tu motivación para ayudar a otros (opcional)"
              />
            </div>
          </section>

          {/* Preferencias */}
          <section className="form-section">
            <h2>⚡ Preferencias</h2>
            
            <div className="form-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="emergencias"
                  checked={formData.emergencias}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Estoy disponible para emergencias 24/7
              </label>
              <small>Al activar esta opción, podrás recibir notificaciones de emergencias fuera de tu horario habitual</small>
            </div>
          </section>

          {/* Términos y condiciones */}
          <section className="form-section">
            <h2>📄 Términos y Condiciones</h2>
            
            <div className="form-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="terminos"
                  checked={formData.terminos}
                  onChange={handleInputChange}
                  className={errors.terminos ? 'error' : ''}
                  required
                />
                <span className="checkmark"></span>
                Acepto los <Link to="/terminos" target="_blank">términos y condiciones</Link> de uso *
              </label>
              {errors.terminos && <span className="error-message">{errors.terminos}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="privacidad"
                  checked={formData.privacidad}
                  onChange={handleInputChange}
                  className={errors.privacidad ? 'error' : ''}
                  required
                />
                <span className="checkmark"></span>
                Acepto la <Link to="/privacidad" target="_blank">política de privacidad</Link> *
              </label>
              {errors.privacidad && <span className="error-message">{errors.privacidad}</span>}
            </div>
          </section>

          {/* Botón de envío */}
          <div className="submit-section">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Registrando...' : '🚀 Completar Registro'}
            </button>
            <p className="submit-help">
              Al registrarte, te unirás a nuestra comunidad de voluntarios y podrás empezar a ayudar a personas de tu zona.
            </p>
            <p className="login-link">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
