<?php
require "../config/connection.php";

class CheckOut extends Database{

    public function createOrder($email, $phone, $address, $state, $meal_plan, $delivery_schedule, $delivery_date, $delivery_time, $total_price, $item){
        $this->email = $email;
        $this->phone = $phone;
        $this->address = $address;
        $this->state = $state;
        $this->meal_plan = $meal_plan;
        $this->delivery_schedule = $delivery_schedule;
        $this->delivery_date = $delivery_date;
        $this->delivery_time = $delivery_time;
        $this->total_price = $total_price;
        $this->item = $item;

        $this->CreateDataTables();

        //Escape Strings for Injections
        $email = mysqli_escape_string($this->connect(), $email);
        $phone = mysqli_escape_string($this->connect(), $phone);
        $address = mysqli_escape_string($this->connect(), $address);
        $state = mysqli_escape_string($this->connect(), $state);
        $meal_plan = mysqli_escape_string($this->connect(), $meal_plan);
        $delivery_schedule = mysqli_escape_string($this->connect(), $delivery_schedule);
        $delivery_date = mysqli_escape_string($this->connect(), $delivery_date);
        $delivery_time = mysqli_escape_string($this->connect(), $delivery_time);
        $total_price = mysqli_escape_string($this->connect(), $total_price);
        $item = mysqli_escape_string($this->connect(), $item);

        if(isset($_SESSION["userid"]) && isset($_SESSION["email"])){
            $userid = $_SESSION["userid"];
            $email = $_SESSION["email"];
            //check logged user and collect information
            $sql = "SELECT * FROM profile WHERE userid='$userid' AND email='$email' ";
            $query = $this->connect()->query($sql);
            $numRows = $query->num_rows;
            if($numRows > 0){
                while($rows = $query->fetch_assoc()){
                    $name = $rows["firstname"]." ".$rows["lastname"];
                }
            }else{
                echo "500";
                exit;
            }
        }else{
            echo "NO";
        }

        if($delivery_schedule = "One_Time"){
            $description = "This is a one time delivery scheduled to be delivered on $delivery_date ";
        }else {
            $description = "This is a daily delivery scheduled to be start delivery from $delivery_date by $delivery_time";
        }

        //Generate Userid 
        $orderid = $this->IdGenerator("orders", "orderid");
                                                                                                            
        //INSERT INTO TABLE
        $sql3 = "INSERT INTO orders SET userid='$userid', orderid='$orderid', name='$name', email='$email', phone='$phone', address='$address', meal_plan='$meal_plan', basket='$item', total_price='$total_price', description='$description', status='0', date=NOW() ";
        $query3 = $this->connect()->query($sql3);
        if($query3){    
            $data = array("status"=>"201", "email"=>$email, "orderid"=>$orderid, "amount"=>$total_price);     
            $xdata = json_encode($data, true);    
            echo $xdata;
            exit;
        }else{
            echo "400";
            exit;
        }


    }

    public function getDefaultAddress(){
        if(isset($_SESSION["userid"]) && isset($_SESSION["email"])){
            $userid = $_SESSION["userid"];
            $email = $_SESSION["email"];
        }else{
            echo "404";
            exit;
        }

        $sql = "SELECT * FROM profile WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        $num = $query->num_rows;
        if($num > 0){
            while($row = $query->fetch_assoc()){
                $address = $row["address"];
                $state = $row["state"];

                echo "
                    <div class='row'>
                        <div class='col-sm-6'>
                            <label>Phone Number *</label>
                            <input type='text' id='default_phone' class='form-control' value='$row[phone]'>
                        </div>

                        <div class='col-sm-6'>
                            <label>Email Address *</label>
                            <input type='text' id='default_email' class='form-control' value='$row[email]'>
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col-sm-6'>
                            <label>Address *</label>
                            <input type='text' id='default_address' class='form-control'
                                placeholder='Appartments, suite, unit etc ...' value='$row[address]'>
                        </div>
                        <div class='col-sm-6'>
                            <label>State / County *</label>
                            <input type='text' id='default_state' class='form-control' value='$row[state]'>
                        </div>
                    </div>
                ";

            }
        }else{
            echo "404";
        }
    }


}