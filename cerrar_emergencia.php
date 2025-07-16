<?php
session_start();

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID no válido");
}

$conversacion_id = (int) $_GET['id'];

$conexion = new mysqli('localhost', 'root', '', 'somaqui');
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$errores = [];

// 1. Obtener el ID de la emergencia asociada
$result = $conexion->query("SELECT id_emergencia FROM conversaciones WHERE id = $conversacion_id");
if ($result && $row = $result->fetch_assoc()) {
    $emergencia_id = (int) $row['id_emergencia'];
} else {
    die("No se encontró la conversación con ID $conversacion_id");
}

// 2. Borrar los mensajes
if (!$conexion->query("DELETE FROM mensajes WHERE conversacion_id = $conversacion_id")) {
    $errores[] = "Error al borrar mensajes: " . $conexion->error;
}

// 3. Borrar la conversación
if (!$conexion->query("DELETE FROM conversaciones WHERE id = $conversacion_id")) {
    $errores[] = "Error al borrar conversación: " . $conexion->error;
}

// 4. Borrar la emergencia
if (!$conexion->query("DELETE FROM peticiones_ayuda WHERE id = $emergencia_id")) {
    $errores[] = "Error al borrar emergencia: " . $conexion->error;
}

$conexion->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Emergencia cerrada</title>
  <meta http-equiv="refresh" content="4;URL=Home.html">
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f0fff9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: #006e5f;
    }
    .mensaje {
      text-align: center;
      background: #ffffff;
      padding: 2rem 3rem;
      border-radius: 12px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
    }
    .mensaje h1 {
      color: #39e4c9;
      margin-bottom: 1rem;
    }
    .mensaje p {
      font-size: 1.1rem;
    }
  </style>
</head>
<body>
<div class="mensaje">
  <?php if (!empty($errores)): ?>
    <h1>⚠️ Error al cerrar emergencia</h1>
    <ul style="color: red;">
      <?php foreach ($errores as $e) echo "<li>$e</li>"; ?>
    </ul>
    <p><a href="Home.html">Volver manualmente</a></p>
  <?php else: ?>
    <h1>✅ Emergencia cerrada</h1>
    <p>Serás redirigido automáticamente a la página principal en unos segundos...</p>
  <?php endif; ?>
</div>
</body>
</html>
