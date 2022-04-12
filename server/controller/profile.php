<?php
require ("../model/User.php");
$user = new User;

if(isset($_POST["update_profile"])){
   echo  $firstname = $_POST["first_name"];
    $lastname = $_POST["last_name"];
    $phone = $_POST["phone_number"];
    $address = $_POST["home_address"];
    $state = $_POST["state"];    
    
    $user->updateProfile($firstname, $lastname, $phone, $address, $state);

}