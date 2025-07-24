import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FormularioAyuda from './pages/FormularioAyuda';
import Voluntario from './pages/Voluntario';
import Equipo from './pages/Equipo';
import MisionVision from './pages/MisionVision';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import Contacto from './pages/Contacto';
import './App.css';
import './styles/global.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleTermsClick = () => {
    setShowTermsModal(true);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header onLoginClick={handleLoginClick} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/formulario-ayuda" element={<FormularioAyuda />} />
              <Route path="/ayuda" element={<FormularioAyuda />} />
              <Route path="/voluntario" element={<Voluntario />} />
              <Route path="/equipo" element={<Equipo />} />
              <Route path="/mision-vision" element={<MisionVision />} />
              <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>
          <Footer onTermsClick={handleTermsClick} />

          {/* Login Modal */}
          {showLoginModal && (
            <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Iniciar Sesión</h3>
                  <button 
                    className="modal-close"
                    onClick={() => setShowLoginModal(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <form className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" required />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Iniciar Sesión</button>
                    <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                  </div>
                </form>
                <div className="register-link">
                  <p>¿No tienes cuenta? <a href="#">Regístrate aquí</a></p>
                </div>
              </div>
            </div>
          )}

          {/* Terms Modal */}
          {showTermsModal && (
            <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
              <div className="modal-content terms-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Términos y Condiciones</h3>
                  <button 
                    className="modal-close"
                    onClick={() => setShowTermsModal(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="terms-content">
                  <h4>1. Aceptación de los Términos</h4>
                  <p>Al utilizar SomAqui.cat, aceptas estos términos y condiciones en su totalidad.</p>
                  
                  <h4>2. Descripción del Servicio</h4>
                  <p>SomAqui.cat es una plataforma que conecta personas que necesitan ayuda con voluntarios disponibles durante emergencias.</p>
                  
                  <h4>3. Responsabilidades del Usuario</h4>
                  <p>Los usuarios se comprometen a proporcionar información veraz y a usar la plataforma de manera responsable.</p>
                  
                  <h4>4. Limitación de Responsabilidad</h4>
                  <p>SomAqui.cat facilita las conexiones pero no se hace responsable de las acciones de los voluntarios o usuarios.</p>
                  
                  <h4>5. Privacidad</h4>
                  <p>Respetamos tu privacidad y protegemos tus datos según nuestra política de privacidad.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
