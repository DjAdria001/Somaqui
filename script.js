<script>
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
</script>
<!-- POPUP LOGIN CON IFRAME -->
<div id="popup-login" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index:1000;">
  <div style="background:white; padding:0; border-radius:10px; width:90%; max-width:400px; height:80%; position:relative; box-shadow: 0 0 20px rgba(0,0,0,0.2);">
    <button id="cerrar-popup" style="position:absolute; top:0.5rem; right:0.5rem; background:none; border:none; font-size:1.5rem; cursor:pointer;">×</button>
    <iframe src="login.html" style="width:100%; height:100%; border:none; border-radius:10px;"></iframe>
  </div>
</div>

<script>
  const loginBtn = document.getElementById("btn-login");
  const popup = document.getElementById("popup-login");
  const cerrar = document.getElementById("cerrar-popup");

  loginBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  cerrar.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Opcional: cerrar si se hace clic fuera del cuadro
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
</script>