<?php

require('./access.php');
header('Content-Type: application/json');

$host = "localhost";
$username = "root";
$password = "";
$db_name = "nikhil";


$mysqli = new mysqli($host, $username, $password, $db_name);


if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}



$data = json_decode(file_get_contents("php://input"), true);


$userId = (int) $data['userId'];


$sql = "DELETE FROM user_data WHERE id = $userId";


$mysqli->query($sql);

?>
