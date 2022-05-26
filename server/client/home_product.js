function getAllHomeMeals () {
    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: { action: "homeProducts" },
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

getAllHomeMeals();




