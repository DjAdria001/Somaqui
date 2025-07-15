<?php
// enviar_mensaje.php
header('Content-Type: application/json');

// Conexión a la base de datos
$conexion = new mysqli('localhost', 'root', '', 'somaqui');
if ($conexion->connect_error) {
    echo json_encode(['error' => 'Error de conexión a la base de datos']);
    exit;
}

// Recibir datos POST
$conversacion_id = isset($_POST['conversacion_id']) ? (int)$_POST['conversacion_id'] : 0;
$autor_id = isset($_POST['autor_id']) ? (int)$_POST['autor_id'] : 0;
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

if ($conversacion_id <= 0 || $autor_id <= 0 || $mensaje === '') {
    echo json_encode(['error' => 'Faltan datos obligatorios']);
    exit;
}

// Insertar mensaje
$stmt = $conexion->prepare("INSERT INTO mensajes (conversacion_id, autor_id, mensaje, enviado_en) VALUES (?, ?, ?, NOW())");
if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación de la consulta']);
    exit;
}

$stmt->bind_param('iis', $conversacion_id, $autor_id, $mensaje);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'mensaje_id' => $stmt->insert_id]);
} else {
    echo json_encode(['error' => 'Error al guardar el mensaje']);
}

$stmt->close();
$conexion->close();
exit;
?>
