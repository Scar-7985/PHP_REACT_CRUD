<?php

require('./access.php');

$userData = json_decode(file_get_contents("php://input"), true);


if(isset($userData['name']) && isset($userData['phone'])){

$server = "localhost";
$username = "root";
$password = "";
$dbs = "nikhil";

$db_connect = mysqli_connect($server,$username,$password,$dbs);


if($db_connect){
echo "Database Connected Successfully";
}else{
    echo "Couldn't connect to database";
}

$name = $userData['name'];
$phone = $userData['phone'];

$sql = "INSERT INTO `user_data` (`name`, `phone`) VALUES ('$name', '$phone')";


$run_query = $db_connect->query($sql);

$db_connect->close();

}


?>