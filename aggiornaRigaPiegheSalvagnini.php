<?php

    include "Session.php";
    $database="mi_db_tecnico";
    include "connessioneDb.php";

    $id_piega=$_REQUEST["id_piega"];
    $colonna=$_REQUEST["colonna"];
    $valore=$_REQUEST["valore"];

    $q="UPDATE pieghe_salvagnini SET [$colonna]='$valore' WHERE id_piega = $id_piega";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>