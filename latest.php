<?php 
include("common.php");
$data = json_decode(file_get_contents("php://input"));

function getLatest($db) {


	$exe = "SELECT * FROM matches ORDER BY date DESC LIMIT 50";
	$sth = $db->prepare($exe);
	$sth->execute();
	$res = $sth->fetchAll();
	return $res;
}

		$res = getLatest($db);
		echo json_encode($res);
?>