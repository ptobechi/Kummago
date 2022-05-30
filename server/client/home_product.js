(function () {
    let data = {
        action: "homeProducts"
    };
    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: data,
        success: function (data) {
            console.log(data);
            document.getElementById("homeMenu").innerHTML = data;
            // $('#someID').html(data);
            // alert("okay")
        },

        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
        }
    });
})();

// getAllHomeMeals();




