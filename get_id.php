<?php

$token = '77962089373:AAEjQHqquAWblFZp_ZkvGTFcSPkbExldiWk';

$response = file_get_contents("https://api.telegram.org/bot$token/getUpdates");

$data = json_decode($response, true);

// Mostrar todo por pantalla para buscar el chat_id
echo "<pre>";
print_r($data);
echo "</pre>";
?>
