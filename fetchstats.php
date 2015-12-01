<?php

include("common.php");
function checkUsr ($db) {
	$exe = "SELECT cname, wins, total-wins as losses, total, wins/total as wr FROM wrstats ORDER by cname";
	$sth = $db->prepare($exe);
	$sth->execute();
	$res = $sth->fetchAll();
	return $res;
}
$res = checkUsr($db);

echo json_encode($res);
?>