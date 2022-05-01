<?php
require "../config/connection.php";

class Messages extends Database{

    private $email;
    private $name;
    public function sendEmailVerification($email, $name){
        $email = $this->email;
        $name = $this->name;
        $msg_body = `
            <!DOCTYPE html> z
            <html lang="en">
                <head>
                    <link rel="shortcut icon" href="assets/media/logos/favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
                    <link href="assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
                    <link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
                </head>
                <body id="kt_body" class="auth-bg">
                    <div class="d-flex flex-column flex-root">
                        <div class="d-flex flex-column flex-column-fluid">
                            <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
                                <a href="" class="mb-0 pt-lg-10">
                                    <img alt="Logo" src="https://images.squarespace-cdn.com/content/v1/62318897f75ed7458e1a2c40/9ab81ec0-bc4f-4ef0-80ab-f64e48304174/IMG_5607.jpg?format=1500w" class="h-200px mb-0" />
                                <div class="pt-lg-0 mb-10">
                                    <h1 class="fw-bolder fs-2qx text-gray-800 mb-5">Welcome to KumagoFoods</h1>
                                    <div class="fw-bold fs-3 text-muted mb-15">The home of healtthy living</div>
                                    <div class="text-center">
                                        <a href="https://kumagofoods.store/auth/verify_email.php" class="btn btn-lg btn-primary fw-bolder">Verify Email Address</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <script>var hostUrl = "assets/";</script>
                    <script src="assets/plugins/global/plugins.bundle.js"></script>
                    <script src="assets/js/scripts.bundle.js"></script>
                </body>
            </html>
        `;
        $this->configMsg($email, $name, $msg_subject="Email Verification", $msg_body);

        // echo "22";
    }
    

    public function welcomeMessage($email, $name){

    }

    public function placeOrder($email, $name){

    }

    public function orderDelivery($email, $name){

    }

    public function rllesetPasswordLink($email, $name){

    }

    public function draftReminder($email, $name){

    }
}