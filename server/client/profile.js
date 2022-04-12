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

