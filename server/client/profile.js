(function(){
    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        data:{action:"getProfile"},
        success: function (data) {
            const profile_div = document.getElementById("kt_account_profile_details");
            profile_div.innerHTML += data;
            // let new_array = data.map(function(e) {
            //     return e.data;
            // });
            
            // console.log(data)
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        data:{action:"getProfilePics"},
        success: function (data) {
            if(data != ""){
                let x = document.querySelectorAll("#profile_pic").length;
                for(let i =0; i<x; i++){
                    document.querySelectorAll("#profile_pic")[i].src = '../server/avatars/'+data+'';
                }
                document.getElementById("profile_img").style.backgroundImage  = 'url(../server/avatars/'+data+')';

            }else{
                let x = document.querySelectorAll("#profile_pic").length;
                for(let i =0; i<x; i++){
                    document.querySelectorAll("#profile_pic")[i].src = 'assets/media/avatars/default.png';
                }
                document.getElementById("profile_img").style.backgroundImage  = 'url(assets/media/avatars/default.png)';
            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

    
})();


$("#submit_form").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let firstname = document.getElementById("first_name").value;
    let lastname = document.getElementById("last_name").value;
    let phonenumber = document.getElementById("phone_number").value;
    let address = document.getElementById("home_address").value;
    let state = document.getElementById("state").value;
    
    let data = {
        firstname : firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        address: address,
        state: state,
        action: "update_profile"
    };  
    // console.log(data)    

     // disabled the submit button
    $("#kt_account_profile_details_submit").prop("disabled", true);

    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            if(data == 200){
                alert("Profile Updated");
                $("#kt_account_profile_details_submit").prop("disabled", false);
            }else{
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
        // console.log(form_data.append('file', file_data));
        // console.log(form_data.getAll("avatar"))
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
