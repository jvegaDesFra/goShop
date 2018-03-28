<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$state = $_GET['estado'];
$lst = $_GET['clave_lista'];
$lstDtl = $_GET['clave_listaDetalle'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE listadetalle SET estado = '$state' WHERE clave_listadetalle = '$lstDtl' AND clave_lista = '$lst'";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();