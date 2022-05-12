<?php
require "../config/connection.php";

class Product extends Database{

    public function uploadProduct($category, $product){
        $this->category = $category;
        $this->product = $product;

        $this->CreateDataTables();

        //Escape Strings for Injetions
        $category = mysqli_escape_string($this->connect(), $category);
        $product = mysqli_escape_string($this->connect(), $product);

        //Generate Userid 
        $productid = $this->IdGenerator("products", "productid");

        //INSERT INTO TABLE
        $sql3 = "INSERT INTO products SET productid='$productid', category='$category', product='$product', status='1', date=NOW() ";
        $query3 = $this->connect()->query($sql3);
        if($query3){             
            echo "201";
            exit;
        }else{
            echo "400";
            exit;
        }


    }

    function searchProducts($input){
        $sql = "SELECT * FROM products WHERE product LIKE '%$input%' LIMIT 5";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($rows = $query->fetch_assoc()){
                echo "
                    <div class='d-flex align-items-center m-3' id='$rows[product]-$rows[price]' onclick='addItem(this.id)'>
                        <span class='bullet bullet-vertical h-20px bg-success'></span>
                        <div class='flex-grow-1 mx-5'>
                            <span id='item' class='text-gray-800 text-hover-primary fw-bolder fs-6'>$rows[product]</span>
                        </div>
                        <span class='badge badge-light-success fs-8 fw-bolder'> &#x20A6 <span>$rows[price]</span></span>
                    </div>
                    <div class='separator'></div>
                ";   
            }
        }else{
            echo "No result found";
        }
        
    }

    public function getProducts(){
        $sql = "SELECT * FROM products ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($rows = $query->fetch_array()){
                $row[] = "
                    <div class='col-6 col-md-4 col-lg-3'>
                        <div class='product product-11 text-center'>
                            <figure class='product-media'>
                                <a href='product.html'>
                                    <img src='assets/images/demos/demo-2/products/product-2-1.jpg'
                                        alt='Product image' class='product-image'>
                                </a>
                                <div class='product-action-vertical'>
                                    <a href='#' class='btn-product-icon btn-wishlist'><span>add to
                                            wishlist</span></a>
                                </div>
                            </figure>
                    
                            <div class='product-body'>
                                <h3 class='product-title'>
                                    <a href='product.html'>
                                        <span class='text-primary'>
                                            <strong>$rows[product]</strong>
                                        </span>
                                    </a>
                                </h3>
                    
                                <div class='product-price'>
                                    <span>&#8358 $rows[price]</span>
                                </div>
                    
                                <div class='text-center justify-content-center'>
                                    <button class='btn btn-primary btn-round' id='$rows[product]-$rows[price]' onclick='addItem(this.id)'>Add to Box</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ";
            }
        }else{
            return null;
            exit;
        }

         foreach($row as $data){
            echo $data;

        }
    }

    public function getBoxDetails($id){
        $sql = "SELECT * FROM box WHERE id='$id' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($rows = $query->fetch_assoc()){
                $data = json_decode($rows["items"], true);
                // $data = $rows["items"];
            }
        }else{
            return null;
            exit;
        }
        // $data[$i]["item"]
        $count = sizeof($data);
        // print_r($data[0]);
        for($i=0; $i < $count; $i++){
            echo " 
                <div class='d-flex flex-stack my-5'>
                    <div class='d-flex align-items-center me-5'>
                        <div class='me-5'>
                            <a href='#' class='text-gray-800 fw-bolder text-hover-primary fs-6'>".$data[$i]["item"]."</a>
                            <input type='hidden'  id='list$i' name='item[]' value='".$data[$i]["item"]."'>
                        </div>
                    </div>
                    <div class='text-gray-400 fw-bolder fs-7 text-end'>
                        <input type='number' placeholder='&#8358 ".$data[$i]["price"]."' value='".$data[$i]["price"]."' name='price' id='item_price$i'>
                        <span class='text-danger' onclick='removeItem(this.id)' id='$i'>Remove</span>
                    </div>
                </div>
                <div class='separator separator-dashed my-5'></div>
            ";

            // echo $data[$i]["item"]."====".$data[$i]['price'];
        }
        
       

    }
}