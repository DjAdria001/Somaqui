<?php
session_start();
$id = intval($_GET['id'] ?? 0);
$correo = $_SESSION['correo'] ?? null;

if (!$id || !$correo) {
    die("Acceso denegado");
}

$conexion = new mysqli('localhost', 'root', '', 'somaqui');
$stmt = $conexion->prepare("SELECT correo FROM peticiones_ayuda WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($creador);

if ($stmt->fetch() && $creador === $correo) {
    $stmt->close();
    $conexion->query("DELETE FROM peticiones_ayuda WHERE id = $id");
    header("Location: Home.html");
    exit;
} else {
    echo "No tienes permiso para cerrar esta emergencia.";
}
?>
