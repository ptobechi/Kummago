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
            let datas = JSON.parse(data)
           
            if (datas["status"] == 201) {
                $("#check_out_btn").prop("disabled", false);
                makePayment(datas["email"], datas["amount"], datas["orderid"]); 
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

function makePayment(email, amount, reference){
    let handler = PaystackPop.setup({
        key: 'pk_test_c2fcaea95321cf23f0af2681d625c0351ce010a6', // Replace with your public key
        email: email,
        amount: amount * 100,
        ref: reference, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function(){
        alert('Window closed.');
        },
        callback: function(response){
            let message = 'Payment complete! Reference: ' + response.reference;
            alert(message);
            // console.log(response.status);
            if(response.status = "success"){
                updateSuccessfulOrder(reference)
            }
        }
    });
    handler.openIframe();
}

function updateSuccessfulOrder(reference){
    let data = {
        reference: reference,
        action: "update_order"
    };

    $.ajax({
        url: "server/controller/order.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            localStorage.removeItem("productsInCart");
            localStorage.removeItem("totalCost");
            localStorage.removeItem("totalCost");
            localStorage.removeItem("totalCart")
            window.location.href = "dashboard.html#tab-orders";
        },
        error: function (e) {
            $("#output").text(e.responseText);
            // console.log("ERROR : ", e);
            $("#check_out_btn").prop("disabled", false);
        }
    });
}

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
            // console.log(data)
            if (data == 404) {
                $("#loginForm").html(`
                    <div class="container ">
                        <div class="started__form form">
                            <div class="started__description font-weight-bold mb-2 mt-2" id="started__description">
                                Don't have an account
                                <a class='text-success' href="create_account.html">Sign Up</a></div>
                            <!-- Email -->
                            <div id="email-form-field"
                                class="form-field form-field-common form-field-text form-required">
                                <div class="user-box">
                                    <input type="email" name="" required="" id="email_address">
                                    <label>Email Address</label>
                                </div>
                                <div class="form-field__errors">
                                    <span id="emailMessage"></span>
                                </div>
                            </div>
                            <!-- Password -->
                            <div id="email-form-field"
                                class="form-field form-field-common form-field-text form-required mt-2">
                                <div class="row">
                                    <div class="user-box col-md-12">
                                        <input type="password" name="" required="" id="password">
                                        <label class="mx-3">Password</label>
                                    </div>
                                </div>

                                <div class="form-field__errors">
                                    <span id="emailMessage"></span>
                                </div>
                            </div>

                            <button type="submit" id="login_btn"
                                class="btn btn-primary rounded-pill text-center mb-2">
                                Login</button>
                        </div>
                    </div>`);

                $("#accordion-payment").css('display','none');
 
                $("#check_out_btn").prop("disabled", false);
                // location.reload();
            } else {
                $("#label_login").css('display','none');

                $("#default_address_div").html(data);
                $("#secondary_address").html(`<div class="card-header" id="heading-2">
                        <h2 class="card-title">
                            <input type="radio" name="delivery_address" value="new-address"
                                role="button" id="new_address" data-toggle="collapse"
                                href="#new-address" aria-expanded="true" aria-controls="new-address">

                            <label for="new_address"> Setup a new Address</label>
                        </h2>
                    </div><!-- End .card-header -->
                    <div id="new-address" class="collapse" aria-labelledby="heading-2"
                        data-parent="#accordion-payment">
                        <div class="card-body">
                            <h2 class="checkout-title">Delivery Details</h2>

                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Phone Number *</label>
                                    <input type="text" id="phone_number"
                                        class="form-control">
                                </div><!-- End .col-sm-6 -->

                                <div class="col-sm-6">
                                    <label>Email Address *</label>
                                    <input type="text" id="email_address"
                                        class="form-control">
                                </div><!-- End .col-sm-6 -->
                            </div><!-- End .row -->

                            <div class="row">
                                <div class="col-sm-6">
                                    <label>House/Appartments *</label>
                                    <input type="text" id="apartments" class="form-control"
                                        placeholder="House, Appartments, suite, unit etc ...">
                                </div><!-- End .col-sm-6 -->
                                <div class="col-sm-6">
                                    <label>Street address *</label>
                                    <input type="text" class="form-control"
                                        id="street_address"
                                        placeholder="House number and Street name">
                                </div><!-- End .col-sm-6 -->
                            </div><!-- End .row -->

                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Town / City *</label>
                                    <input type="text" id="town" class="form-control">
                                </div><!-- End .col-sm-6 -->

                                <div class="col-sm-6">
                                    <label>State / County *</label>
                                    <input type="text" id="state" class="form-control">
                                </div><!-- End .col-sm-6 -->
                            </div><!-- End .row -->
                        </div><!-- End .custom-checkbox -->
                    </div><!-- End .card-body -->`)
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