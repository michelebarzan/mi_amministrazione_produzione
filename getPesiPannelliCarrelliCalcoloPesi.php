<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(3000);

    $pannelli=json_decode($_REQUEST["JSONpannelli"]);

    $pannelli_in="'".implode("','",$pannelli)."'";

    $pesi_pannelli=[];
    
    $qPannelli=" OPTION ( QUERYTRACEON 9481 )";
    $rPannelli=sqlsrv_query($conn,$qPannelli);
    if($rPannelli==FALSE)
    {
        die("error".$qPannelli);
    }
    else
    {
        while($rowPannelli=sqlsrv_fetch_array($rPannelli))
        {
            $pannello[""]=$rowPannelli["CODELE"];
            $pannello[""]=$rowPannelli["CODELE"];
            array_push($pesi_pannelli,$pannello);
        }
    }

    echo json_encode($pesi_pannelli);

?>