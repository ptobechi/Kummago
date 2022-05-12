<?php
require ("../model/Product.php");
$obj = new Product;

if($_POST["action"] == "upload_product"){
    $category = $_POST["category"];
    $product = $_POST["product"];

    $obj->uploadProduct($category, $product);
}elseif($_POST["action"] == "searchproduct"){
    $input = $_POST["input"];

    $obj->searchProducts($input);
}elseif($_POST["action"] == "getProducts"){

    $obj->getProducts();
}

