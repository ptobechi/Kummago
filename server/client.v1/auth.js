(function(){
    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        data:{action:"authUser"},
        success: function (data) {
            user = JSON.parse(data);
            if(user[0] == "200" || data != "404"){
                document.getElementById("session_name").textContent = user[2];
                document.getElementById("session_email").textContent = user[1];
            }else{
                window.location.href = "sign-in.html";
            }
            
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });
})()