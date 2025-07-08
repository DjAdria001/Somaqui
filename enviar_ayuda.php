<?php
// enviar_ayuda.php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: pedir_ayuda.php");
    exit;
}

$host = "localhost";
$db   = "somaqui";
$user = "root";
$pass = "";

$conexion = new mysqli($host, $user, $pass, $db);
if ($conexion->connect_errno) {
    die("Error de conexión a la base de datos: " . $conexion->connect_error);
}

$ubicacion     = trim($_POST['ubicacion'] ?? '');
$descripcion   = trim($_POST['descripcion'] ?? '');
$otros_detalle = trim($_POST['otros_detalle'] ?? '');
$etiquetas     = $_POST['tags'] ?? [];

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

$stmt = $conexion->prepare("INSERT INTO peticiones_ayuda (ubicacion, descripcion, etiquetas, otros_detalle) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $ubicacion, $descripcion, $etiquetas_str, $otros_detalle);

if ($stmt->execute()) {
    $stmt->close();
    $conexion->close();
    // Redirige a Home.html y guarda mensaje de éxito en localStorage
    echo "<script>
      localStorage.setItem('mensajeExito', '✅ Tu solicitud ha sido enviada con éxito.');
      window.location.href = 'Home.html';
    </script>";
    exit;
} else {
    $error = "Error al guardar la solicitud: " . $stmt->error;
    $stmt->close();
    $conexion->close();
    die($error);
}
?>
