<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");


$lst = $_GET['detalle'];



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "DELETE FROM listadetalle WHERE clave_listadetalle = $lst";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();
