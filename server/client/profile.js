(function(){
    $.ajax({
        url: "../server/controller/user.php",
        method: "POST",
        data:{action:"getProfile"},
        success: function (data) {
            // const tr_div = document.getElementById("OREDR");
            // tr_div.innerHTML += data;
            // let new_array = data.map(function(e) {
            //     return e.data;
            // });
            
            // console.log(new_array)
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

    
})();
