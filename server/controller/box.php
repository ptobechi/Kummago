<?php
require ("../model/Box.php");
$box = new Box;

if($_POST["action"] == "create_box"){
    $box_name = $_POST["box_name"];
    $box_desc = $_POST["desc"];
    $total = $_POST["total_price"];
    $items =  $_POST["items"];
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

if($_POST["action"] == "getTotalCost"){
    $id = $_POST["id"];

    $box->getTotalCost($id);
}