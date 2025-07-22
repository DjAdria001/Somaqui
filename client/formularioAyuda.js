
// Asegurar que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado');
    
    function toggleOtrosTexto() {
        document.getElementById('otros-texto-container').style.display =
            document.getElementById('otros-check').checked ? 'block' : 'none';
    }

    const map = L.map('map').setView([41.1189, 1.2445], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    const marker = L.marker([0, 0], { draggable: false }).addTo(map).setOpacity(0);

    const tarragonaBounds = L.latLngBounds([41.07, 1.18], [41.18, 1.33]);

    map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        if (tarragonaBounds.contains([lat, lng])) {
            marker.setLatLng([lat, lng]).setOpacity(1);
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                .then(res => res.json())
                .then(data => {
                    // Construir dirección de calle en lugar del nombre completo
                    let direccion = '';
                    if (data.address) {
                        const calle = data.address.road || data.address.pedestrian || data.address.path || '';
                        const numero = data.address.house_number || '';
                        const barrio = data.address.neighbourhood || data.address.suburb || '';
                        const ciudad = data.address.city || data.address.town || data.address.village || 'Tarragona';
                        
                        if (calle) {
                            direccion = calle;
                            if (numero) direccion += ` ${numero}`;
                            if (barrio && barrio !== ciudad) direccion += `, ${barrio}`;
                            direccion += `, ${ciudad}`;
                        } else {
                            direccion = `${ciudad} (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
                        }
                    } else {
                        direccion = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    }
                    
                    document.getElementById('ubicacion').value = direccion;
                    
                    // Actualizar botón con ubicación seleccionada
                    const btnUbicacion = document.getElementById('ubicacion-texto');
                    btnUbicacion.classList.remove('detectando');
                    btnUbicacion.classList.add('ubicacion-detectada');
                    btnUbicacion.textContent = `📍 ${direccion.split(',')[0]}`;
                    btnUbicacion.disabled = false;
                })
                .catch(() => {
                    const coordenadas = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    document.getElementById('ubicacion').value = coordenadas;
                    
                    // Actualizar botón con coordenadas
                    const btnUbicacion = document.getElementById('ubicacion-texto');
                    btnUbicacion.classList.remove('detectando');
                    btnUbicacion.classList.add('ubicacion-detectada');
                    btnUbicacion.textContent = `📍 ${coordenadas}`;
                    btnUbicacion.disabled = false;
                });
        } else {
            alert("Por favor, selecciona una ubicación dentro de Tarragona.");
        }
    });

    const btnDetectarUbicacion = document.getElementById('ubicacion-texto');

    // Verificar que el elemento existe
    if (!btnDetectarUbicacion) {
        console.error('No se encontró el elemento con ID "ubicacion-texto"');
    } else {
        console.log('Botón de ubicación encontrado correctamente');
        
        btnDetectarUbicacion.addEventListener('click', () => {
            console.log('Click detectado en botón de ubicación');
            
            if (!navigator.geolocation) {
                alert("Tu navegador no soporta la geolocalización.");
                return;
            }
            
            // Cambiar estado visual del botón
            btnDetectarUbicacion.classList.add('detectando');
            btnDetectarUbicacion.disabled = true;
            btnDetectarUbicacion.textContent = "🔍 Detectando ubicación...";
            
            console.log('Iniciando geolocalización...');

            navigator.geolocation.getCurrentPosition(position => {
                console.log('Ubicación obtenida:', position.coords);
                const { latitude: lat, longitude: lng } = position.coords;
                
                if (!tarragonaBounds.contains([lat, lng])) {
                    alert("Tu ubicación está fuera de Tarragona. Por favor, selecciona manualmente en el mapa.");
                    btnDetectarUbicacion.classList.remove('detectando');
                    btnDetectarUbicacion.disabled = false;
                    btnDetectarUbicacion.textContent = "📍 ¿Detectar mi ubicación automáticamente?";
                    return;
                }
                
                // Ubicar marcador y centrar mapa
                marker.setLatLng([lat, lng]).setOpacity(1);
                map.setView([lat, lng], 14);
                
                // Obtener dirección y actualizar campos
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                    .then(res => res.json())
                    .then(data => {
                        // Construir dirección de calle en lugar del nombre completo
                        let direccion = '';
                        if (data.address) {
                            const calle = data.address.road || data.address.pedestrian || data.address.path || '';
                            const numero = data.address.house_number || '';
                            const barrio = data.address.neighbourhood || data.address.suburb || '';
                            const ciudad = data.address.city || data.address.town || data.address.village || 'Tarragona';
                            
                            if (calle) {
                                direccion = calle;
                                if (numero) direccion += ` ${numero}`;
                                if (barrio && barrio !== ciudad) direccion += `, ${barrio}`;
                                direccion += `, ${ciudad}`;
                            } else {
                                direccion = `${ciudad} (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
                            }
                        } else {
                            direccion = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                        }
                        
                        document.getElementById('ubicacion').value = direccion;
                        
                        // Actualizar botón con ubicación detectada
                        btnDetectarUbicacion.classList.remove('detectando');
                        btnDetectarUbicacion.classList.add('ubicacion-detectada');
                        btnDetectarUbicacion.textContent = `📍 ${direccion.split(',')[0]}`;
                        btnDetectarUbicacion.disabled = false;
                        console.log('Ubicación actualizada correctamente');
                    })
                    .catch((error) => {
                            console.error('Error al obtener dirección:', error);
                        const coordenadas = `${lat.toFixed(4)},${lng.toFixed(4)}`;
                        document.getElementById('ubicacion').value = coordenadas;
                        
                        btnDetectarUbicacion.classList.remove('detectando');
                        btnDetectarUbicacion.classList.add('ubicacion-detectada');
                        btnDetectarUbicacion.textContent = `📍 ${coordenadas}`;
                        btnDetectarUbicacion.disabled = false;
                    });
            }, error => {
                console.error('Error de geolocalización:', error);
                alert("No se pudo obtener la ubicación automáticamente: " + error.message);
                btnDetectarUbicacion.classList.remove('detectando');
                btnDetectarUbicacion.disabled = false;
                btnDetectarUbicacion.textContent = "📍 ¿Detectar mi ubicación automáticamente?";
            }, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            });
        });
    }

    // Modal Términos y Condiciones
    const modal = document.getElementById('modal-terminos');
    const abrirTerminos = document.getElementById('abrir-terminos');

    abrirTerminos.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    function cerrarModal() {
        modal.style.display = 'none';
    }

    // Cerrar modal al clicar fuera del contenido
    modal.addEventListener('click', function (e) {
        if (e.target === modal) cerrarModal();
    });

    // Menú hamburguesa y dropdown móvil + escritorio con click
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdownLinks = document.querySelectorAll('.nav-item.dropdown > .nav-link');
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('show');
    });
    dropdownLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const parent = link.parentElement;
            const expanded = parent.classList.toggle('expanded');
            link.setAttribute('aria-expanded', expanded);
        });
    });
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
    
    /* Resalta campo activo */
    const campos = document.querySelectorAll('input, textarea');
    campos.forEach(el => {
        el.addEventListener('focus', () => el.classList.add('input-activo'));
        el.addEventListener('blur', () => el.classList.remove('input-activo'));
    });
    
    // Animación suave para campo "Otros"
    const otrosCheck = document.getElementById('otros-check');
    const otrosCont = document.getElementById('otros-texto-container');
    if (otrosCheck && otrosCont) {
        otrosCheck.addEventListener('change', () => {
            if (otrosCheck.checked) {
                otrosCont.classList.add('visible');
            } else {
                otrosCont.classList.remove('visible');
            }
        });
    }
    
    // Scroll animado al primer error
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        const primerError = form.querySelector(':invalid');
        if (primerError) {
            e.preventDefault();
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            primerError.classList.add('input-activo');
            setTimeout(() => primerError.classList.remove('input-activo'), 1500);
        } else {
            e.preventDefault();
            mostrarMensajeExito();
            form.reset();
            if (otrosCont) otrosCont.classList.remove('visible');
        }
    });
    
    // Mensaje de éxito animado
    function mostrarMensajeExito() {
        let msg = document.createElement('div');
        msg.className = 'mensaje-exito-animado';
        msg.textContent = '¡Solicitud enviada con éxito!';
        form.parentNode.insertBefore(msg, form);
        setTimeout(() => msg.remove(), 3000);
    }
    
    // Funcionalidad del login (popup)
    const loginBtn = document.getElementById("btn-login");
    const popupLogin = document.getElementById("popup-login");
    const cerrarPopup = document.getElementById("cerrar-popup");

    if (loginBtn && popupLogin && cerrarPopup) {
      loginBtn.addEventListener("click", () => {
        popupLogin.style.display = "flex";
      });

      cerrarPopup.addEventListener("click", () => {
        popupLogin.style.display = "none";
      });

      // Opcional: cerrar si se hace clic fuera del cuadro
      popupLogin.addEventListener("click", (e) => {
        if (e.target === popupLogin) popupLogin.style.display = "none";
      });
    }

    // Acordeón de categorías
    const titulos = document.querySelectorAll('.grupo-titulo');
    titulos.forEach(titulo => {
      titulo.addEventListener('click', () => {
        const etiquetas = titulo.nextElementSibling;
        if (etiquetas && etiquetas.classList.contains('etiquetas')) {
          etiquetas.classList.toggle('cerrado');
        }
      });
    });

    // Hacer toggleOtrosTexto disponible globalmente
    window.toggleOtrosTexto = toggleOtrosTexto;
    window.cerrarModal = cerrarModal;
});
