// alert("we re ahe");
(function(){
    $.ajax({
        url: "../server/controller/box.php",
        method: "POST",
        data:{action:"getBox"},
        success: function (data) {
            const label_div = document.getElementById("label_div");
            label_div.innerHTML += data;
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

})();

(function(){
    $.ajax({
        url: "../server/controller/order.php",
        method: "POST",
        data:{action:"getDraftedOrder"},
        success: function (data) {
            const todo_list_body = document.getElementById("todo_list_body");
            todo_list_body.innerHTML += data;
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

    
})();

function box_details(boxid){
    document.getElementById("detail_div").innerHTML = "";
    $.ajax({
        url: "../server/controller/box.php",
        method: "POST",
        data:{action:"getBoxDetails", id:boxid},
        success: function (data) {
            console.log(data)
            const label_div = document.getElementById("detail_div");
            label_div.innerHTML += data;            
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });
}