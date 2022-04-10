<?php
require "../config/connection.php";

class Box extends Database{

    public function uploadBox($box_name, $box_desc, $item, $total){
        $this->box_name = $box_name;
        $this->box_desc = $box_desc;
        $this->item = $item;
        $this->total = $total;

        $this->CreateDataTables();

        //Escape Strings for Injetions
        $box_name = mysqli_escape_string($this->connect(), $box_name);
        $box_desc = mysqli_escape_string($this->connect(), $box_desc);
        $item = mysqli_escape_string($this->connect(), $item);
        $total = mysqli_escape_string($this->connect(), $total);

        //Generate Userid 
        $boxid = $this->IdGenerator("box", "boxid");

        //INSERT INTO TABLE
        $sql3 = "INSERT INTO box SET boxid='$boxid', box='$box_name', descripton='$box_desc', items='$item', total_sum='$total', date=NOW() ";
        $query3 = $this->connect()->query($sql3);
        if($query3){             
            echo "201";
            exit;
        }else{
            echo "400";
            exit;
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
                    <input class='btn-check' type='radio' name='offer_type' value='2' />
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
                </label></div>
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
}