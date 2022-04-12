<?php
require "../config/connection.php";

class User extends Database{

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
        $sql = "SELECT email FROM register WHERE email='$email_address'";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            echo "emailExists";
            exit;
        }

        //INSERT INTO TABLE
        $sql3 = "INSERT INTO register SET userid='$userid', email='$email_address', password='$password', status='0', date=NOW() ";
        $query3 = $this->connect()->query($sql3);
        if($query3){ 
            $sql4 = "INSERT INTO profile SET userid='$userid', firstname='$firstname', lastname='$lastname', email='$email_address'";
            $query4 = $this->connect()->query($sql4);

            // $this->WelcomeMessage($email, $fname);
            
            echo "201";
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

                if($row["status"] == "2"){
                    // $code = random_int(100000, 999999);

                    // $this->TwoFactorAuthentication($code);

                    echo "101";

                }elseif($row["status"] == "4"){
                    echo "401";
                    exit;
                }elseif($row["status"] == "x"){
                    // $this->WelcomeMessage($email, $fname);
                    echo "404";
                    exit;
                }

                echo "200";
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
            }
        }else{

            $user[] = "";
        }
        echo json_encode($user, true);
    }

    public function UpdateProfile($fname, $phone, $address, $postal, $country, $wallet){
        $this->fname = $fname;
        $this->phone = $phone;
        $this->address = $address;
        $this->postal = $postal;
        $this->country = $country;
        $this->wallet = $wallet;
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        $fname = mysqli_escape_string($this->connect(), $fname);
        $phone = mysqli_escape_string($this->connect(), $phone);
        $address = mysqli_escape_string($this->connect(), $address);
        $postal = mysqli_escape_string($this->connect(), $postal);
        $country = mysqli_escape_string($this->connect(), $country);
        $wallet = mysqli_escape_string($this->connect(), $wallet);

        $sql = "UPDATE profile SET name='$fname', phone='$phone', address='$address', wallet='$wallet', postal='$postal', country='$country', status='1', date=NOW() WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        if($query){
            echo "<script>alert('Your profile has been updated successfully'); history.back(); </script>";
        }else{
            echo "<script>alert('Unable to update profile at the moment check network connection and try again later'); history.back(); </script>";
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

    public function GetPaymentAddress($name, $amount, $investmentid){
        $this->name = $name;
        $this->amount = $amount;
        $this->investmentid = $investmentid;

        $sql = "SELECT * FROM wallet_address WHERE currency='$name' ORDER BY RAND() LIMIT 1";
        $query = $this->connect()->query($sql);
        $num = $query->num_rows;
        if($num > 0){
            while($row = $query->fetch_assoc()){
                $address = $row['address'];

                $send = "UPDATE portfolio SET wallet_address='$address' WHERE crypto_id='{$investmentid}' ";
                $a = $this->connect()->query($send);
                if($a){
                    echo "<script type='text/javascript'>
                        alert('Proceed to completing your deposit');
                        window.location='../$/make_payment.php?crypto=$name&&deposit=$address&&iqw=$amount&&qrcode=$row[img]&&id=$investmentid' ;
                    </script>";   
                    die();          
                }else{
                    echo "<script>alert('Unable to complete deposit at the moment check your network connection and try again later');
                        history.back(); 
                    </script> ";
                    die();
                }
                 
            }
        }else{
            echo "<script>alert('Selected crypto address is not available at the moment try again later');
                    history.back(); 
                </script> ";
            die();
        }

    }

    public function auth(){
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];

        //Check if account is logged in
        $sql = "SELECT * FROM profile WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        $Logged_user = $query->num_rows;
        if($Logged_user > 0){
            $select = "SELECT * FROM portfolio WHERE userid='$userid' AND status=2 ";
            $send = $this->connect()->query($select);
            $numRows = $send->num_rows;
            if($numRows > 0){
                while($row = $send->fetch_assoc()){
                    $bal = $row["profit"];
                    $amount = $row['amount'];
                    $id = $row["crypto_id"];
                    $invested_date = $row["date"];

                    $today = time();
                    $before = strtotime($invested_date);
                    $date = abs($today - $before);
                    $day = floor($date/86400);

                    //Check Investment Period 
                    if($amount > "99" && $amount < "5000"){
                        if($day < 6){
                            $profit = (((4.5/100) * $amount) * $day) + $amount;
                        }else{
                            $profit = (((4.5/100) * $amount) * 5) + $amount;
                        }
                        
                        $insert = "UPDATE portfolio SET profit='$profit' WHERE crypto_id='$id' AND status=2";
                        $update_query = $this->connect()->query($insert);

                    }elseif($amount > "4999" && $amount < "20000"){
                        if($day < 6){
                            $profit = (((5.5/100) * $amount) * $day) + $amount;
                        }else{
                            $profit = (((5.5/100) * $amount) * 5) + $amount;
                        }
                        $insert = "UPDATE portfolio SET profit='$profit'  WHERE crypto_id='$id' AND status=2";
                        $update_query = $this->connect()->query($insert);
                    }
                    elseif($amount > "19999" ){
                        if($day < 6){
                            $profit = (((6.5/100) * $amount) * $day) + $amount;
                        }else{
                            $profit = (((6.5/100) * $amount) * 5) + $amount;
                        }
                        $insert = "UPDATE portfolio SET profit='$profit'  WHERE crypto_id='$id' AND status=2";
                        $update_query = $this->connect()->query($insert);
                    }

                }
            }

            foreach($this->RetrieveProfile() as $user){
                $users[] = $user;
            }
        }else{
            echo "<script>alert('Login required'); window.location='../login.html'; </script>";
            die();
        }

        
        return $users;
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

    public function DepositCurrency($name, $amount, $crypto_amount, $plan){
        $this->name = $name;
        $this->amount = $amount;
        $this->plan = $plan;
        $this->crypto_amount = $crypto_amount;
        $userid = $_SESSION["userid"];
        $email = $_SESSION["email"];
        $table = "portfolio";
        $investmentid = $this->IdGenerator($table);
        $bonus = $this->IdGenerator($table="bonus");
        $ref_bonus = (10/100) * $amount;

        $this->CreateDataTables();

        $name = mysqli_escape_string($this->connect(), $name);
        $amount = mysqli_escape_string($this->connect(), $amount);
        $crypto_amount = mysqli_escape_string($this->connect(), $crypto_amount);
        $plan = mysqli_escape_string($this->connect(), $plan);

        $sql = "SELECT name, referral_code FROM profile WHERE userid='$userid' AND email='$email' ";
        $query = $this->connect()->query($sql);
        $numRows = $query->num_rows;
        if($numRows > 0){
            while($row = mysqli_fetch_assoc($query)){
                $fname = $row["name"];
                $fetch_sql = "INSERT INTO portfolio SET userid='$userid', crypto_id='$investmentid', crypto_name='$name', plan='$plan', email='$email', name='$row[name]', amount='$amount', profit='$amount', crypto_amount='$crypto_amount', status='1', date=NOW() ";
                $send_query = $this->connect()->query($fetch_sql);
                if($send_query){
                    $this->AdminDepositAlert($email, $crypto_name, $crypto_amount);
                    $sql = "INSERT INTO bonus SET userid='$row[referral_code]', bonusid='$bonus', bonus='Referral Bonus', investmentid='$investmentid', investor='$row[name]', amount='$ref_bonus', action='Bonus', status='0', date=NOW(), investment_date=NOW() ";
                    $send_query2 = $this->connect()->query($sql);
                    if($send_query2){
                        $this->GetPaymentAddress($name, $amount, $investmentid);
                    }else{
                        $this->GetPaymentAddress($name, $amount, $investmentid);
                    }
                }else{
                    echo "<script>alert('Unable to complete deposit at the moment check your network connection and try again later');
                        history.back(); 
                    </script> ";
                    die();
                }
            }
        }else{
            echo "<script>alert('Unable to complete deposit at the moment check your networ connection and try again later');
                history.back(); 
            </script> ";
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

