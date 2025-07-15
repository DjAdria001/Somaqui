<?php
// chat.php
session_start();

// Para probar sin login, define manualmente:
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$usuario_id = $_SESSION['usuario_id'] ?? 1;  // aquí pone 1 para test si no hay sesión
$esCreador = true; // o lógica tuya

if ($id <= 0) {
    die('Falta id de conversación');
}
if ($usuario_id <= 0) {
    die('Falta usuario conectado');
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Chat – Emergencia #<?= htmlspecialchars($id) ?></title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #e6fdfd;
      color: #003333;
      padding: 2rem;
      display: flex;
      justify-content: center;
    }

    .chat-box {
      width: 100%;
      max-width: 700px;
      background: white;
      border: 2px solid #39e4c9;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 0 12px rgba(0,0,0,0.1);
    }

    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .chat-header h2 {
      margin: 0;
      font-size: 1.3rem;
    }

    .cerrar-btn {
      background: none;
      border: none;
      cursor: pointer;
    }

    .cerrar-btn img {
      width: 28px;
    }

    .mensajes {
      max-height: 350px;
      overflow-y: auto;
      padding: 1rem;
      background: #e6fffa;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .burbuja {
      background: white;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border-radius: 10px;
      border-left: 4px solid #39e4c9;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .burbuja .autor {
      font-size: 0.9rem;
      color: #006e5f;
      margin-bottom: 0.3rem;
    }

    .burbuja .hora {
      float: right;
      font-size: 0.8rem;
      color: #999;
    }

    .burbuja .texto {
      font-size: 1rem;
      color: #333;
    }

    form {
      display: flex;
      gap: 0.5rem;
    }

    input[type="text"] {
      flex: 1;
      padding: 0.7rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    button[type="submit"] {
      background: #39e4c9;
      color: white;
      padding: 0 1rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }

    #confirmModal {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.4);
      display: none;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
    }

    .modal-content button {
      font-size: 2rem;
      border: none;
      background: none;
      cursor: pointer;
      margin: 0 1rem;
    }

    .modal-content .yes { color: green; }
    .modal-content .no { color: red; }
  </style>
</head>
<body>
<div class="chat-box">
  <div class="chat-header">
    <h2>Emergencia #<?= htmlspecialchars($id) ?></h2>
    <?php if ($esCreador): ?>
    <button class="cerrar-btn" onclick="abrirConfirmacion()">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Check_mark_icon.svg/1024px-Check_mark_icon.svg.png" alt="Cerrar">
    </button>
    <?php endif; ?>
  </div>

  <div id="mensajes" class="mensajes">
    <!-- Mensajes cargados por JS -->
  </div>

  <form id="formMensaje">
    <input type="hidden" name="conversacion_id" value="<?= htmlspecialchars($id) ?>">
    <input type="hidden" name="autor_id" value="<?= htmlspecialchars($usuario_id) ?>">
    <input type="text" name="mensaje" placeholder="Escribe tu mensaje..." required autocomplete="off" />
    <button type="submit">Enviar</button>
  </form>
</div>

<?php if ($esCreador): ?>
<div id="confirmModal">
  <div class="modal-content">
    <p>¿Desea finalizar la Emergencia?</p>
    <button class="yes" onclick="window.location.href='cerrar_emergencia.php?id=<?= htmlspecialchars($id) ?>'">✔</button>
    <button class="no" onclick="cerrarConfirmacion()">✖</button>
  </div>
</div>
<?php endif; ?>

<script>
function cargarMensajes() {
  const id = <?= json_encode($id) ?>;
  fetch('obtener_mensajes.php?id=' + encodeURIComponent(id))
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById('mensajes');
      contenedor.innerHTML = '';

      if (!data.length) {
        contenedor.innerHTML = '<p style="text-align:center;">Sin mensajes todavía.</p>';
        return;
      }

      data.forEach(msg => {
        const burbuja = document.createElement('div');
        burbuja.className = 'burbuja';
        burbuja.innerHTML = `
          <div class="autor"><strong>${msg.correo}</strong> <span class="hora">${msg.hora}</span></div>
          <div class="texto">${msg.mensaje}</div>
        `;
        contenedor.appendChild(burbuja);
      });

      contenedor.scrollTop = contenedor.scrollHeight;
    })
    .catch(err => console.error('Error cargando mensajes:', err));
}

document.getElementById('formMensaje').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch('enviar_mensaje.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      this.mensaje.value = '';
      cargarMensajes();
    } else {
      alert('Error al enviar mensaje: ' + (data.error || 'desconocido'));
    }
  })
  .catch(err => {
    alert('Error en la comunicación con el servidor');
    console.error(err);
  });
});

setInterval(cargarMensajes, 3000);
cargarMensajes();

function abrirConfirmacion() {
  document.getElementById('confirmModal').style.display = 'flex';
}
function cerrarConfirmacion() {
  document.getElementById('confirmModal').style.display = 'none';
}
</script>
</body>
</html>
