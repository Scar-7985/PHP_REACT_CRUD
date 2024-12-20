<?php

require('./access.php');
header('Content-Type: application/json');

$host = "localhost";
$username = "root";
$password = "";
$db_name = "nikhil";

$conn = new mysqli($host, $username, $password, $db_name);

if ($conn->connect_error) {
    echo json_encode(["message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$name = $data['name'];
$phone = $data['phone'];

$query = "UPDATE user_data SET name = '$name', phone = '$phone' WHERE id = $id";

$conn->query($query);


$conn->close();

?>
