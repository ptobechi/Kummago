$("#submit_cart").submit(function (event) {
    event.preventDefault();

    let delivery_schedule = $('input[name="delivery_schedule"]:checked').val();
    setCookie("delivery_schedule", delivery_schedule, 1);

    if (delivery_schedule == undefined) {
        $("#delivery_option")[0].scrollIntoView({
            behavior: "smooth"
        });
        $("#deliveryOptionsError").html("<span class='text-danger text-bold bg-warning p-3'>Please select a delivery option</span>");
        return;
    }

    if (delivery_schedule == "Daily") {
        let delivery_time = $('input[name="delivery_time"]:checked').val();
        let delivery_day = $("#dateContainer").val();

        if ((delivery_day || delivery_time) == (undefined || "undefined")) {
            $("#delivery_option")[0].scrollIntoView({
                behavior: "smooth"
            });
            $("#deliveryOptionsError").html("<span class='text-danger text-bold bg-warning p-3'>Please select a delivery option</span>");
            return;
        }

        setCookie("delivery_day", delivery_day, 1);
        setCookie("delivery_time", delivery_time, 1);

    } else {
        delivery_time = $("#dayContainer").val();
        if (delivery_time !== "today") {
            let delivery_day = $("#dayContainer").val();
            setCookie("delivery_day", delivery_day, 1);
        }
        setCookie("delivery_day", "today", 1);
        setCookie("delivery_time", "today", 1);
    }

    window.location.href = "checkout.html";

});

$("#confirm_checkout").submit(function (event) {
    event.preventDefault();

    let delivery_address = $('input[name="delivery_address"]:checked').val();
    if (delivery_address == "default") {
        var email = $("#default_email").val();
        var phone = $("#default_phone").val();
        var address = $("#default_address").val();
        var state = $("#default_state").val();

    } else if (delivery_address == "new-address") {
        let street = $("#street_address").val();
        let unit = $("#apartments").val();
        let town = $("#town").val();

        var email = $("#email_address").val();
        var phone = $("#phone_number").val();
        var address = `No: ${unit}, ${street}, ${town}`;
        var state = $("#state").val();

    } else {
        alert("Select Delivery Address");
        return;
    }

    let meal_plan = getCookie("meal_plan");
    let delivery_day = getCookie("delivery_day");
    let delivery_schedule = getCookie("delivery_schedule");
    let delivery_time = getCookie("delivery_time");

    let product = document.querySelectorAll("#product_name");
    let quantity = document.querySelectorAll("#product_qty");
    let price = document.querySelectorAll("#product_price");
    let total_price = $("#total_sum").val();
    let orders = [];

    for (let i = 0; i < product.length; i++) {
        orders.push({ "product": product[i].value, "price": price[i].value, "qty": quantity[i].value });
    }


    let data = {
        email: email,
        phone: phone,
        address: address,
        state: state,
        meal_plan: meal_plan,
        delivery_day: delivery_day, // delivery date
        delivery_schedule: delivery_schedule,
        delivery_time: delivery_time,
        total_price: total_price,
        basket: orders,
        action: "create_order"
    };

    // disabled the submit button
    $("#check_out_btn").prop("disabled", true);

    $.ajax({
        url: "server/controller/checkout.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            console.log(data)
            if (data == 201) {
                alert("Created");
                localStorage.removeItem("productsInCart");
                localStorage.removeItem("totalCost");
                localStorage.removeItem("totalCost");
                localStorage.removeItem("totalCart")

                $("#check_out_btn").prop("disabled", false);
                // location.reload();
            } else {
                alert("Failed");
                $("#check_out_btn").prop("disabled", false);
                // location.reload();

            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#check_out_btn").prop("disabled", false);
        }
    });

});

(function getDefaultAddress() {
    let data = {
        action: "getAddress"
    };
    $.ajax({
        url: "server/controller/checkout.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            console.log(data)
            if (data == 404) {
                $("#default_address_div").html(`<a href="login.html" onclick='getLastLocation()'>Login to continue</a>`);

                $("#check_out_btn").prop("disabled", false);
                // location.reload();
            } else {
                $("#default_address_div").html(data);
            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#check_out_btn").prop("disabled", false);
        }
    });

})();

function getLastLocation() {
    setCookie("href", window.location.href, 1);
}

function displayFinalResult() {
    let cartItems = localStorage.getItem("productsInCart");
    let sum = localStorage.getItem("totalCost")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById("local_products");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <tr>
                    <input type='hidden' value='${item.name}'   name='product_name[]'   id='product_name' />
                    <input type='hidden' value='${item.price}'  name='product_price[]' id='product_price' />
                    <input type='hidden' value='${item.inCart}' name='product_qty[]'  id='product_qty' />
                    <td><a href="">${item.name}</a></td>
                    <td> &#8358; ${item.price * item.inCart}</td>
                </tr>
            `
        });

        document.getElementById("total_cost").textContent = sum;
        document.getElementById("total_sum").value = sum;
    }

}

displayFinalResult();

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

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // alert("cookie set")
}