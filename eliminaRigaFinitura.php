<?php

    include "Session.php";
    $database="mi_db_tecnico";
    include "connessioneDb.php";

    $id_finitura=$_REQUEST["id_finitura"];

    $q="DELETE FROM dati_finitura_salvagnini WHERE id_finitura = $id_finitura";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>