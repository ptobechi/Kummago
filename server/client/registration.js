function checkPassword(){
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;

    if(password !== confirm_password){
        document.getElementById("confirm_password_msg").innerHTML = "<span class='text-danger' >password does not match</span>";
    }else{
        document.getElementById("confirm_password_msg").innerHTML = "<span class='text-success' >Confirmed </span>";
    }
}

$("#sign_up_form").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(first_name == "" || last_name == "" || email == "" || password == ""){
        document.getElementById("empty_form_error").innerHTML = "<span class='alert alert-warning' role='alert'>Do ensure to enter all available field</span>";
        return
    }

    let data = {
        firstname: first_name,
        lastname: last_name,
        email : email,
        password : password,
        action: "register"
    }      

     // disabled the submit button
    $("#sign_up_submit").prop("disabled", true);
    $("#sign_up_submit").html('<i class="fa fa-circle-o-notch fa-spin"></i> loading...');

    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            console.log(data);
            if(data == 201){
                window.location.href = "sign-in.html";
            }else if(data == 302){
                document.getElementById("email").scrollIntoView();
                document.getElementById("email_msg").textContent = "Email address already exists";
                $("#sign_up_submit").prop("disabled", false);
                $("#sign_up_submit").html('Submit');
                return
            }else{
                alert("Registration Failed");
                $("#sign_up_submit").prop("disabled", false);
                $("#sign_up_submit").html('Submit');
            }
        },
        error: function (e) {
            $("#sign_up_submit").prop("disabled", false);
            $("#sign_up_submit").html('Submit');
        }
    });
    

});

$("#sign_in_form").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = {
        email : email,
        password : password,
        action: "login"
    }      

     // disabled the submit button
    $("#sign_in_submit").prop("disabled", true);
    $("#sign_in_submit").val("Processing..");

    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {

            console.log(data);
            if(data == "admin"){
                window.location.href = "admin/";
            }else if(data == "403"){
                window.location.href = "auth.html/";
            }else if(data == "202"){
                window.location.href = "user/profile.html";
            }else if(data == "200"){
                window.location.href = "user/";
            }else if(data == "404"){
                alert("Email address or password does not exist");
            }
            $("#sign_in_submit").prop("disabled", false);

        },
        error: function (e) {
            alert("An unknown error occured. check your network connection and try again or contact support");
            console.log("ERROR : ", e);
            $("#sign_in_submit").prop("disabled", false);

        }
    });
    

});