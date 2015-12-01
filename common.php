<?php
$SERVER   = "";
$USERNAME = "";
$PASSWORD = "";
$DATABASE = "";

$db = new PDO("mysql:dbname={$DATABASE}; host={$SERVER};charset=utf8", $USERNAME, $PASSWORD);
$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
?> 
