<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");


$lst = $_GET['clave_lista'];
$cliente = $_GET['cliente'];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "DELETE FROM lista WHERE clave_lista = $lst AND clave_cliente = $cliente";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();
