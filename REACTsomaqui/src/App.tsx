import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import FormularioAyuda from './pages/FormularioAyuda';
import Voluntario from './pages/Voluntario';
import QuieroDonar from './pages/QuieroDonar';
import Equipo from './pages/Equipo';
import MisionVision from './pages/MisionVision';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import Contacto from './pages/Contacto';
import Emergencias from './pages/Emergencias';
import Chat from './pages/Chat';
import './App.css';
import './styles/global.css';

// otros imports...


function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const openLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const openRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  // Cierra modal al iniciar sesión con éxito
  const handleLoginSuccess = () => {
    closeModals();
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header onLoginClick={openLoginModal} />
          <main>
            <Routes>
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/" element={<Home />} />
              <Route path="/formulario-ayuda" element={<FormularioAyuda />} />
              <Route path="/ayuda" element={<FormularioAyuda />} />
              <Route path="/emergencias" element={<Emergencias />} />
              <Route path="/voluntario" element={<Voluntario />} />
              <Route path="/quiero-donar" element={<QuieroDonar />} />
              <Route path="/equipo" element={<Equipo />} />
              <Route path="/mision-vision" element={<MisionVision />} />
              <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>
          <Footer />

          {showLoginModal && (
            <LoginModal
              onClose={closeModals}
              switchToRegister={openRegisterModal}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {showRegisterModal && (
            <RegisterModal
              onClose={closeModals}
              onSwitchToLogin={openLoginModal}
              onRegisterSuccess={handleLoginSuccess}
            />
          )}

          {/* Botón de scroll to top global */}
          <ScrollToTop />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
