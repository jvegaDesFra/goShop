<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");

$det = $_GET['detalle'];
$con=mysqli_connect($servername,$username,$password,$dbname);
mysqli_set_charset($con, "utf8");

  // Check connection
  if (mysqli_connect_errno())
  {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

 $query = "SELECT * FROM listadetalle WHERE clave_listadetalle = $det";

  $result = mysqli_query($con,$query);

  $rows = array();
  while($r = mysqli_fetch_array($result)) {    
   $rows[] = $r; 
  }
  echo json_encode($rows);

  mysqli_close($con);