
$("#create_product").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let product = document.getElementById("product").value;
    let category = document.getElementById("category").value;

    let data = {
        product: product,
        category: category,
        action: "upload_product"
    }      

     // disabled the submit button
    $("#upload_product_btn").prop("disabled", true);

    $.ajax({
        url: "../server/controller/product.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            // $("#output").text(data);
            // console.log("SUCCESS : ", data);
            // $("#sign_up_submit").prop("disabled", false);
            if(data == 201){
                alert("Upload Done");
                $("#create_product")[0].reset()
                $("#upload_product_btn").prop("disabled", false);
            }else{
                alert("Upload Failed");
                console.log(data)
                $("#upload_product_btn").prop("disabled", false);
            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#upload_product_btn").prop("disabled", false);

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
                alert("Login Failed");
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