<?php

    include "Session.php";
    include "connessione.php";

    $descrizione=str_replace("'","''",$_REQUEST["descrizione"]);
    $nome=$_REQUEST["nome"];
    $label=$_REQUEST["label"];
    $carrello=$_REQUEST["carrello"];

    $q="INSERT INTO [dbo].[descrizioni_etichette_carrelli]
            ([carrello]
            ,[nome]
            ,[descrizione]
            ,[label])
        VALUES
            ('$carrello'
            ,'$nome'
            ,'$descrizione'
            ,'$label')";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error");
    }

?>