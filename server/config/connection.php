<?php
session_start();
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

class Database{
    private $severname;
    private $username;
    private $password;
    private $db;
    
    protected function connect(){
        $this->severname = "localhost";
        $this->username = "root";//kumamjuy_kumamjuy
        $this->password = "";//Ck#z8uxD6jo7
        $this->db = "database";//kumamjuy_database

        $connect = new mysqli($this->severname, $this->username, $this->password, $this->db);
        
        return $connect;

    }

    public function configMsg($email, $name, $msg_subject, $msg_body){
        // Instantiation and passing `true` enables exceptions
        $mail = new PHPMailer(true);
        try {
            //Server settings
            // $mail->SMTPDebug = SMTP::DEBUG_SERVER;            // Enable verbose debug output
            $mail->isSMTP();                                    // Send using SMTP
            $mail->Host       = "www.kumagofoods.store";       // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                         // Enable SMTP authentication
            $mail->Username   = "noreply@kumagofoods.store"; // SMTP username
            $mail->Password   =  "tE8p56NPaDt_fzB";         // SMTP password
            $mail->SMTPSecure = 'ssl';                     // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 465;                      // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above         

            //Recipients
            $mail->setFrom("noreply@kumagofoods.store", "Kumagofoods Abuja");
            $mail->addAddress($email, $email);        // Add a recipient
            // $mail->AddBCC('info@fundingoptionsinvestment.com', 'Admin');      // Add a recipient

            // Content
            $mail->isHTML(true);   // Set email format to HTML
            $mail->Subject = $msg_subject;

            $mail->Body  = $msg_body;
            
            $mail = $mail->send();
            if($mail){
                echo "done";
            }else{
                echo "failed";
            }
            
            // die();
        } catch (Exception $e) {
            return $mail->ErrorInfo;
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            die();

        }
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

        $create_table = ("CREATE TABLE IF NOT EXISTS billing_address ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `userid` INT(11) NOT NULL , 
            `email` VARCHAR(255) NOT NULL , 
            `street` VARCHAR(255) NOT NULL , 
            `apartment_unit` VARCHAR(255) NOT NULL , 
            `city` VARCHAR(255) NOT NULL ,  
            `address` VARCHAR(255) NOT NULL ,  
            `state` VARCHAR(255) NOT NULL ,  
            `country` VARCHAR(255) NOT NULL , 
            `image` VARCHAR(255) NOT NULL ,  
            PRIMARY KEY  (`id`),
            FOREIGN KEY (`userid`) REFERENCES register(`userid`)
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
            `meal_plan` VARCHAR(555) NOT NULL , 
            `basket` VARCHAR(1976) NOT NULL , 
            `total_price` VARCHAR(255) NOT NULL , 
            `description` VARCHAR(255) NOT NULL , 
            `status` INT(11) NOT NULL ,  
            `date` DATETIME NOT NULL ,  
            `delivery_date` DATETIME NOT NULL ,  
            PRIMARY KEY  (`id`),
            FOREIGN KEY (`userid`) REFERENCES register(`userid`) 
        )ENGINE = InnoDB;");
        $create = $this->connect()->query($create_table);

        $create_table = ("CREATE TABLE IF NOT EXISTS products ( 
            `id` INT NOT NULL AUTO_INCREMENT ,
            `productid` INT(11) NOT NULL , 
            `category` VARCHAR(255) NOT NULL , 
            `product_name` VARCHAR(255) NOT NULL , 
            `product_price` VARCHAR(255) NOT NULL , 
            `description` VARCHAR(255) NOT NULL , 
            `image` VARCHAR(255) NOT NULL , 
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

    public function addNotifications($msg_title, $msg_subject, $msg_body){
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];
        $sql = "INSERT INTO notifications SET msg_title='$msg_title', msg_subject='$msg_subject', msg_body='$msg_body', userid='$userid', email='$email' ";
        $query = $this->connect()->query($sql);
        if($query){
            return true;
        }else{
            return false;
        }

    }
    
}

