<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$precio = $_GET['precio'];
$cantidad = $_GET['cantidad'];
$detalle = $_GET['detalle'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE listadetalle SET precio = '$precio' , cantidad = $cantidad WHERE clave_listadetalle = $detalle";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();