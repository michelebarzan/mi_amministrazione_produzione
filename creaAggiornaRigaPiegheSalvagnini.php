<?php

    include "Session.php";
    $database="mi_db_tecnico";
    include "connessioneDb.php";

    if ( sqlsrv_begin_transaction( $conn ) === false )
    {
        die( print_r( sqlsrv_errors(), true ));
    }

    $stmts=[];

    $q="INSERT INTO pieghe_salvagnini (tipo) VALUES (NULL)";
    $r=sqlsrv_query($conn,$q);
    array_push($stmts,$r);
    if($r!==FALSE)
    {
        $q2="SELECT MAX(id_piega) AS id_piega FROM pieghe_salvagnini";
        $r2=sqlsrv_query($conn,$q2);
        array_push($stmts,$r2);
        if($r2!==FALSE)
        {
            while($row2=sqlsrv_fetch_array($r2))
            {
                $id_piega=$row2["id_piega"];
                $colonna=$_REQUEST["colonna"];
                $valore=$_REQUEST["valore"];

                $q3="UPDATE pieghe_salvagnini SET [$colonna]='$valore' WHERE id_piega = $id_piega";
                $r3=sqlsrv_query($conn,$q3);
                array_push($stmts,$r3);
            }
        }
    }

    $commit=true;
    foreach ($stmts as $stmt) 
    {
        if(!$stmt)
            $commit=false;
    }
    if( $commit )
    {
        sqlsrv_commit( $conn );
        echo $id_piega;
    }
    else
    {
        sqlsrv_rollback( $conn );
        echo "error";
    }

?>