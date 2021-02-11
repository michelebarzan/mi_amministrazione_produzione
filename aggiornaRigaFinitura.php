<?php

    include "Session.php";
    $database="mi_db_tecnico";
    include "connessioneDb.php";

    $id_finitura=$_REQUEST["id_finitura"];
    $colonna=$_REQUEST["colonna"];
    $valore=$_REQUEST["valore"];

    $q="UPDATE dati_finitura_salvagnini SET [$colonna]='$valore' WHERE id_finitura = $id_finitura";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>