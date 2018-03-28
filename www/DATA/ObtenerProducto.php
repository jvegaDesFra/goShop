<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");
$nombre = $_GET['nombre'];
$precio = $_GET['precio'];
$cliente = $_GET['cliente'];

$con=mysqli_connect($servername,$username,$password,$dbname);
mysqli_set_charset($con, "utf8");

  // Check connection
  if (mysqli_connect_errno())
  {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

 $query = "SELECT * FROM productos WHERE NAME = '$nombre' AND precio = $precio AND fuente = 'user' and cliente = '$cliente'  LIMIT 1";

  $result = mysqli_query($con,$query);

  $rows = array();
  while($r = mysqli_fetch_array($result)) {    
    echo $r[0];
  }
  //echo json_encode($rows);

  mysqli_close($con);