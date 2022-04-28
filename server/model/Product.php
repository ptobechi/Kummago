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

    public function getBox(){
        $sql = "SELECT * FROM box ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($rows = $query->fetch_array()){
                $row[] = "
                    <label class='btn btn-outline btn-outline-dashed btn-outline-default d-flex text-start p-6'>
                        <input class='btn-check' type='radio' id='offer_type' value='$rows[id]' data-id='$rows[id]'/>
                        <span class='d-flex'>
                            <span class='svg-icon svg-icon-3hx'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                                    <rect x='2' y='2' width='9' height='9' rx='2' fill='black' />
                                    <rect opacity='0.3' x='13' y='2' width='9' height='9' rx='2' fill='black' />
                                    <rect opacity='0.3' x='13' y='13' width='9' height='9' rx='2' fill='black' />
                                    <rect opacity='0.3' x='2' y='13' width='9' height='9' rx='2' fill='black' />
                                </svg>
                            </span>
                            <span class='ms-4'>
                                <span class='fs-3 fw-bolder text-gray-900 mb-2 d-block'>$rows[box]</span>
                                <span class='fw-bold fs-4 text-muted'>$rows[descripton]</span>
                            </span>
                        </span>
                    </label>
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