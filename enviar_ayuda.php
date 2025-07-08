<?php
// Configura la conexión
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'somaqui';

// Crear conexión
$conexion = new mysqli($host, $user, $password, $dbname);
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener y sanitizar datos del formulario
$ubicacion = $_POST['ubicacion'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$otros_detalle = $_POST['otros_detalle'] ?? '';
$tags = $_POST['tags'] ?? [];

if (in_array("Otros", $tags) && $otros_detalle !== '') {
    $tags[] = "Detalle: " . $otros_detalle;
}

// Convertir el array de tags a texto
$tags_str = implode(', ', $tags);

// Insertar en la base de datos
$sql = "INSERT INTO peticiones_ayuda (ubicacion, tags, descripcion) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("sss", $ubicacion, $tags_str, $descripcion);

if ($stmt->execute()) {
    // Redirigir al Home si todo va bien
    header("Location: Home.html");
    exit();
} else {
    echo "Error al enviar la solicitud: " . $conexion->error;
}

$stmt->close();
$conexion->close();
?>
