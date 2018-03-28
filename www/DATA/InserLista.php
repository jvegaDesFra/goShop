<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$nombre = $_GET['nombre'];
$usuario = $_GET['usuario'];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO lista VALUES(NULL,$usuario,'$nombre', 1,'AC')";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();
