<?php

$servername = "localhost";
$username = "root";
$password = "";

$connect = new mysqli($servername, $username, $password);

if ($connect -> connect_error)
{
    die ("Connection Failed : " .$connect->connect_error());
}

mysqli_close($connect);
?>