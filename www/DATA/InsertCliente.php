<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$nombre = $_GET['nombre'];
$ap = $_GET['ap'];
$contra = $_GET['contra'];
$mail = $_GET['mail'];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO clientes VALUES (NULL,'$nombre','$ap','','','$contra','$mail','')";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}

$conn->close();
