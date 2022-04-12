<?php
require "../config/connection.php";

class Order extends Database{

    public function createOrder($basket, $total, $status, $delivery_date){
        $this->basket = $basket;
        $this->total = $total;
        $this->status = $status;
        $this->delivery_date = $delivery_date;

        $this->CreateDataTables();

        //Escape Strings for Injections
        $basket = mysqli_escape_string($this->connect(), $basket);
        $total = mysqli_escape_string($this->connect(), $total);
        $status = mysqli_escape_string($this->connect(), $status);
        $delivery_date = mysqli_escape_string($this->connect(), $delivery_date);
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];
        

        //check logged user and collect information
        $sql = "SELECT * FROM profile WHERE  userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($rows = $query->fetch_assoc()){
                $name = $rows["firstname"]." ".$rows["lastname"];
                $phone = $rows["phone"];
                $address = $rows["address"];
            }
        }else{
            echo "500";
            exit;
        }

        //Generate Userid 
        $orderid = $this->IdGenerator("orders", "orderid");

        //INSERT INTO TABLE
        $sql3 = "INSERT INTO orders SET userid='$userid', orderid='$orderid', name='$name', email='$email', phone='$phone', address='$address', basket='$basket', total_sum='$total', status='$status', delivery_date='$delivery_date', date=NOW() ";
        $query3 = $this->connect()->query($sql3);
        if($query3){             
            echo "201";
            exit;
        }else{
            echo "400";
            exit;
        }


    }

    public function getOrders(){
        $email = $_SESSION["email"];
        $userid = $_SESSION["userid"];
        $sql = "SELECT * FROM orders WHERE userid='$userid' AND email='$email' AND status != '0' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($rows = $query->fetch_assoc()){
                $data = json_decode($rows["basket"], true);
                $count = sizeof($data);
                // for($i=0; $i < $count; $i++){
                    // $dat
                    if($rows["status"] == "1"){
                        $status = "Processing";
                    }
                $rowa[] = "
                    <tr>
                        <td class='text-dark fw-bolder text-hover-primary fs-6'>".$data["box_name"]."</td>
                        <td class='text-dark fw-bolder text-hover-primary fs-6'>$rows[total_sum]</td>
                        <td class='text-dark fw-bolder text-hover-primary fs-6'>$status</td>
                    </tr>    
                ";
            // }

            }
        }else{
            return null;
            exit;
        }

         foreach($rowa as $data){
            echo $data ."<br/>";

        }
    }

    public function getDraftedOrder(){
        $email = $_SESSION["email"];
        $userid = $_SESSION["userid"];
        $sql = "SELECT * FROM orders WHERE userid='$userid' AND email='$email' AND status != '0'  ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($rows = $query->fetch_array()){
                $data = json_decode($rows["basket"], true);
                $date = explode(" ", $rows["delivery_date"]);
                $delivery_date = $date[0];
                $row[] = "
                    <div class='d-flex align-items-center mb-8'>
                        <span class='bullet bullet-vertical h-40px bg-success'></span>
                        <div class='flex-grow-1 mx-5'>
                            <a href='#' class='text-gray-800 text-hover-primary fw-bolder fs-6'>$data[box_name]</a>
                            <span class='text-muted fw-bold d-block'>Due on $delivery_date</span>
                        </div>
                        <span class='badge badge-light-success fs-8 fw-bolder'>Edit</span>
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

    public function getOrderDetails($id){
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
                </div></div>";

            // echo $data[$i]["item"]."====".$data[$i]['price'];
        }
        
       

    }
}