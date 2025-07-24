// Función para cargar el header dinámicamente
async function loadHeader() {
  try {
    // Cargar el HTML del header
    const response = await fetch('components/header.html');
    const headerHTML = await response.text();
    
    // Insertar el header en el contenedor
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = headerHTML;
      
      // Marcar la página activa después de cargar el header
      markActivePage();
      
      // Inicializar funcionalidad del menú después de cargar
      initializeMenu();
    }
  } catch (error) {
    console.error('Error al cargar el header:', error);
    // Fallback: mostrar un header básico si falla la carga
    showFallbackHeader();
  }
}

// Función para marcar la página activa en el menú
function markActivePage() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'Home.html')) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('active');
    } else {
      link.removeAttribute('aria-current');
      link.classList.remove('active');
    }
  });
}

// Función para inicializar la funcionalidad del menú
function initializeMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('show');
    });
  }

  // Funcionalidad del dropdown para desktop
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const menu = item.querySelector('.dropdown-menu');

    if (link && menu) {
      // Hover para desktop
      item.addEventListener('mouseenter', () => {
        menu.style.display = 'block';
        link.setAttribute('aria-expanded', 'true');
      });

      item.addEventListener('mouseleave', () => {
        menu.style.display = 'none';
        link.setAttribute('aria-expanded', 'false');
      });

      // Click para móvil
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const isOpen = menu.style.display === 'block';
          menu.style.display = isOpen ? 'none' : 'block';
          link.setAttribute('aria-expanded', !isOpen);
        }
      });
    }
  });
}

// Función de respaldo si falla la carga del componente
function showFallbackHeader() {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <a href="Home.html" class="logo">
          <img src="Imagenes/LogoSF.png" alt="Logo SomAqui.cat" />
          SomAqui.cat
        </a>
        <nav class="main-nav">
          <ul class="nav-list">
            <li class="nav-item"><a href="Home.html" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="FormularioAyuda.html" class="nav-link">Necesito Ayuda</a></li>
            <li class="nav-item"><a href="Ayudar.html" class="nav-link">Quiero ser voluntario</a></li>
          </ul>
        </nav>
      </header>
    `;
    markActivePage();
  }
}

// Cargar el header cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadHeader);
