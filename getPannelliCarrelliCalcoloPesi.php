<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(3000);

    $codici=json_decode($_REQUEST["JSONcodici"]);

    $codici_in="'".implode("','",$codici)."'";

    $pannelli=[];
    
    $qPannelli="SELECT db_tecnico.dbo.kitpan.CODELE,CODCAR
                FROM (SELECT CODCAR, CODCAB
                    FROM db_tecnico.dbo.dibcar AS dibcar_2
                    WHERE (NCAB NOT LIKE { fn CONCAT(CODCAB, '%') })) AS dibcar INNER JOIN
                    db_tecnico.dbo.kitpan INNER JOIN
                    db_tecnico.dbo.cabkit ON db_tecnico.dbo.kitpan.CODKIT = db_tecnico.dbo.cabkit.CODKIT INNER JOIN
                    db_tecnico.dbo.cabine ON db_tecnico.dbo.cabkit.CODCAB = db_tecnico.dbo.cabine.CODCAB ON dibcar.CODCAB = db_tecnico.dbo.cabine.CODCAB
                WHERE (dibcar.CODCAR IN ($codici_in)) OPTION ( QUERYTRACEON 9481 )";
    $rPannelli=sqlsrv_query($conn,$qPannelli);
    if($rPannelli==FALSE)
    {
        die("error".$qPannelli);
    }
    else
    {
        while($rowPannelli=sqlsrv_fetch_array($rPannelli))
        {
            $pannello["carrello"]=$rowPannelli["CODCAR"];
            $pannello["pannello"]=$rowPannelli["CODELE"];
            array_push($pannelli,$pannello);
        }
    }

    $qPannelli2="SELECT db_tecnico.dbo.kitpan.CODELE,CODCAR
                FROM (SELECT CODCAR, CODCAB
                    FROM db_tecnico.dbo.dibcar AS dibcar_2
                    WHERE (NCAB LIKE { fn CONCAT(CODCAB, '%') })) AS dibcar INNER JOIN
                    db_tecnico.dbo.dibcor ON dibcar.CODCAR = db_tecnico.dbo.dibcor.CODCOR INNER JOIN
                    db_tecnico.dbo.kitpan ON db_tecnico.dbo.dibcor.CODKIT = db_tecnico.dbo.kitpan.CODKIT
                WHERE (dibcar.CODCAR IN ($codici_in)) OPTION ( QUERYTRACEON 9481 )";
    $rPannelli2=sqlsrv_query($conn,$qPannelli2);
    if($rPannelli2==FALSE)
    {
        die("error".$qPannelli2);
    }
    else
    {
        while($rowPannelli2=sqlsrv_fetch_array($rPannelli2))
        {
            $pannello["carrello"]=$rowPannelli["CODCAR"];
            $pannello["pannello"]=$rowPannelli["CODELE"];
            array_push($pannelli,$pannello);
        }
    }

    echo json_encode($pannelli);

?>




CASE WHEN  dbo.anagrafica_elementi.um = 'Nr' THEN  dbo.DIBpaS.QNT *  dbo.anagrafica_elementi.peso ELSE when  dbo.anagrafica_elementi.um='Mq' then  dbo.DIBpaS.QNT *  dbo.anagrafica_elementi.peso else when   dbo.anagrafica_elementi.um= 'Ml' then  dbo.DIBpaS.QNT *  dbo.anagrafica_elementi.peso END