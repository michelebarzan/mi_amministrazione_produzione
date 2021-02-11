<?php
session_start();
$_SESSION=array();
session_destroy();
$hour = time() + 3600 * 24 * 30;
setcookie('username',"no", $hour);
setcookie('password', "no", $hour);
header("Location: http://192.168.1.1:8081/mi_produzione_login/login.html");
?>