 
<?php
header('Access-Control-Allow-Origin: *');
include("cnn.php");
$list = $_GET['cve_lista'];

  $con=mysqli_connect($servername,$username,$password,$dbname);
mysqli_set_charset($con, "utf8");
  // Check connection
  if (mysqli_connect_errno())
  {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $query = "select l.clave_listadetalle,l.clave_lista,p.name nombre,l.estado,l.estatus,l.precio,l.cantidad,ct.Descripcion FROM listadetalle l INNER JOIN productos p ON l.producto = p.id_productos INNER JOIN catpresentacion ct ON p.presentacion = ct.ID_Presentacion WHERE clave_lista = $list ";

  $result = mysqli_query($con,$query);

  $rows = array();
  while($r = mysqli_fetch_array($result)) {
    $rows[] = $r;
  }
  echo json_encode($rows);
