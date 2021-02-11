<?php

    include "Session.php";
    $database="mi_db_tecnico";
    include "connessioneDb.php";

    $id_piega=$_REQUEST["id_piega"];

    $q="DELETE FROM pieghe_salvagnini WHERE id_piega = $id_piega";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>