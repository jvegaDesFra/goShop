<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$user = $_GET['cve_cliente'];
$lst = $_GET['clave_lista'];
$tp = $_GET['clave_tipolista'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE lista SET clave_tipolista = '$tp' WHERE clave_lista = '$lst' AND clave_cliente = '$user'";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();