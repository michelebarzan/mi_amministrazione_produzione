
<?php

    include "connessione.php";

    set_time_limit(1000000);

    $databases=json_decode($_REQUEST["JSONdatabases"]);

    $start = microtime(true);

    //$q="SELECT * FROM [db_tecnico].[dbo].[schema_relazioni]";
	$q="SELECT * FROM [db_tecnico].[dbo].[schema_relazioni] where distinta<>'kitpan'";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error");
    }
    else
    {
        foreach($databases as $database)
        {
            $i=0;
            while($row=sqlsrv_fetch_array($r))
            {
                if($database=="newpan")
                    $prefisso=".importazione_db_tecnico_";
                else
                    $prefisso=".";

                $distinta=$row["distinta"];
                $anagrafica=$row["anagrafica"];
                $campo=$row["campo"];

                $q1="DELETE
                    FROM db_tecnico.dbo.$distinta
                    WHERE ($campo IN
                            (SELECT DISTINCT tbl.$campo
                            FROM db_tecnico.dbo.$anagrafica RIGHT OUTER JOIN
                            db_tecnico.dbo.$distinta AS tbl ON db_tecnico.dbo.$anagrafica.$campo = tbl.$campo
                            WHERE (db_tecnico.dbo.$anagrafica.$campo IS NULL)))";
                $r1=sqlsrv_query($conn,$q1);
                if($r1==FALSE)
                    die("error".$i."\n".$q1."\n".print_r(sqlsrv_errors(),TRUE));

                /*$q2="INSERT INTO db_tecnico.dbo.$distinta SELECT $database.dbo$prefisso$distinta.*
                    FROM (SELECT tbl.$campo
                        FROM [10.128.26.1].$database.dbo$prefisso$anagrafica AS tbl LEFT OUTER JOIN db_tecnico.dbo.$anagrafica ON tbl.$campo = db_tecnico.dbo.$anagrafica.$campo
                        WHERE (db_tecnico.dbo.$anagrafica.$campo IS NULL)) AS derivedtbl_1 INNER JOIN
                        [10.128.26.1].$database.dbo$prefisso$distinta as derivedtbl_2 ON derivedtbl_1.$campo = derivedtbl_2.$campo";*/
				$q2="INSERT INTO db_tecnico.dbo.$distinta SELECT derivedtbl_2.*
                    FROM (SELECT tbl.$campo
                        FROM [10.128.26.1].$database.dbo$prefisso$anagrafica AS tbl LEFT OUTER JOIN db_tecnico.dbo.$anagrafica ON tbl.$campo = db_tecnico.dbo.$anagrafica.$campo
                        WHERE (db_tecnico.dbo.$anagrafica.$campo IS NULL)) AS derivedtbl_1 INNER JOIN
                        [10.128.26.1].$database.dbo$prefisso$distinta as derivedtbl_2 ON derivedtbl_1.$campo = derivedtbl_2.$campo";
                $r2=sqlsrv_query($conn,$q2);
                if($r2==FALSE)
                    die("error".$i."\n".$q2."\n".print_r(sqlsrv_errors(),TRUE));

                $q3="INSERT INTO db_tecnico.dbo.$anagrafica SELECT DISTINCT tbl.*
                    FROM [10.128.26.1].$database.dbo$prefisso$anagrafica AS tbl LEFT OUTER JOIN db_tecnico.dbo.$anagrafica ON tbl.$campo = db_tecnico.dbo.$anagrafica.$campo
                    WHERE (db_tecnico.dbo.$anagrafica.$campo IS NULL)";
                $r3=sqlsrv_query($conn,$q3);
                if($r3==FALSE)
                    die("error".$i."\n".$q3."\n".print_r(sqlsrv_errors(),TRUE));
                $i++;
            }
        }
        $time_elapsed_secs = microtime(true) - $start;
        $time_elapsed_secs = number_format($time_elapsed_secs,1);
        echo $time_elapsed_secs;
    }

?>