<?php

require('./access.php');

$server = "localhost";
$username = "root";
$password = "";
$dbs = "nikhil";

$db_connect = mysqli_connect($server, $username, $password, $dbs);

if ($db_connect) {
} else {
    die("Couldn't connect to the database: " . mysqli_connect_error());
}

$sql = "SELECT * FROM `user_data`";
$run_query = $db_connect->query($sql);

$userData = [];

if ($run_query->num_rows > 0) {
    while ($row = $run_query->fetch_assoc()) {
        $userData[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($userData);

$db_connect->close();

?>
