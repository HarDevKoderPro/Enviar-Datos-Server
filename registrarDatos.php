<?php
// Obtener los datos a enviar JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$respuesta = '';

// Configurar credenciales de conexión a la base de datos
// $host = "190.8.176.115"; // Desarrollo Remoto
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
if (isset($data['email'], $data['password'])) {

  // Pasar contenido de variables JS a variables PHP y elimino espacios al inicio y al final
  $email = trim($data['email']);
  $pass = trim($data['password']);

  // Sanitizar las variables
  $email = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $pass = htmlspecialchars($pass, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

  // Hashear la contraseña
  $passHasheado = password_hash($pass, PASSWORD_DEFAULT);

  // Insertar datos en la tabla registros (primera consulta)
  $sqlInsert = "INSERT INTO registro (email, pass) 
    VALUES ('$email', '$passHasheado')";

  // Resultado de la consulta
  if ($conn->query($sqlInsert) === TRUE) {
    $respuesta = 'Datos enviados exitosamente!';
  } else {
    $respuesta = 'Error al almacenar los datos: ' . $conn->error;
  }

  // Respuesta del servidor
  echo json_encode(['respuesta' => $respuesta]);

} else {
  echo json_encode(['status' => 'error', 'respuesta' => 'Datos faltantes']);
}

// Cerrar la conexión
$conn->close();
