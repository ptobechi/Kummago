$("#gettingStarted").submit(function (event) {
    event.preventDefault();

    let meal_plan = $('input[name="meal_quantity"]:checked').val();
    if (meal_plan == undefined) {
        $("#started__description")[0].scrollIntoView({
            behavior: "smooth"
        });
        $("#mealQuantityErr").html("<span class='text-danger text-bold bg-warning p-3'>Choose a plan</span>");
        exit;
    }
    let location = $("#location").val();
    let email_address = $("#email_address").val();
    // let delivery_date = $("#delivery_date").val();

    setCookie("email", email_address, 1);
    setCookie("location", location, 1);
    setCookie("meal_plan", meal_plan, 1);
    // setCookie("delivery_date", delivery_date, 1);

    window.location.href = "fill_box.html";

});

$("#loginForm").submit(function (event) {
    event.preventDefault();
    let email = $("#email_address").val();
    let password = $("#password").val();

    let data = {
        email: email,
        password: password,
        action: "login"
    };

    $.ajax({
        url: "server/controller/user.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            console.log(data)
            if (data == 200) {
                let location = getCookie("href");
                alert(location)
                if(location == ''){
                    window.location.href="dashboard.html"; 
                }else{
                    window.location.href = location;

                }
            } else {
                alert("Invalid login")
            }

        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#login_btn").prop("disabled", false);
        }
    });
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // alert("cookie set")
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}