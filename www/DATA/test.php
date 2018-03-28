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

  $query = "SELECT  id_productos,NAME,precio,cp.DescripcionLarga FROM productos p INNER JOIN catpresentacion cp ON p.presentacion = cp.ID_Presentacion ORDER BY id_productos DESC";//limit 5,5

  $result = mysqli_query($con,$query);

  $rows = array();
  while($r = mysqli_fetch_array($result)) {
    $rows[] = $r;
  }
  echo json_encode($rows);

  mysqli_close($con);
?>