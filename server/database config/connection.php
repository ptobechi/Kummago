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
        $sql1 = "SELECT * FROM $table WHERE $table='$id'  ";
        $query1 = $this->connect()->query($sql1);
        $numRows1 = $query1->num_rows;
        if($numRows1 > 0){
            do{
                $gen = uniqid(1,2);
                $explode = explode('.', $gen);
                $generated_id = $explode[1];

                $sql1 = "SELECT * FROM $table WHERE $table='$id'  ";
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
            `userid` VARCHAR(255) NOT NULL , 
            `name` VARCHAR(255) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `password` VARCHAR(255) NOT NULL ,  
            `phrase` VARCHAR(500) NOT NULL ,  
            `status` VARCHAR(255) NOT NULL ,   
            `code` VARCHAR(255) NOT NULL ,   
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`),
            UNIQUE (`userid`) 
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS profile ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` VARCHAR(255) NOT NULL , 
            `name` VARCHAR(255) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `phone` VARCHAR(255) NOT NULL ,  
            `wallet` VARCHAR(255) NOT NULL , 
            `address` VARCHAR(255) NOT NULL ,  
            `country` VARCHAR(255) NOT NULL , 
            `postal` VARCHAR(255) NOT NULL ,  
            `front` VARCHAR(255) NOT NULL ,  
            `back` VARCHAR(255) NOT NULL ,  
            `referral_code` VARCHAR(500) NOT NULL ,  
            `status` VARCHAR(255) NOT NULL ,   
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`),
            FOREIGN KEY (`userid`) REFERENCES register(`userid`)
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS portfolio ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` VARCHAR(255) NOT NULL , 
            `crypto_id` VARCHAR(255) NOT NULL , 
            `name` VARCHAR(255) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `amount` VARCHAR(255) NOT NULL , 
            `crypto_amount` VARCHAR(255) NOT NULL , 
            `crypto_name` VARCHAR(255) NOT NULL , 
            `profit` VARCHAR(255) NOT NULL , 
            `roi_period` VARCHAR(255) NOT NULL , 
            `plan` VARCHAR(255) NOT NULL , 
            `wallet_address` VARCHAR(255) NOT NULL , 
            `receipt` VARCHAR(255) NOT NULL , 
            `status` VARCHAR(255) NOT NULL ,  
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`),
            FOREIGN KEY (`userid`) REFERENCES register(`userid`)
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS withdrawals ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` VARCHAR(255) NOT NULL , 
            `withdrawalid` VARCHAR(255) NOT NULL , 
            `name` VARCHAR(255) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `amount` VARCHAR(255) NOT NULL , 
            `crypto_amount` VARCHAR(255) NOT NULL , 
            `crypto_name` VARCHAR(255) NOT NULL , 
            `action` VARCHAR(255) NOT NULL , 
            `wallet_address` VARCHAR(255) NOT NULL , 
            `status` VARCHAR(255) NOT NULL ,  
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`),
            FOREIGN KEY (`userid`) REFERENCES register(`userid`) 
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS wallet_address ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `currency` VARCHAR(255) NOT NULL , 
            `address` VARCHAR(255) NOT NULL , 
            `img` VARCHAR(255) NOT NULL , 
            `tag` VARCHAR(255) NOT NULL , 
            PRIMARY KEY  (`id`)
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);


        $create_table = ("CREATE TABLE IF NOT EXISTS admin ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` INT(11) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `password` VARCHAR(255) NOT NULL , 
            `status` INT(11) NOT NULL , 
            `date` DATETIME NOT NULL , 
            PRIMARY KEY  (`id`)
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS bonus ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` VARCHAR(255) NOT NULL , 
            `bonusid` VARCHAR(255) NOT NULL , 
            `investmentid` VARCHAR(255) NOT NULL , 
            `investor` VARCHAR(255) NOT NULL , 
            `bonus` VARCHAR(255) NOT NULL , 
            `currency` VARCHAR(255) NOT NULL , 
            `action` VARCHAR(255) NOT NULL , 
            `amount` VARCHAR(255) NOT NULL , 
            `status` VARCHAR(255) NOT NULL ,   
            `investment_date` DATETIME NOT NULL ,  
            `date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`),
            FOREIGN KEY (`userid`) REFERENCES register(`userid`)
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

   
    }

    public function uploadProfile($id, $receipt){
        $this->id = $id;

        $id = mysqli_real_escape_string($this->connect(), $id);
        
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
                    $fileNameNew = $id.$fileName;
                    $fileDestination = "../File Manager/";
            
                    $move = move_uploaded_file($fileTmpName, "../File Manager/".$fileNameNew);
                    
                    if($move){
                        $sql = "UPDATE portfolio SET receipt='$fileNameNew', status='1' WHERE crypto_id={$id} ";
                        $queryy = $this->connect()->query($sql);
                        if($queryy){
                            echo "<script>
                                alert('Reciept Uploaded Successfully, account under review. Your account status will be updated ');
                                    window.location='../$';
                            </script>";
                            die();
                        }else{
                            echo "<script>
                                    alert('Failed to upload receipt pls try again');
                                    history.back();
                            </script>";                                    
                        }

                  
                    }


                }else{
                echo "<script>alert('File Size is too large.. Try Again!!');
                    history.back();
                </script>";

                }
            }else{
                echo "<script>alert('Error Occured Uploading File.. Try Again!!');
                    history.back();
                </script>";
            }
        }else{
            echo "<script>alert('Error Occured Uploading File.. Try Again!!');
                history.back();
            </script>";
        }
    }
    
}