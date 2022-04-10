// alert("we re ahe")
(function(){
    $.ajax({
        url: "../server/controller/box.php",
        method: "POST",
        data:{action:"getBox"},
        success: function (data) {
            const label = document.createElement("div");
            // label.addClass = "btn btn-outline btn-outline-dashed btn-outline-default d-flex text-start p-6";
            label.innerHTML = data;

            const label_div = document.getElementById("label_div");
            const before = document.getElementById("label");
            label_div.insertBefore(label, before);
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

    
})();

