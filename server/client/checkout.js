$("#submit_cart").submit(function (event) {
    event.preventDefault();

    let meal_plan = getCookie("meal_plan");
    let delivery_schedule = $('input[name="delivery_schedule"]:checked').val();
    let delivery_day = $("#dateContainer").val();
    let total_price = $("#total_price").text();

    let items = $("#box_items");
    let prices = $("#box_items_price");
    let quantity = $("#box_items_qty");
    let box_item = [];

    if (delivery_schedule == undefined) {
        $("#delivery_option")[0].scrollIntoView({
            behavior: "smooth"
        });
        $("#deliveryOptionsError").html("<span class='text-danger text-bold bg-warning p-3'>Please select a delivery option</span>");
        return;
    }

    if (delivery_schedule == "Daily") {
        let delivery_time = $('input[name="delivery_time"]:checked').val();
        if ((delivery_day || delivery_time) == (undefined || "undefined")) {
            $("#delivery_option")[0].scrollIntoView({
                behavior: "smooth"
            });
            $("#deliveryOptionsError").html("<span class='text-danger text-bold bg-warning p-3'>Please select a delivery option</span>");
            return;
        }
    } else {
        delivery_time = $("#dayContainer").val();
    }

    for (let i = 0; i < items.length; i++) {
        box_item.push({ "item": items[i].value, "price": prices[i].value, "qty": quantity[i].value });
    }

    let data = {
        meal_plan: meal_plan,
        delivery_schedule: delivery_schedule,
        delivery_time: delivery_time,
        delivery_day: delivery_day, // delivery date
        total_price: total_price,
        items: box_item,
        action: "create_box"
    };

    // disabled the submit button
    $("#check_out_btn").prop("disabled", true);

    $.ajax({
        url: "server/controller/checkout.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            // console.log(data)
            if (data == 201) {
                alert("Created");
                // localStorage.removeItem("productsInCart");
                // localStorage.removeItem("totalCost");
                // localStorage.removeItem("totalCost");
                // localStorage.removeItem("totalCart")

                $("#check_out_btn").prop("disabled", false);
                location.reload();
            } else {
                alert("Failed");
                $("#check_out_btn").prop("disabled", false);
                location.reload();

            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#check_out_btn").prop("disabled", false);
        }
    });

    // window.location.href = "fill_box.html"
});

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