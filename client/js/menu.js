// Menú hamburguesa y dropdown móvil y escritorio con click

    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdownLinks = document.querySelectorAll('.nav-item.dropdown > .nav-link');

    // Toggle menú hamburguesa
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('show');
    });

    // Toggle dropdown en desktop y móvil, evitando navegación en padre
    dropdownLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault(); // Evitar navegación en el enlace padre
        const parent = link.parentElement;
        const isExpanded = parent.classList.toggle('expanded');
        link.setAttribute('aria-expanded', isExpanded);
      });
    });

    // Al cambiar tamaño ventana, reset menú y dropdowns
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navList.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', false);
        dropdownLinks.forEach(link => {
          const parent = link.parentElement;
          parent.classList.remove('expanded');
          link.setAttribute('aria-expanded', false);
        });
      }
    });