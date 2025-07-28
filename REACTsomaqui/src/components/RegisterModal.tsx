import React, { useState } from 'react';
import { auth, database } from '../firebase'; // Ajusta la ruta según dónde esté tu archivo firebase.ts
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ref, set } from 'firebase/database';


interface FormData {
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  fechaNacimiento: string;
  ubicacion: string;
  terminos: boolean;
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
}

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    ubicacion: '',
    terminos: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

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
    if (!formData.terminos) newErrors.terminos = 'Debes aceptar los términos y condiciones y la política de privacidad';

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
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    formData.correo,
    formData.password
  );

  const user = userCredential.user;

  // Guardar usuario en la base de datos
  await set(ref(database, 'usuarios/' + user.uid), {
    nombre: formData.nombre,
    apellidos: formData.apellidos,
    correo: formData.correo,
    telefono: formData.telefono,
    fechaNacimiento: formData.fechaNacimiento,
    ubicacion: formData.ubicacion,
  });

  // Enviar correo de verificación
  await sendEmailVerification(user);

  alert('¡Registro completado exitosamente! Te hemos enviado un correo de confirmación.');
  onClose();

  // Limpiar formulario
  setFormData({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    ubicacion: '',
    terminos: false,
  });

} catch (error: any) {
  console.error('Error en el registro:', error);
  if (error.code === 'auth/email-already-in-use') {
    alert('El correo ya está registrado.');
  } else {
    alert('Error al procesar el registro. Por favor, inténtalo de nuevo.');
  }
}

  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content register-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Únete a SomAqui.cat</h3>
          <button 
            className="modal-close"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
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

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleInputChange}
                className={errors.terminos ? 'error' : ''}
                required
              />
              <span className="checkmark"></span>
              Acepto los términos y condiciones y la política de privacidad *
            </label>
            {errors.terminos && <span className="error-message">{errors.terminos}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
        
        <div className="login-link">
          <p>¿Ya tienes cuenta? <button type="button" onClick={onSwitchToLogin} className="link-button">Inicia sesión aquí</button></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
