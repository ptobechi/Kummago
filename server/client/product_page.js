function getAllMeals () {
    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: { action: "getProducts" },
        success: function (data) {
            const label_div = document.getElementById("all_categories");
            label_div.innerHTML += data;
        },

        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

}

function getAllBreakFast() {
    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: { action: "homeBreakfast" },
        success: function (data) {
            let breakfast_Div = document.getElementById("breakfast_Div");
            breakfast_Div.innerHTML += data;
        },

        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });
    
}

getAllBreakFast();
