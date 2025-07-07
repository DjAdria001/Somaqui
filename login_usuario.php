<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "somaqui");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener datos del formulario
$correo = $_POST['correo'];
$passwordIngresada = $_POST['password'];

// Buscar usuario por correo
$sql = "SELECT * FROM usuarios WHERE correo = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 1) {
    $usuario = $resultado->fetch_assoc();

    // Verificar contraseña cifrada
    if (password_verify($passwordIngresada, $usuario['password'])) {
        session_start();
        $_SESSION['usuario'] = $usuario['nombre'];
        echo "<script>alert('Inicio de sesión exitoso'); window.location.href='Home.html';</script>";
    } else {
        echo "<script>alert('Contraseña incorrecta'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('Usuario no encontrado'); window.history.back();</script>";
}

$stmt->close();
$conexion->close();
?>
