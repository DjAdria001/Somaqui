<?php
session_start();
if (!isset($_SESSION['correo_solicitante'])) {
  die("Acceso denegado.");
}

$correo = $_SESSION['correo_solicitante'];
$conversacion_id = intval($_GET['id']);
$conexion = new mysqli("localhost", "root", "", "somaqui");

$consulta = $conexion->prepare("SELECT * FROM conversaciones WHERE id = ? AND correo_solicitante = ?");
$consulta->bind_param("is", $conversacion_id, $correo);
$consulta->execute();
$resultado = $consulta->get_result();

if ($resultado->num_rows === 0) {
  echo "No tienes permiso para ver esta conversación.";
  exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Chat – SomAqui.cat</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; margin: 0; background: #f0fdfd; padding: 2rem; }
    .chat-box { max-width: 700px; margin: auto; background: white; border-radius: 10px; padding: 1.5rem; border: 2px solid #39e4c9; box-shadow: 0 0 10px rgba(57,228,201,0.2); }
    .mensajes { max-height: 400px; overflow-y: auto; margin-bottom: 1rem; border: 1px solid #ccc; padding: 1rem; border-radius: 8px; background: #f9ffff; }
    .mensaje { margin-bottom: 1rem; }
    .mensaje.propio { text-align: right; color: #007d70; }
    .mensaje.otro { text-align: left; color: #444; }
    form { display: flex; gap: 0.5rem; }
    input[type="text"] { flex: 1; padding: 0.7rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem; }
    button { background: #39e4c9; color: white; border: none; padding: 0.7rem 1.2rem; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="chat-box">
    <h2>Chat de emergencia</h2>
    <div id="mensajes" class="mensajes"></div>
    <form id="form-chat">
      <input type="text" id="mensaje" placeholder="Escribe tu mensaje..." required />
      <button type="submit">Enviar</button>
    </form>
  </div>

  <script>
    const conversacionId = <?= $conversacion_id ?>;
    const mensajesDiv = document.getElementById("mensajes");

    function cargarMensajes() {
      fetch("obtener_mensajes.php?id=" + conversacionId)
        .then(res => res.json())
        .then(datos => {
          mensajesDiv.innerHTML = "";
          datos.forEach(m => {
            const div = document.createElement("div");
            div.className = "mensaje " + (m.origen === "solicitante" ? "propio" : "otro");
            div.textContent = m.mensaje;
            mensajesDiv.appendChild(div);
          });
          mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
        });
    }

    document.getElementById("form-chat").addEventListener("submit", e => {
      e.preventDefault();
      const msg = document.getElementById("mensaje").value.trim();
      if (msg === "") return;
      fetch("enviar_mensaje.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "id=" + conversacionId + "&mensaje=" + encodeURIComponent(msg)
      }).then(() => {
        document.getElementById("mensaje").value = "";
        cargarMensajes();
      });
    });

    setInterval(cargarMensajes, 3000);
    cargarMensajes();
  </script>
</body>
</html>
