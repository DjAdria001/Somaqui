<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: H");
    exit;
}

// Conexión exacta con los datos de Neon
$host = 'ep-late-unit-aezrfzox-pooler.c-2.us-east-2.aws.neon.tech';
$db   = 'neondb';
$user = 'neondb_owner';
$pass = 'npg_m0xErCsGegB5'; // ⚠️ ¡Este dato es sensible! Guárdalo en .env si subes el código a producción.
$port = 5432;
$sslmode = 'require';

try {
    $pdo = new PDO(
        "pgsql:host=$host;port=$port;dbname=$db;sslmode=$sslmode",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die("❌ Error de conexión: " . $e->getMessage());
}

$correo         = trim($_POST['correo'] ?? '');
$ubicacion      = trim($_POST['ubicacion'] ?? '');
$desc_ubic      = trim($_POST['desc_ubic'] ?? '');
$descripcion    = trim($_POST['descripcion'] ?? '');
$otros_detalle  = trim($_POST['otros_detalle'] ?? '');
$etiquetas      = $_POST['tags'] ?? [];

if (empty($correo) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    die("❌ Correo no válido.");
}
if (empty($ubicacion)) {
    die("❌ Debes seleccionar una ubicación.");
}
if (empty($etiquetas)) {
    die("❌ Selecciona al menos una etiqueta.");
}
if (in_array("Otros", $etiquetas) && empty($otros_detalle)) {
    die("❌ Describe tu emergencia en el campo 'Otros'.");
}

$etiquetas_str = implode(',', $etiquetas);

try {
    // Insertar la emergencia
    $stmt = $pdo->prepare("INSERT INTO peticiones_ayuda (correo, ubicacion, desc_ubic, descripcion, etiquetas, otros_detalle) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$correo, $ubicacion, $desc_ubic, $descripcion, $etiquetas_str, $otros_detalle]);

    $id_emergencia = $pdo->lastInsertId();

    // Insertar la conversación asociada
    $stmt_chat = $pdo->prepare("INSERT INTO conversaciones (id_emergencia, correo_solicitante) VALUES (?, ?)");
    $stmt_chat->execute([$id_emergencia, $correo]);

    $id_conversacion = $pdo->lastInsertId();

    $_SESSION['correo_solicitante'] = $correo;
    header("Location: chat.php?id=$id_conversacion");
    exit;
} catch (PDOException $e) {
    die("❌ Error al guardar la solicitud: " . $e->getMessage());
}
?>
