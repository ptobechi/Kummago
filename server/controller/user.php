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
    $user->userLogin($email, $password);
    
}elseif($_POST["action"] == "getProfile"){
    
    $user->retrieveProfile();

}elseif($_POST["action"] == "authUser"){
    
    $user->authusers();

}elseif($_POST["action"] == "getProfilePics"){
    
    $user->retrieveProfilePics();

}elseif($_POST["action"] == "update_profile"){
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $phone = $_POST["phonenumber"];
    $address = $_POST["address"];
    $state = $_POST["state"];    

    $user->updateProfile($firstname, $lastname, $phone, $address, $state);
}else{
    $receipt = $_FILES["file"]["name"];

    $user->uploadProfile($receipt);
}