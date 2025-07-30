
import React from 'react';

const Emergencias: React.FC = () => {
  return (
    <main className="emergencias-page">
      {/* Header Section */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-text">
              <h1>Emergencias Activas</h1>
              <p className="subtitle">
                Encuentra emergencias reportadas cerca de ti y ofrece tu ayuda como voluntario
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contenido de la página */}
      <section className="emergencias-content">
        <div className="container">
          <p>Aquí puedes ver las emergencias reportadas y ofrecer tu ayuda.</p>
          {/* Aquí se agregaría el contenido de emergencias */}
        </div>
      </section>
    </main>
  );
};

export default Emergencias;
