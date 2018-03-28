<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");


$con=mysqli_connect($servername,$username,$password,$dbname);
mysqli_set_charset($con, "utf8");

  // Check connection
  if (mysqli_connect_errno())
  {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

 //$query = "SELECT DISTINCT cat FROM (SELECT SUBSTRING_INDEX( NAME , ',', 1 ) AS cat FROM productos) table2 ORDER BY cat";
 $query = "SELECT ID_Presentacion id, descripcion cat, DescripcionLarga cat2 FROM catpresentacion";

  $result = mysqli_query($con,$query);

  $rows = array();
  while($r = mysqli_fetch_array($result)) {    
   $rows[] = $r; 
  }
  echo json_encode($rows);

  mysqli_close($con);