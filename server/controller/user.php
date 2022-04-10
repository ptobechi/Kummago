<?php
require ("../model/User.php");
$user = new User;

if($_POST["action"] == "register"){
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $user->userRegistration($firstname, $lastname, $email, $password);
}elseif($_POST["action"] == "login"){
    $email = $_POST["email"];
    $password = $_POST["password"];

    $user->UserLogin($email, $password);
}