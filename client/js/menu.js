// Menú hamburguesa y dropdown móvil y escritorio con click
document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu.js cargado correctamente');
    
    // Elementos del menú
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    const dropdownLinks = document.querySelectorAll('.nav-item.dropdown > .nav-link');
    
    console.log('Elementos encontrados:');
    console.log('menuToggle:', menuToggle);
    console.log('navList:', navList);
    console.log('dropdownItems:', dropdownItems.length);
    console.log('dropdownLinks:', dropdownLinks.length);

    // Toggle menú hamburguesa
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Click en menú hamburguesa');
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('show');
        });
    }

    // Toggle dropdown - Método mejorado
    dropdownItems.forEach(function(dropdown, index) {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            console.log(`Configurando dropdown ${index + 1}`);
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Click en dropdown detectado');
                
                // Cerrar otros dropdowns
                dropdownItems.forEach(function(otherDropdown) {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('expanded');
                        const otherLink = otherDropdown.querySelector('.nav-link');
                        if (otherLink) {
                            otherLink.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle del dropdown actual
                const isExpanded = dropdown.classList.toggle('expanded');
                link.setAttribute('aria-expanded', isExpanded);
                
                console.log('Dropdown expandido:', isExpanded);
                console.log('Clases del dropdown:', dropdown.className);
            });
        }
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
            dropdownItems.forEach(function(dropdown) {
                dropdown.classList.remove('expanded');
                const link = dropdown.querySelector('.nav-link');
                if (link) {
                    link.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // Al cambiar tamaño ventana, reset menú y dropdowns
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navList) navList.classList.remove('show');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            
            dropdownItems.forEach(function(dropdown) {
                dropdown.classList.remove('expanded');
                const link = dropdown.querySelector('.nav-link');
                if (link) {
                    link.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});