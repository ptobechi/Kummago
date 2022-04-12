<?php
require ("../model/Box.php");
$box = new Box;

if($_POST["action"] == "place_order"){
    $box_name = $_POST["box_name"];
    $box_desc = $_POST["box_description"];
    $total = $_POST["total_price"];
    $items =  $_POST["box_item"];
    $item = json_encode($items, true);

    // echo $item;

    $box->uploadBox($box_name, $box_desc, $item, $total);
}

if($_POST["action"] == "getBox"){
    $box->getBox();
}

if($_POST["action"] == "getBoxDetails"){
    $id = $_POST["id"];

    $box->getBoxDetails($id);
}