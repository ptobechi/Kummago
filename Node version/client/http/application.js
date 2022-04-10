$("#register_users").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let firstname = document.getElementById("first_name").value;
    let lastname = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;

    if(password != confirm_password){
        alert("Password not matched")
        return
    }

    let data = {
        firstname:firstname,
        lastname:lastname,
        email : email,
        password : password,
    }

    let request = {
        "url": `/api/signup`,
        "method": "POST",
        "data": data,
        dataType: 'json'
    }

    $.ajax(request).done(function(response){
        alert("Registration Successful")
        return window.location.href = "/login"
        
        // console.log(response.message)

    })

    // $.ajax(request).fail(function(response){
    //     alert("Registration Failed")
    //     console.log(response.responseText)

    // })
    

});

$("#signin").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = {
        email : email,
        password : password,
    }

    let request = {
        "url": "/api/signin",
        "method": "POST",
        "data": data,
        dataType: 'json'
    }

    $.ajax(request).done(function(response){
        return window.location.href = "/user"
        // console.log(response)

    })

    $.ajax(request).fail(function(response){
        alert("Login Failed")
        console.log(response.responseText)

    })
    // robdavid@gmail.com
});