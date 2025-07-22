<?php
// Datos conexión
$host = "localhost";
$db   = "somaqui";
$user = "root";
$pass = "";

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

    // Comprobar que correo y dni no existan en usuarios_login
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM usuarios_login WHERE correo = ? OR dni = ?");
    $stmt->execute([$correo, $dni]);
    if ($stmt->fetchColumn() > 0) {
        die("Correo o DNI ya registrado.");
    }

    // Insertar usuario en usuarios_login, usando campo contrasena
    $stmt = $pdo->prepare("INSERT INTO usuarios_login (nombre, correo, dni, contrasena) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nombre, $correo, $dni, $passwordHash]);

    echo "Usuario registrado correctamente. <a href='login.html'>Inicia sesión</a>";

} catch (PDOException $e) {
    echo "Error en la base de datos: " . $e->getMessage();
}
?>
