<?php
session_start();

class Database{
    private $severname;
    private $username;
    private $password;
    private $db;
    
    protected function connect(){
        $this->severname = "localhost";
        $this->username = "root";//mydrgvpm_admin
        $this->password = "";//esc1024Bytes
        $this->db = "database";//

        $connect = new mysqli($this->severname, $this->username, $this->password, $this->db);
        
        return $connect;

    }

    public function IdGenerator($table, $id){

        $gen = uniqid(1,2);
        $explode = explode('.', $gen);
        $generated_id = $explode[1];        

        //Check if Generated Id Already exisits on DB
        $sql = "SELECT * FROM $table WHERE $id='$generated_id'  ";
        $query = $this->connect()->query($sql);
        $numRows1 = $query->num_rows;
        if($numRows1 > 0){
            do{
                $gen = uniqid(1,2);
                $explode = explode('.', $gen);
                $generated_id = $explode[1];

                $sql1 = "SELECT * FROM $table WHERE $id='$generated_id'  ";
                $query11 = $this->connect()->query($sql11);
                $rowCheck = $query11->num_rows;
            }while($rowCheck > 0);
        }else{
            $generated_id = $explode[1];        
        }

        return $generated_id;
    }

    protected function CreateDataTables(){
        $create_table = ("CREATE TABLE IF NOT EXISTS register ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` INT(11) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `password` VARCHAR(255) NOT NULL ,  
            `role` VARCHAR(50) NOT NULL ,   
            `code` INT(11) NOT NULL ,   
            `status` INT(11) NOT NULL ,   
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`),
            UNIQUE (`userid`) 
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS profile ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` INT(11) NOT NULL , 
            `firstname` VARCHAR(255) NOT NULL , 
            `lastname` VARCHAR(255) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `phone` VARCHAR(255) NOT NULL ,  
            `address` VARCHAR(255) NOT NULL ,  
            `state` VARCHAR(255) NOT NULL ,  
            `country` VARCHAR(255) NOT NULL , 
            `image` VARCHAR(255) NOT NULL ,  
            PRIMARY KEY  (`id`),
            FOREIGN KEY (`userid`) REFERENCES register(`userid`)
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS box ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `boxid` INT(11) NOT NULL , 
            `box` VARCHAR(255) NOT NULL , 
            `descripton` VARCHAR(1976) NOT NULL , 
            `items` VARCHAR(1976) NOT NULL , 
            `total_sum` VARCHAR(255) NOT NULL , 
            `status` INT(11) NOT NULL ,  
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`)
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS orders ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` INT(11) NOT NULL , 
            `orderid` INT(11) NOT NULL , 
            `name` VARCHAR(255) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `phone` VARCHAR(50) NOT NULL , 
            `address` VARCHAR(555) NOT NULL , 
            `basket` VARCHAR(1976) NOT NULL , 
            `total_sum` VARCHAR(255) NOT NULL , 
            `status` INT(11) NOT NULL ,  
            `delivery_date` DATETIME NOT NULL ,  
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`),
            FOREIGN KEY (`userid`) REFERENCES register(`userid`) 
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS products ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `productid` INT(11) NOT NULL , 
            `category` VARCHAR(255) NOT NULL , 
            `product` VARCHAR(255) NOT NULL , 
            `status` INT(11) NOT NULL ,  
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`)
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);
   
    }

    public function uploadProfile($receipt){
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        // $id = mysqli_real_escape_string($this->connect(), $id);
        
        $fileName = $_FILES['file']['name'];
        $fileTmpName = $_FILES['file']['tmp_name'];
        $fileType = $_FILES['file']['type'];
        $fileSize = $_FILES['file']['size'];
        $fileError = $_FILES['file']['error'];

        $fileExt = explode('.',$fileName);
        $fileActualExt = strtolower(end($fileExt));
        $allowed = array('jpg','pdf','jpeg','png');

        if(in_array($fileActualExt,$allowed)){
            if($fileError == 0){
                if($fileSize < 5000000){
                    $fileNameNew = $userid.$fileName;
                    $fileDestination = "../avatars/";
            
                    $move = move_uploaded_file($fileTmpName, "../avatars/".$fileNameNew);
                    
                    if($move){
                        $sql = "UPDATE profile SET image='$fileNameNew' WHERE userid='$userid' AND email='$email'";
                        $queryy = $this->connect()->query($sql);
                        if($queryy){
                            echo "201";
                            die();
                        }else{
                            echo "401";                                    
                        }

                  
                    }


                }else{
                echo "404";

                }
            }else{
                echo "404";
            }
        }else{
            echo "404";
        }
    }
    
}