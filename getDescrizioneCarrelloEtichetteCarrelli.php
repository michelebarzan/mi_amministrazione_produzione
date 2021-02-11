<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(120);

    $carrello=$_REQUEST["carrello"];
    
    $q="select MAX(DESCRIZIONE) AS DESCRIZIONE from [10.128.26.1].newpan.dbo.carrelli where CODCAR='$carrello'";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            echo $row["DESCRIZIONE"];
        }
    }

?>