<?php
// enviar_ayuda.php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: pedir_ayuda.php");
    exit;
}

// Configuración base de datos
$host = "localhost";
$db   = "somaqui";
$user = "root";
$pass = "";

$conexion = new mysqli($host, $user, $pass, $db);
if ($conexion->connect_errno) {
    die("❌ Error de conexión: " . $conexion->connect_error);
}

// Recoger datos del formulario
$correo         = trim($_POST['correo'] ?? '');
$ubicacion      = trim($_POST['ubicacion'] ?? '');
$desc_ubic      = trim($_POST['desc_ubic'] ?? '');
$descripcion    = trim($_POST['descripcion'] ?? '');
$otros_detalle  = trim($_POST['otros_detalle'] ?? '');
$etiquetas      = $_POST['tags'] ?? [];

// Validaciones
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

// Insertar en base de datos
$stmt = $conexion->prepare("INSERT INTO peticiones_ayuda (correo, ubicacion, desc_ubic, descripcion, etiquetas, otros_detalle) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    die("❌ Error en la preparación de la consulta: " . $conexion->error);
}

$stmt->bind_param("ssssss", $correo, $ubicacion, $desc_ubic, $descripcion, $etiquetas_str, $otros_detalle);

if ($stmt->execute()) {
    $stmt->close();
    $conexion->close();
    header("Location: pedir_ayuda.php?success=1");
    exit;
} else {
    $error = "❌ Error al guardar la solicitud: " . $stmt->error;
    $stmt->close();
    $conexion->close();
    die($error);
}
?>
