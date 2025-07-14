<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: H");
    exit;
}

$host = "localhost";
$db   = "somaqui";
$user = "root";
$pass = "";

$conexion = new mysqli($host, $user, $pass, $db);
if ($conexion->connect_errno) {
    die("❌ Error de conexión: " . $conexion->connect_error);
}

$correo         = trim($_POST['correo'] ?? '');
$ubicacion      = trim($_POST['ubicacion'] ?? '');
$desc_ubic      = trim($_POST['desc_ubic'] ?? '');
$descripcion    = trim($_POST['descripcion'] ?? '');
$otros_detalle  = trim($_POST['otros_detalle'] ?? '');
$etiquetas      = $_POST['tags'] ?? [];

if (empty($correo) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    die("❌ Correo no válido.");
}
if (empty($ubicacion)) {
    die("❌ Debes seleccionar una ubicación.");
}
if (empty($etiquetas)) {
    die("❌ Selecciona al menos una etiqueta.");
}
if (in_array("Otros", $etiquetas) && empty($otros_detalle)) {
    die("❌ Describe tu emergencia en el campo 'Otros'.");
}

$etiquetas_str = implode(',', $etiquetas);

$stmt = $conexion->prepare("INSERT INTO peticiones_ayuda (correo, ubicacion, desc_ubic, descripcion, etiquetas, otros_detalle) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $correo, $ubicacion, $desc_ubic, $descripcion, $etiquetas_str, $otros_detalle);

if ($stmt->execute()) {
    $id_emergencia = $stmt->insert_id;
    $stmt->close();

    $stmt_chat = $conexion->prepare("INSERT INTO conversaciones (id_emergencia, correo_solicitante) VALUES (?, ?)");
    $stmt_chat->bind_param("is", $id_emergencia, $correo);
    $stmt_chat->execute();
    $id_conversacion = $stmt_chat->insert_id;
    $stmt_chat->close();

    $_SESSION['correo_solicitante'] = $correo;
    $conexion->close();
    header("Location: chat.php?id=$id_conversacion");
    exit;
} else {
    $error = "❌ Error al guardar la solicitud: " . $stmt->error;
    $stmt->close();
    $conexion->close();
    die($error);
}
?>
