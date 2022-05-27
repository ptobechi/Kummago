(function () {
    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: { action: "homeProducts" },
        success: function (data) {
            document.getElementById("home_menu").innerHTML = data;
        },

        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
        }
    });
})();

// getAllHomeMeals();




