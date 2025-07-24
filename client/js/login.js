const loginBtn = document.getElementById("btn-login");
const popup = document.getElementById("popup-login");
const cerrar = document.getElementById("cerrar-popup");

loginBtn.addEventListener("click", () => {
  // Usar la nueva función para ajustar tamaño automáticamente
  if (window.mostrarPopupLogin) {
    window.mostrarPopupLogin('login.html');
  } else {
    // Fallback si la función no está disponible
    popup.style.display = "flex";
  }
});

cerrar.addEventListener("click", () => {
  popup.style.display = "none";
});

// Opcional: cerrar si se hace clic fuera del cuadro
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});