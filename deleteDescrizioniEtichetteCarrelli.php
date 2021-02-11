<?php

    include "Session.php";
    include "connessione.php";

    $descrizione=str_replace("'","''",$_REQUEST["descrizione"]);
    $nome=$_REQUEST["nome"];
    $label=$_REQUEST["label"];
    $carrello=$_REQUEST["carrello"];

    $q="DELETE FROM [mi_produzione].[dbo].[descrizioni_etichette_carrelli] WHERE carrello='$carrello' AND nome='$nome'";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error");
    }

?>