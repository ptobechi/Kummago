
$("#sign_up_form").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;

    let data = {
        firstname: first_name,
        lastname: last_name,
        email : email,
        password : password,
        action: "register"
    }      

     // disabled the submit button
    $("#sign_up_submit").prop("disabled", true);

    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            // $("#output").text(data);
            // console.log("SUCCESS : ", data);
            // $("#sign_up_submit").prop("disabled", false);
            if(data == 201){
                window.location.href = "sign-in.html";
            }else{
                alert("Registration Failed");
            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#sign_up_submit").prop("disabled", false);

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

    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            console.log(data);
            if(data == "user"){
                window.location.href = "user/";
            }if(data == "admin"){
                window.location.href = "admin/";
            }else{
                // alert("Login Failed");
                $("#sign_in_submit").prop("disabled", false);
            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#sign_in_submit").prop("disabled", false);

        }
    });
    

});