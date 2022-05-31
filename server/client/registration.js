$("#gettingStarted").submit(function (event) {
    event.preventDefault();

    let email = $("#email_address").val();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let phone = $("#phone_number").val();
    let password = $("#password").val();
    let confirm = $("#confirm").val();
    let unit = $("#apartment_unit").val();
    let street = $("#street").val();
    let location = $("#location").val();

    let data = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        unit: unit,
        street: street,
        location: location,
        password: password,
        confirm: confirm,
        action: "register"
    };

    $.ajax({
        url: "server/controller/user.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            

        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#login_btn").prop("disabled", false);
        }
    });
});