// alert("we re ahe")
(function(){
    $.ajax({
        url: "../server/controller/box.php",
        method: "POST",
        data:{action:"getBox"},
        success: function (data) {
            
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });
})();

