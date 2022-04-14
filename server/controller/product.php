<?php
require ("../model/Product.php");
$obj = new Product;

if($_POST["action"] == "upload_product"){
    $category = $_POST["category"];
    $product = $_POST["product"];

    $obj->uploadProduct($category, $product);
}
