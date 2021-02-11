<?php
	$mi_produzione_params_file = fopen("C:\mi_produzione_params.json", "r") or die("error");
	echo fread($mi_produzione_params_file,filesize("C:\mi_produzione_params.json"));
	fclose($mi_produzione_params_file);
?>