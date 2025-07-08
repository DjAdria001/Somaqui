<?php
// enviar_ayuda.php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // Redirigir a formulario si acceden por GET
    header("Location: pedir_ayuda.php");
    exit;
}

// Configura tu conexión a la base de datos
$host = "localhost";
$db   = "somaqui";  // Cambia aquí por el nombre de tu base
$user = "root";                  // Por defecto en local suele ser root
$pass = "";  

$conexion = new mysqli($host, $user, $pass, $db);
if ($conexion->connect_errno) {
    die("Error de conexión a la base de datos: " . $conexion->connect_error);
}

// Recoger y sanitizar datos
$ubicacion = trim($_POST['ubicacion'] ?? '');
$descripcion = trim($_POST['descripcion'] ?? '');
$otros_detalle = trim($_POST['otros_detalle'] ?? '');
$etiquetas = $_POST['tags'] ?? [];

// Validaciones
if (empty($ubicacion)) {
    die("Error: La ubicación es obligatoria.");
}
if (empty($etiquetas)) {
    die("Error: Selecciona al menos una etiqueta.");
}
if (in_array('Otros', $etiquetas) && empty($otros_detalle)) {
    die("Error: Por favor describe la emergencia en el campo Otros.");
}

$etiquetas_str = implode(',', $etiquetas);

// Insertar en base de datos con consulta preparada
$stmt = $conexion->prepare("INSERT INTO peticiones_ayuda (ubicacion, descripcion, etiquetas, otros_detalle) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $ubicacion, $descripcion, $etiquetas_str, $otros_detalle);

if ($stmt->execute()) {
    $stmt->close();
    $conexion->close();
    // Redirigir a página de éxito o mostrar mensaje
    header("Location: pedir_ayuda.php?success=1");
    exit;
} else {
    $error = "Error al guardar la solicitud: " . $stmt->error;
    $stmt->close();
    $conexion->close();
    die($error);
}
?>
