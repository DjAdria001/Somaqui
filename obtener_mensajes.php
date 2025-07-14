<?php
$conexion = new mysqli("localhost", "root", "", "somaqui");
$conversacion_id = intval($_GET['id']);

$consulta = $conexion->prepare("SELECT mensaje, origen, enviado_en FROM mensajes_chat WHERE conversacion_id = ? ORDER BY enviado_en ASC");
$consulta->bind_param("i", $conversacion_id);
$consulta->execute();
$resultado = $consulta->get_result();

$mensajes = [];
while ($fila = $resultado->fetch_assoc()) {
  $mensajes[] = $fila;
}
header("Content-Type: application/json");
echo json_encode($mensajes);

// enviar_mensaje.php
<?php
session_start();
$correo = $_SESSION['correo_solicitante'] ?? 'anonimo';
$conexion = new mysqli("localhost", "root", "", "somaqui");

$conversacion_id = intval($_POST['id']);
$mensaje = trim($_POST['mensaje']);

if ($mensaje === "") exit;

$stmt = $conexion->prepare("INSERT INTO mensajes_chat (conversacion_id, mensaje, origen) VALUES (?, ?, 'solicitante')");
$stmt->bind_param("is", $conversacion_id, $mensaje);
$stmt->execute();
