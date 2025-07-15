<?php
// obtener_mensajes.php
header('Content-Type: application/json');

$conexion = new mysqli('localhost', 'root', '', 'somaqui');
if ($conexion->connect_error) {
    echo json_encode([]);
    exit;
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    echo json_encode([]);
    exit;
}

// Consulta mensajes con correo del autor (asumiendo tabla usuarios con id y correo)
$query = "
  SELECT m.mensaje, m.enviado_en, u.correo 
  FROM mensajes m
  JOIN usuarios u ON u.id = m.autor_id
  WHERE m.conversacion_id = ?
  ORDER BY m.enviado_en ASC
";

$stmt = $conexion->prepare($query);
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();

$mensajes = [];
while ($row = $result->fetch_assoc()) {
    $mensajes[] = [
        'mensaje' => htmlspecialchars($row['mensaje']),
        'correo' => htmlspecialchars($row['correo']),
        'hora' => date('H:i', strtotime($row['enviado_en']))
    ];
}

$stmt->close();
$conexion->close();

echo json_encode($mensajes);
exit;
?>