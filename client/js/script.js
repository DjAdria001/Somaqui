async function cerrarEmergencia(conversacionId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cerrar-emergencia/${conversacionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // "✅ Emergencia cerrada correctamente"
      // Redirigir, recargar o actualizar UI según convenga
      window.location.href = 'Home.html';
    } else {
      alert('Error: ' + (data.error || 'No se pudo cerrar la emergencia'));
    }
  } catch (error) {
    alert('Error de conexión o inesperado');
    console.error(error);
  }
}
