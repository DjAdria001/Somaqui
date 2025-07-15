<?php
session_start();
$correo = $_SESSION['correo_solicitante'] ?? null;
if (!$correo) exit("No autorizado");

$id = intval($_POST['id'] ?? 0);
$conexion = new mysqli("localhost", "root", "", "somaqui");
$check = $conexion->prepare("SELECT id_emergencia FROM conversaciones WHERE id = ? AND correo_solicitante = ?");
$check->bind_param("is", $id, $correo);
$check->execute();
$res = $check->get_result();
if ($res->num_rows === 0) exit("No permitido");
$emergencia = $res->fetch_assoc();

$update = $conexion->prepare("UPDATE peticiones_ayuda SET finalizada = 1 WHERE id = ?");
$update->bind_param("i", $emergencia['id_emergencia']);
$update->execute();

echo "OK";