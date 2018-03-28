<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$lista = $_GET['lista'];
$nombre = $_GET['nombre'];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE lista SET nombre = '$nombre' WHERE clave_lista =$lista";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();