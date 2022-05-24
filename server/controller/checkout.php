<?php
require ("../model/CheckOut.php");
$proceed = new CheckOut;

if($_POST["action"] == "create_order"){
    $email =$_POST["email"];
    $phone = $_POST["phone"];
    $address = $_POST["address"];
    $state = $_POST["state"];
    $meal_plan = $_POST["meal_plan"];
    $delivery_date = $_POST["delivery_day"];
    $delivery_schedule = $_POST["delivery_schedule"];
    $delivery_time = $_POST["delivery_time"];
    $total_price = $_POST["total_price"];
    $items =  $_POST["basket"];
    $item = json_encode($items, true);

    $proceed->createOrder($email, $phone, $address, $state, $meal_plan, $delivery_schedule, $delivery_date, $delivery_time, $total_price, $item);
}elseif($_POST["action"] == "getAddress"){
    $proceed->getDefaultAddress();
}
