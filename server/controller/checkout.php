<?php
require ("../model/CheckOut.php");
$proceed = new CheckOut;

if($_POST["action"] == "create_box"){
    $meal_plan = $_POST["meal_plan"];
    $delivery_date = $_POST["delivery_day"];
    $delivery_schedule = $_POST["delivery_schedule"];
    $delivery_time = $_POST["delivery_time"];
    $total_price = $_POST["total_price"];
    $items =  $_POST["items"];
    $item = json_encode($items, true);

    $proceed->createOrder($meal_plan, $delivery_schedule, $delivery_date, $delivery_time, $total_price, $item);
}
