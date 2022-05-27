(function () {
    $.ajax({
        url: "server/controller/user.php",
        method: "POST",
        data: { action: "getProfile" },
        success: function (data) {
            datas = JSON.parse(data);
            $("#firstname").val(datas[0]["firstname"]);
            $("#lastname").val(datas[0]["lastname"]);
            $("#email_address").val(datas[0]["email"]);
            $("#welcome_name").text(datas[0]["firstname"]);
            $("#not_welcome_name").text(datas[0]["firstname"]);
            $("#default_delivery_address").html(datas[0]["firstname"]+" "+datas[0]["lastname"]+"<br/>"+datas[0]["address"]+"<br/>"+datas[0]["phone"]+"<br/>"+datas[0]["email"] );
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
        }
    });

    $.ajax({
        url: "server/controller/order.php",
        method: "POST",
        data: { action: "getOrders" },
        success: function (data) {
            datas = JSON.parse(data);
            $("#firstname").val(datas[0]["firstname"]);
            $("#lastname").val(datas[0]["lastname"]);
            $("#default_delivery_address").html(datas[0]["firstname"]+" "+datas[0]["lastname"]+"<br/>"+datas[0]["address"]+"<br/>"+datas[0]["phone"]+"<br/>"+datas[0]["email"] );
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
        }
    });
})();


$("#submit_form").submit(function (event) {
    event.preventDefault();

    //initialize form variables
    let firstname = document.getElementById("first_name").value;
    let lastname = document.getElementById("last_name").value;
    let phonenumber = document.getElementById("phone_number").value;
    let address = document.getElementById("home_address").value;
    let state = document.getElementById("state").value;

    let data = {
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        address: address,
        state: state,
        action: "update_profile"
    };

    // disabled the submit button
    $("#kt_account_profile_details_submit").prop("disabled", true);

    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            if (data == 200) {
                alert("Profile Updated");
                window.location.href = "user/";
                $("#kt_account_profile_details_submit").prop("disabled", false);
            } else {
                alert("Profile Update Failed");
                $("#kt_account_profile_details_submit").prop("disabled", false);
            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#kt_account_profile_details_submit").prop("disabled", false);
        }
    });


});

$(document).ready(function () {
    $('#avater_holder').change(function () {
        // alert("Okay")
        var file_data = $('#avater_holder').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        $.ajax({
            url: '../server/controller/user.php', // point to server-side controller method
            method: 'POST',
            enctype: 'multipart/form-data',
            processData: false,
            cache: false,
            contentType: false,
            data: form_data,
            success: function (response) {
                // if(response == "201"){
                window.location.href = "user/";
                // }
            },
            error: function (response) {
                $('#msg').html(response); // display error response from the server
            }
        });
    });
});
