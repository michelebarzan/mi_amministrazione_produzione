<?php
	$mi_produzione_params_file = fopen("C:\mi_produzione_params.json", "r") or die("error");
	$mi_produzione_params=json_decode(fread($mi_produzione_params_file,filesize("C:\mi_produzione_params.json")), true);
	fclose($mi_produzione_params_file);

	session_start();
	$_SESSION=array();
	session_destroy();
	$hour = time() + 3600 * 24 * 30;
	setcookie('username',"no", $hour);
	setcookie('password', "no", $hour);
	header("Location: ".$mi_produzione_params['web_server_info']['protocol']."://".$mi_produzione_params['web_server_info']['name'].":".$mi_produzione_params['web_server_info']['port']."/mi_produzione_login/login.html");
?>