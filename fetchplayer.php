<?php
$data = json_decode(file_get_contents("php://input"));
if(empty($data->player1)) {
	$char1 = '%';
}
else {
	$char1 = $data->player1;
}
if(empty($data->player2)) {
	$char2 = '%';
}
else {
	$char2 = $data->player2;
}
if(count_chars($char1) == 0) {
	$char1 = '%';
}
if(count_chars($char2) == 0) {
	$char2 = '%';
}
include("common.php");
function checkUsr ($db, $char1, $char2) {
	$exe = "SELECT * FROM matches WHERE (player1 LIKE :char1 AND player2 LIKE :char2) OR (player1 LIKE :char2 AND player2 LIKE :char1) ORDER BY date DESC";
	$sth = $db->prepare($exe);
	$sth->bindParam(':char1', $char1);
	$sth->bindParam(':char2', $char2);
	$sth->execute();
	$res = $sth->fetchAll();
	return $res;
}

$res = checkUsr($db, $char1, $char2);

echo json_encode($res);
?>