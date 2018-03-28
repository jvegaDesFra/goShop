<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$nombre = $_GET['nombre'];
$precio = $_GET['precio'];
$cliente = $_GET['cliente'];
$presentacion = $_GET['presentacion'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO productos VALUES(NULL,'$nombre',$precio, 'user','$cliente', $presentacion )";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();