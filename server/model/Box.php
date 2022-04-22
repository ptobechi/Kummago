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
            echo ` 
                <tr>
                    <td>
                        <div class="d-flex align-items-center" data-kt-ecommerce-edit-order-filter="product" data-kt-ecommerce-edit-order-id="product_30">
                            <div class="ms-5">
                                <a class="text-gray-800 text-hover-primary fs-5 fw-bolder">$data[$i]["item"].toUpperCase()</a>
                                <input type='hidden' value='".$data[$i]["item"]."' name='item[]' class='box_items' />
                            </div>
                        </div>
                    </td>
                    <td>
                        <icon class='fa fa-minus-circle' id='${item.name}' onclick="reduceinCart(this.id)"></icon>
                         <span class='fs-5'>${item.inCart}</span>
                         <input type='hidden' class='box_items_qty' id='qty$i' id='qty[]' value='1'>
                        <icon class='fa fa-plus-circle' id='${item.name}' onclick="increaseinCart(this.id)"></icon>
                    </td>
                    <td> 
                        &#8358;
                        <span class="item-price" data-kt-ecommerce-edit-order-filter="price">&#8358 ".$data[$i]["price"]."</span>
                        <input type='hidden' class='box_items_price' placeholder='&#8358 ".$data[$i]["price"]."' value='".$data[$i]["price"]."' name='price' id='item_price$i'>
                        <input type='hidden' value='${item.price}' name='price[]' class='box_items_price' />
                        <input type='hidden' value='${item.inCart}' name='quantity[]' class='box_items_qty' />
                    </td>
                    <td class="text-end pe-5" data-order="22"><icon class='fa fa-times-circle' id='${item.name}' onclick="removeProduct(this.id)"></icon></td>
                </tr>
            `;
        }
        
       

    }

    public function getTotalCost($id){
        $sql = "SELECT * FROM box WHERE id='$id' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($rows = $query->fetch_assoc()){
                echo $rows["total_sum"];
            }
        }else{
            echo null;
            exit;
        }
      
        
       

    }
}