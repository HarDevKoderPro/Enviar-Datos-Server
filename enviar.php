<?php
// Obtener los datos a enviar JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$respuesta = '';

// Configuración Remota (Servidor Externo)
// $host = "190.8.176.115"; // Desarrollo Remoto
// $user = "tucultur";      // Usuario de MySQL
// $password = "@GWMU!J4p-mgyTJ7";      // Contraseña de MySQL
// $dbname = "tucultur_pruebas"; // Nombre de la base de datos

// Configuración Local (Localhost)
$host = "localhost"; // Desarrollo Local
$user = "root";      // Usuario de MySQL
$password = "";      // Contraseña de MySQL
$dbname = "pruebas"; // Nombre de la base de datos

// Conectar a base de datos MySQL
$conn = new mysqli($host, $user, $password, $dbname);

// Establecer la codificación de caracteres
mysqli_set_charset($conn, "utf8mb4");

// Verificar la conexión
if ($conn->connect_error) {
  die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
}

// Comprobar si los datos están presentes
if (isset(
  $data['nombre'],
  $data['apellido'],
  $data['edad'],
)) {

  // Pasar contenido de variables JS a variables PHP y elimino espacios al inicio y al final
  $nombre = trim($data['nombre']);
  $apellido = trim($data['apellido']);
  $edad = trim($data['edad']);

  // Sanitizar las variables (Evitar inyección de código HTML)
  $nombre = htmlspecialchars($nombre, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $apellido = htmlspecialchars($apellido, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $edad = htmlspecialchars($edad, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

  // Insertar datos en la tabla usuarios
  $sqlInsert = "INSERT INTO usuarios (nombre, apellido, edad) 
    VALUES ('$nombre', '$apellido', '$edad')";

  // Resultado de la consulta
  if ($conn->query($sqlInsert) === TRUE) {
    $respuesta = 'Datos enviados exitosamente!';
  } else {
    $respuesta = 'Error al almacenar los datos: ' . $conn->error;
  }

  // Respuesta del servidor
  echo json_encode(['respuesta' => $respuesta]);

  // Si falta alguno de los datos a enviar (input vacío)
} else {
  echo json_encode(['status' => 'error', 'respuesta' => 'Datos faltantes']);
}

// Cerrar la conexión
$conn->close();
