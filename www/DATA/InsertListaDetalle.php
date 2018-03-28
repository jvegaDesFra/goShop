<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$nombre = $_GET['nombre'];
$precio = $_GET['precio'];
$producto = $_GET['producto'];
$lst = $_GET['clave_lista'];
$lstDtl = $_GET['clave_listaDetalle'];
$cantidad = $_GET['cantidad'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO listadetalle VALUES (null,'$lst',null,'1','AC','$precio',$producto,$cantidad)";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();
