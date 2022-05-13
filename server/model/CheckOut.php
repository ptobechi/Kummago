<?php
require "../config/connection.php";

class CheckOut extends Database{

    public function createOrder($meal_plan, $delivery_schedule, $delivery_date, $delivery_time, $total_price, $item){
        $this->meal_plan = $meal_plan;
        $this->delivery_schedule = $delivery_schedule;
        $this->delivery_date = $delivery_date;
        $this->delivery_time = $delivery_time;
        $this->total_price = $total_price;
        $this->item = $item;

        $this->CreateDataTables();

        //Escape Strings for Injections
        $meal_plan = mysqli_escape_string($this->connect(), $meal_plan);
        $delivery_schedule = mysqli_escape_string($this->connect(), $delivery_schedule);
        $delivery_date = mysqli_escape_string($this->connect(), $delivery_date);
        $delivery_time = mysqli_escape_string($this->connect(), $delivery_time);
        $total_price = mysqli_escape_string($this->connect(), $total_price);
        $item = mysqli_escape_string($this->connect(), $item);

        $userid = "55923633";
        $email = "tobechipaschal@gmail.com";
        $name = "Tobechi Paschal";
        $phone = "08147153986";
        $address = "No:14 D Street Abuja";

        if($delivery_schedule = "One_Time"){
            $description = "This is a one time delivery scheduled to be delivered on $delivery_date ";
        }else {
            $description = "This is a daily delivery scheduled to be start delivery from $delivery_date by $delivery_time";
        }
        
        //check logged user and collect information
        // $sql = "SELECT * FROM profile WHERE userid='$userid' AND email='$email' ";
        // $query = $this->connect()->query($sql);
        // $numRows = $query->num_rows;
        // if($numRows > 0){
        //     while($rows = $query->fetch_assoc()){
        //         $name = $rows["firstname"]." ".$rows["lastname"];
        //         $phone = $rows["phone"];
        //         $address = $rows["address"];
        //     }
        // }else{
        //     echo "500";
        //     exit;
        // }

        //Generate Userid 
        $orderid = $this->IdGenerator("orders", "orderid");
                                                                                                            
        //INSERT INTO TABLE
        $sql3 = "INSERT INTO orders SET userid='$userid', orderid='$orderid', name='$name', email='$email', phone='$phone', address='$address', meal_plan='$meal_plan', description='$description',  total_price='$total_price', basket='$item', date=NOW() ";
        $query3 = $this->connect()->query($sql3);
        if($query3){             
            echo "201";
            exit;
        }else{
            echo "400";
            exit;
        }


    }


}