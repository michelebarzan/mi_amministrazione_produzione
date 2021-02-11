<?php
	$mi_produzione_params_file = fopen("C:\mi_produzione_params.json", "r") or die("error");
	$mi_produzione_params=json_decode(fread($mi_produzione_params_file,filesize("C:\mi_produzione_params.json")), true);
	fclose($mi_produzione_params_file);

	$connectionInfo=array("Database"=>"mi_produzione", "UID"=>$mi_produzione_params['sql_server_info']['username'], "PWD"=>$mi_produzione_params['sql_server_info']['password']);
	$conn = sqlsrv_connect($mi_produzione_params['sql_server_info']['ip'],$connectionInfo);
	if(!$conn)
		die("error");
?>