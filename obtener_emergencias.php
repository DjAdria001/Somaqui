<?php
header('Content-Type: application/json');

$conexion = new mysqli('localhost', 'root', '', 'somaqui');
if ($conexion->connect_error) {
    echo json_encode([]);
    exit;
}

$query = "SELECT id, ubicacion, desc_ubic, descripcion, etiquetas, otros_detalle, fecha_envio FROM peticiones_ayuda ORDER BY fecha_envio DESC";
$resultado = $conexion->query($query);

$emergencias = [];

if ($resultado) {
    while ($fila = $resultado->fetch_assoc()) {
        // Convertir etiquetas JSON o cadena a array, asumiendo formato JSON
        $tags = json_decode($fila['etiquetas'], true);
        if (!is_array($tags)) {
            // Si no es JSON, intentar separarlo por comas
            $tags = array_map('trim', explode(',', $fila['etiquetas']));
        }

        // Construir la descripción a mostrar: 
        // Prioridad: desc_ubic (si existe) + descripción + otros_detalle si etiqueta 'otro' existe
        $desc = '';
        if (!empty($fila['desc_ubic'])) {
            $desc .= $fila['desc_ubic'] . '. ';
        }
        if (!empty($fila['descripcion'])) {
            $desc .= $fila['descripcion'] . '. ';
        }
        if (in_array('otro', $tags) && !empty($fila['otros_detalle'])) {
            $desc .= 'Detalle adicional: ' . $fila['otros_detalle'];
        }
        $desc = trim($desc);

        $emergencias[] = [
            'id'          => $fila['id'],
            'ubicacion'   => $fila['ubicacion'],
            'descripcion' => $desc,
            'fecha'       => date('d/m/Y H:i', strtotime($fila['fecha_envio'])),
            'etiquetas'   => $tags,
        ];
    }
}

echo json_encode($emergencias, JSON_UNESCAPED_UNICODE);
?>
