<?php
$data = json_decode(file_get_contents("php://input"));
include("common.php");
function checkUsr ($db) {
    $exe = "SELECT DISTINCT local FROM matches";
    $sth = $db->prepare($exe);
    $sth->execute();
    $res = $sth->fetchAll();
    return $res;
}
$res = checkUsr($db);
echo json_encode($res);
?>