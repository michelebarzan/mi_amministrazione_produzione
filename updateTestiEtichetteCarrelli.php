<?php

    include "Session.php";
    include "connessione.php";

    $testo=str_replace("'","''",$_REQUEST["testo"]);
    $id_testo=$_REQUEST["id_testo"];

    $q="UPDATE [mi_produzione].[dbo].[testi_etichette_carrelli] SET testo='$testo' WHERE id_testo=$id_testo";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error");
    }

?>