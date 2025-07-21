<?php
header('Content-Type: application/json');

// Conexión con Neon PostgreSQL
$host = 'ep-late-unit-aezrfzox-pooler.c-2.us-east-2.aws.neon.tech';
$db   = 'neondb';
$user = 'neondb_owner';
$pass = 'npg_m0xErCsGegB5';
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
    echo json_encode(["error" => "❌ Conexión fallida: " . $e->getMessage()]);
    exit;
}

// Consulta de emergencias
$query = "SELECT id, ubicacion, desc_ubic, descripcion, etiquetas, otros_detalle, fecha_envio FROM peticiones_ayuda ORDER BY fecha_envio DESC";
$stmt = $pdo->prepare($query);
$stmt->execute();
$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

$emergencias = [];

foreach ($resultados as $fila) {
    // Convertir etiquetas JSON o texto plano a array
    $tags = json_decode($fila['etiquetas'], true);
    if (!is_array($tags)) {
        $tags = array_map('trim', explode(',', $fila['etiquetas']));
    }

    // Construir descripción
    $desc = '';
    if (!empty($fila['desc_ubic'])) {
        $desc .= $fila['desc_ubic'] . '. ';
    }
    if (!empty($fila['descripcion'])) {
        $desc .= $fila['descripcion'] . '. ';
    }
    if (in_array('otro', array_map('strtolower', $tags)) && !empty($fila['otros_detalle'])) {
        $desc .= 'Detalle adicional: ' . $fila['otros_detalle'];
    }

    $emergencias[] = [
        'id'          => $fila['id'],
        'ubicacion'   => $fila['ubicacion'],
        'descripcion' => trim($desc),
        'fecha'       => date('d/m/Y H:i', strtotime($fila['fecha_envio'])),
        'etiquetas'   => $tags
    ];
}

echo json_encode($emergencias, JSON_UNESCAPED_UNICODE);
?>
