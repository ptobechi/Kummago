(function () {
    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: { action: "getProducts" },
        success: function (data) {
            // console.log(data);
            const label_div = document.getElementById("all_categories");
            label_div.innerHTML += data;
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

})();

