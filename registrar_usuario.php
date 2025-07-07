<?php
// Datos conexión
$host = "localhost";
$db   = "somaqui";  // Cambia aquí por el nombre de tu base
$user = "root";                  // Por defecto en local suele ser root
$pass = "";                      // Contraseña, normalmente vacía en local

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recoger y sanitizar datos
    $nombre = trim($_POST['nombre']);
    $correo = trim($_POST['correo']);
    $dni = trim($_POST['DNI']);
    $password = $_POST['password'];
    $confirmar = $_POST['confirmar'];

    // Validar contraseñas iguales (por seguridad)
    if ($password !== $confirmar) {
        die("Las contraseñas no coinciden.");
    }

    // Validar email
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        die("Correo no válido.");
    }

    // Hashear contraseña
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Comprobar que correo y dni no existan
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE correo = ? OR dni = ?");
    $stmt->execute([$correo, $dni]);
    if ($stmt->fetchColumn() > 0) {
        die("Correo o DNI ya registrado.");
    }

    // Insertar usuario
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, correo, dni, password) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nombre, $correo, $dni, $passwordHash]);

    echo "Usuario registrado correctamente. <a href='login_usuario.html'>Inicia sesión</a>";

} catch (PDOException $e) {
    echo "Error en la base de datos: " . $e->getMessage();
}
?>
