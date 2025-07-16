<?php
session_start();

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID no válido");
}

$id = (int) $_GET['id'];

$conexion = new mysqli('localhost', 'root', '', 'somaqui');
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Mostrar errores si ocurren
$errores = [];

if (!$conexion->query("DELETE FROM mensajes WHERE conversacion_id = $id")) {
    $errores[] = "Error al borrar mensajes: " . $conexion->error;
}

if (!$conexion->query("DELETE FROM conversaciones WHERE id = $id")) {
    $errores[] = "Error al borrar conversación: " . $conexion->error;
}

if (!$conexion->query("DELETE FROM peticiones_ayuda WHERE id = $id")) {
    $errores[] = "Error al borrar emergencia: " . $conexion->error;
}

$conexion->close();

if (!empty($errores)) {
    echo "<h2>Ocurrieron errores al eliminar:</h2><ul>";
    foreach ($errores as $e) {
        echo "<li>$e</li>";
    }
    echo "</ul>";
    echo "<p><a href='Home.html'>Volver a Home</a></p>";
    exit;
}

// Si todo fue bien, redirigir
header("Location: Home.html");
exit;
?>
