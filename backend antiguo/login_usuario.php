<?php
session_start();

// Datos conexión
$host = "localhost";
$db   = "somaqui";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recoger y sanitizar datos
    $correo = trim($_POST['email']);
    $password = $_POST['password'];

    // Buscar usuario por correo
    $stmt = $pdo->prepare("SELECT * FROM usuarios_login WHERE correo = ?");
    $stmt->execute([$correo]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($password, $usuario['contrasena'])) {
        // Login correcto
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nombre'] = $usuario['nombre'];
        header("Location: dashboard.php"); // Cambia por la página que quieras mostrar tras login
        exit();
    } else {
        // Login incorrecto
        $_SESSION['error'] = "Correo o contraseña incorrectos.";
        header("Location: login.html");
        exit();
    }

} catch (PDOException $e) {
    echo "Error en la base de datos: " . $e->getMessage();
}
?>
