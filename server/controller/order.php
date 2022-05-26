<?php
require ("../model/Order.php");
$box = new Order;

if($_POST["action"] == "place_order"){
    $total = $_POST["total_price"];
    $delivery_date = $_POST["delivery_date"];
    $status = $_POST["orderStatus"];
    $items =  $_POST["basket"];
    $basket = json_encode($items, true);

    $box->createOrder($basket, $total, $status, $delivery_date);
}

if($_POST["action"] == "getOrder"){
    $box->getOrders();
}

if($_POST["action"] == "getOrderDetails"){
    $id = $_POST["id"];

    $box->getBoxDetails($id);
}

if($_POST["action"] == "getDraftedOrder"){
    $box->getDraftedOrder();
}

if($_POST["action"] == "getDraftedOrderDetails"){
    $id = $_POST["id"];
    // echo "okl";

    $box->getDraftedOrderDetails($id);
}

if($_POST["action"] == "update_order"){
    $orderid = $_POST["reference"];

    $box->updateOrder($orderid);
}