<?php
$data = json_decode(file_get_contents("php://input"));
$reason = $data->reason;
$mid = $data->mid;
include("common.php");
function checkUsr ($db, $mid, $reason) {
    $exe = "INSERT INTO reports (matchid, reason) VALUES (:char1, :char2)";
    $sth = $db->prepare($exe);
    $sth->bindParam(':char1', $mid);
    $sth->bindParam(':char2', $reason);
    $sth->execute();
}
checkUsr($db, $mid, $reason);
echo("complete");
?>