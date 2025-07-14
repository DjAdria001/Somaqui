<?php
session_start();
if (!isset($_SESSION['usuario_id'])) exit;

$usuario_id = $_SESSION['usuario_id'];
$conversacion_id = intval($_POST['id']);
$mensaje = trim($_POST['mensaje']);

if ($mensaje === "") exit;

$conexion = new mysqli("localhost", "root", "", "somaqui");

$consulta = $conexion->prepare("
  INSERT INTO mensajes_chat (conversacion_id, autor_id, mensaje)
  VALUES (?, ?, ?)
");
$consulta->bind_param("iis", $conversacion_id, $usuario_id, $mensaje);
$consulta->execute();
