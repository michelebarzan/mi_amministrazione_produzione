
<?php

include "Session.php";
include "connessione.php";

$id_pagina=$_REQUEST['id_pagina'];

$qPreferiti="INSERT INTO [mi_produzione].[dbo].[pagine_preferite_utenti] ([pagina],[utente]) VALUES ($id_pagina,".$_SESSION['id_utente'].")";
$rPreferiti=sqlsrv_query($conn,$qPreferiti);

?>