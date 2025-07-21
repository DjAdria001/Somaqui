
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
                document.getElementById('ubicacion').value = data.display_name || `${lat},${lng}`;
            })
            .catch(() => {
                document.getElementById('ubicacion').value = `${lat},${lng}`;
            });
    } else {
        alert("Por favor, selecciona una ubicación dentro de Tarragona.");
    }
});

const btnDetectarUbicacion = document.getElementById('btn-detectar-ubicacion');
btnDetectarUbicacion.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert("Tu navegador no soporta la geolocalización.");
        return;
    }
    btnDetectarUbicacion.disabled = true;
    btnDetectarUbicacion.textContent = "Detectando ubicación...";

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude: lat, longitude: lng } = position.coords;
        if (!tarragonaBounds.contains([lat, lng])) {
            alert("Tu ubicación está fuera de Tarragona. Por favor, selecciona manualmente en el mapa.");
            btnDetectarUbicacion.disabled = false;
            btnDetectarUbicacion.textContent = "¿Quieres que detectemos tu ubicación automáticamente?";
            return;
        }
        marker.setLatLng([lat, lng]).setOpacity(1);
        map.setView([lat, lng], 14);
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('ubicacion').value = data.display_name || `${lat},${lng}`;
            })
            .finally(() => {
                btnDetectarUbicacion.disabled = false;
                btnDetectarUbicacion.textContent = "¿Quieres que detectemos tu ubicación automáticamente?";
            });
    }, error => {
        alert("No se pudo obtener la ubicación automáticamente: " + error.message);
        btnDetectarUbicacion.disabled = false;
        btnDetectarUbicacion.textContent = "¿Quieres que detectemos tu ubicación automáticamente?";
    }, {
        enableHighAccuracy: true,
        timeout: 10000
    });
});

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
// 2. Animación suave para campo "Otros"
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
// 3. Scroll animado al primer error
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
// 4. Mensaje de éxito animado
function mostrarMensajeExito() {
    let msg = document.createElement('div');
    msg.className = 'mensaje-exito-animado';
    msg.textContent = '¡Solicitud enviada con éxito!';
    form.parentNode.insertBefore(msg, form);
    setTimeout(() => msg.remove(), 3000);
}
// 5. Spinner en botón ubicación
const btnUbic = document.getElementById('btn-detectar-ubicacion');
if (btnUbic) {
    btnUbic.addEventListener('click', () => {
        const spinner = document.createElement('span');
        spinner.className = 'spinner';
        btnUbic.appendChild(spinner);
        setTimeout(() => {
            if (spinner.parentNode) spinner.parentNode.removeChild(spinner);
        }, 4000);
    });
}
