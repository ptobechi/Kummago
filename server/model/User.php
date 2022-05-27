<?php
require "../model/Message.php";

class User extends Messages{

    public function authusers(){
        if(empty($_SESSION)){
            echo "404";
            die();
        }else{
            $userid = $_SESSION["userid"];
            $email = $_SESSION["email"];
        }

        //Check if account is logged in
        $sql = "SELECT * FROM profile WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        $Logged_user = $query->num_rows;
        if($Logged_user > 0){
            while($rows = $query->fetch_assoc()){
                $data = array("200", "$rows[email]", "$rows[firstname] $rows[lastname]");
            }
            echo json_encode($data);   
        }else{
            echo "404";
            die();
        }
        
        
    }
    
    public function userRegistration($firstname, $lastname, $email, $password){
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        $this->password = $password;

        $this->CreateDataTables();

        //Escape Strings for Injetions
        $firstname = mysqli_escape_string($this->connect(), $firstname);
        $lastname = mysqli_escape_string($this->connect(), $lastname);
        $email = mysqli_escape_string($this->connect(),$email);
        $password = mysqli_escape_string($this->connect(),$password);

        //Generate Userid 
        $userid = $this->IdGenerator("register", "userid");

        // $pass = md5($password);
        $email_address = strtolower($email);

        //Check email if already registered
        // $sql = "SELECT email FROM register WHERE email='$email_address'";
        // $query = $this->connect()->query($sql);
        // $numRows = $query->num_rows;
        // if($numRows > 0){
        //     echo "302";
        //     exit;
        // }

        //INSERT INTO TABLE
        $sql3 = "INSERT INTO register SET userid='$userid', email='$email_address', password='$password', role='user', status='0', date=NOW() ";
        $query3 = $this->connect()->query($sql3);
        if($query3){ 
            $sql4 = "INSERT INTO profile SET userid='$userid', firstname='$firstname', lastname='$lastname', email='$email_address'";
            $query4 = $this->connect()->query($sql4);

            $email = $email_address;
            $name = $firstname." ".$lastname;

            $this->sendEmailVerification($email, $name);
            
            // echo "201";
            exit;
        }else{
            echo "400";
            exit;

        }


    }

    public function userLogin($email, $password){
        $this->email = $email;
        $this->password = $password;

        $email = mysqli_escape_string($this->connect(), $email);
        $password = mysqli_escape_string($this->connect(), $password);

        $email_address = strtolower($email);
        // $pass = md5($password);

        $sql = "SELECT * FROM register WHERE email='$email_address' AND password='$password' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($row = mysqli_fetch_assoc($query)){
                $_SESSION["email"] = $row["email"];
                $_SESSION["userid"] = $row["userid"];

                if($row["status"] == "0" AND $row["role"] == "user"){
                    // $this->verify($email, $fname);
                    echo "403";
                    exit;
                }elseif($row["status"] == "1" AND $row["role"] == "user"){
                    ///check if profile is updated
                    echo "202";
                    exit;
                }elseif($row["status"] == "2" AND $row["role"] == "user"){
                    //verified
                    echo "200";
                    exit;
                }elseif($row["status"] == "3" AND $row["role"] == "user"){
                    //user authentication is activated
                    echo "401";
                     // $code = random_int(100000, 999999);
                    // $this->TwoFactorAuthentication($code);
                    exit;
                }elseif($row["status"] == "4" AND $row["role"] == "user"){
                    //an error exists
                    echo "404";
                    exit;
                }elseif($row["role"] == "admin"){
                    echo "admin";
                    exit;
                }else{
                    //an error exists
                    echo "404";
                    exit;
                }
            }
        }else{
            echo "404";
            exit;
        }

    }

    public function retrieveProfile(){
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        $userid = mysqli_real_escape_string($this->connect(), $userid);

        $sql = "SELECT * FROM profile WHERE userid='$userid' AND email='$email' ";
        $queries = $this->connect()->query($sql);
        $numRows = $queries->num_rows;
        if($numRows > 0){
            while($row = $queries->fetch_assoc()){
                $user[] = $row;
                $data = json_encode($user, true);
                echo $data;
            }
        }else{

            echo "400";
            exit;
        }

    }


    public function retrieveProfilePics(){
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        $userid = mysqli_real_escape_string($this->connect(), $userid);
        $email = mysqli_real_escape_string($this->connect(), $email);

        $sql = "SELECT * FROM profile WHERE userid='$userid' AND email='$email' ";
        $queries = $this->connect()->query($sql);
        $numRows = $queries->num_rows;
        if($numRows > 0){
            while($row = $queries->fetch_assoc()){
                $user = $row["image"];
            }
        }else{

            $user = "";
        }

        echo $user;
    }

    public function updateProfile($firstname, $lastname, $phone, $address, $state){
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->phone = $phone;
        $this->address = $address;
        $this->state = $state;
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        $firstname = mysqli_escape_string($this->connect(), $firstname);
        $lastname = mysqli_escape_string($this->connect(), $lastname);
        $phone = mysqli_escape_string($this->connect(), $phone);
        $address = mysqli_escape_string($this->connect(), $address);
        $state = mysqli_escape_string($this->connect(), $state);

        $sql = "UPDATE profile SET firstname='$firstname', lastname='$lastname', phone='$phone', address='$address', state='$state' WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        if($query){
            $sql2 = "UPDATE register SET status='2', date = NOW() WHERE userid = '$userid' AND email = '$email' ";
            $query2 = $this->connect()->query($sql2);
            if($query){
                echo "200";
            }else{
                echo "401";
            }
        }else{
            echo "501";
        }
    }

    public function UpdatePassword($new, $confirm){
        $this->new = $new;
        $this->confirm = $confirm;
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        // $pass = md5($new);
        $email_address = strtolower($email);

        $new = mysqli_escape_string($this->connect(), $new);
        $confirm = mysqli_escape_string($this->connect(), $confirm);


         //Check password Matches
         if($new != $confirm){
            echo "<script>alert('Password does not match'); window.location .href= '../$/settings.php';</script>";
            die();
        }

        $sql_select = "SELECT * FROM register WHERE email='$email_address' AND userid='$userid' ";
        $query_select = $this->connect()->query($sql_select);
        $numRows = $query_select->num_rows;
        if($numRows > 0){
            $sql_update = "UPDATE register SET password='$confirm' WHERE userid='$userid' AND email='$email_address' ";
            $query_update = $this->connect()->query($sql_update);
            if($query_update){
                echo "<script>alert('Password Changed Successfully'); window.location .href= '../login.html';</script>";
                session_destroy();
                die();
            }else{
                echo "<script>alert('Unable to update password'); history.back(); </script>";
            die();
            }
        }else{
            echo "<script>alert('An unknown error occurred. Contact Support'); history.back(); </script>";
            die();
        }
    }

    public function VerifyEmail($email){
        $this->email = $email;

        //Check email if already registered
        $sql = "SELECT * FROM register WHERE  email='$email' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            //    echo $email;
            $sql = "UPDATE register SET status = '1' WHERE email='$email' ";
            $query = $this->connect()->query($sql);
            if($query){
                echo "<script>alert('Verification Completed'); window.location='index.html'; </script>";
                die();

            }else {
                echo "<script>alert('try again'); window.location='index.html'; </script>";
                die();
            }
        }else{

            echo "<script> alert('The email address does not exist');  history.back(); </script>";
            die();
        }


        
    }

    public function ResetPasswordLink($email){
        $this->email = $email;

        $email = mysqli_escape_string($this->connect(), $email);

        $sql = "SELECT * register WHERE email = '$email' ";
        $query = $this->connect()->query($sql);
        $num  = $query->num_rows;
        if($num  > 0){
            $this->SendResetLink($email);
            echo "<script>alert('Follow the instruction on your email to reset password'); </script>";

        }else {
            echo "<script>alert('Email does not exist'); history.back();</script>";
            die();
        }




    }

    public function ResetPassword($new, $confirm, $email){
        $this->new = $new;
        $this->email = $email;
        $this->confirm = $confirm;

        // $pass = md5($new);
        $email_address = strtolower($email);

        $new = mysqli_escape_string($this->connect(), $new);
        $confirm = mysqli_escape_string($this->connect(), $confirm);


         //Check password Matches
         if($new != $confirm){
            echo "<script>alert('Password does not match'); window.location .href= '../$/settings.php';</script>";
            die();
        }

        $sql_select = "SELECT * FROM register WHERE email='$email_address' ";
        $query_select = $this->connect()->query($sql_select);
        $numRows = $query_select->num_rows;
        if($numRows > 0){
            $sql_update = "UPDATE register SET password='$confirm' WHERE email='$email_address' ";
            $query_update = $this->connect()->query($sql_update);
            if($query_update){
                echo "<script>alert('Password Changed Successfully'); window.location .href= '../login.html';</script>";
                session_destroy();
                die();
            }else{
                echo "<script>alert('Unable to update password'); history.back();</script>";
            die();
            }
        }else{
            echo "<script>alert('Email does not exist. Contact Support'); history.back();</script>";
            die();
        }
    }

    public function TwoFactorAuthentication($code){
        $this->code = $code;
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        $code = mysqli_escape_string($this->connect(), $code);
        $userid = mysqli_escape_string($this->connect(), $userid);
        $email = mysqli_escape_string($this->connect(), $email);

        $sql = "UPDATE register SET code = '$code' WHERE userid = '$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        if($query){
            $this->AuthenticationCode($email, $code);
            echo "<script>alert('An authentication code has been sent to your email'); </script>";

        }else {
            echo "<script>alert('An error occurred try again'); history.back();</script>";
            die();
        }




    }

    public function ConfirmCode($code){
        $this->code = $code;
        $email = $_SESSION["email"];
        $userid = $_SESSION["userid"];

        $code = mysqli_escape_string($this->connect(), $code);
        $email = mysqli_escape_string($this->connect(), $email);
        $userid = mysqli_escape_string($this->connect(), $userid);

        $email_address = strtolower($email);
        // $pass = md5($password);

        $sql = "SELECT * FROM register WHERE code='$code' AND email='$email' AND userid='$userid' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($row = mysqli_fetch_assoc($query)){

                echo "<script>window.location='../$/index.php'; </script>";
            }
        }else{
            echo "<script>alert('Incorrect code'); history.back(); </script>";
            die();

        }

    }

    public function TwoFaStatus(){
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        $sql = "SELECT * FROM register WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($row = $query->fetch_assoc()){
                $user[] = $row;
            }
        }else{
            $user[] = "";
        }
        return $user;
    }

    public function Enable2FA(){
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        $sql = "UPDATE register SET status = '2' WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        if($query){
            $sqll = "UPDATE profile SET status = '2' WHERE userid='$userid' AND email='$email' ";
            $queryy = $this->connect()->query($sqll);
            if($queryy){
                echo "<script>alert('Activated'); history.back(); </script>";
                die();
            }
         
        }else {
            echo "<script>alert('try again'); history.back(); </script>";
            die();
        }
    }

    public function Disable2FA(){
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        $sql = "UPDATE register SET status = '3' WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        if($query){
            $sqll = "UPDATE profile SET status = '1' WHERE userid='$userid' AND email='$email' ";
            $queryy = $this->connect()->query($sqll);
            if($queryy){
                echo "<script>alert('Disabled'); history.back(); </script>";
                die();
            }
        }else {
            echo "<script>alert('try again'); history.back(); </script>";
            die();
        }
    }


   

    
}

