// alert("lal")
(function(){
    $.ajax({
        url: "../server/controller/order.php",
        method: "POST",
        data:{action:"getOrder"},
        success: function (data) {
            const tr_div = document.getElementById("OREDR");
            tr_div.innerHTML += data;
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

    
})();


$("#order_form").submit(function(event){
    event.preventDefault();

    let order = event.originalEvent.submitter.id;
    if(order == "place-order"){
        orderStatus = 1;
        //set status for pending is zero (1)
    }else{
        orderStatus = 0;
        //set status for save draft is zero (0)
    }

    //initialize form variables
    let box_name = document.getElementById("box_name").value;
    let box_description = document.getElementById("box_description").value;
    let total_price = document.getElementById("total_price").value;
    let delivery_date = document.getElementById("delivery_date").value;
    let items = document.querySelectorAll(".box_items");
    let prices = document.querySelectorAll(".box_items_price");
    let box_item = [];
    
    for(let i=0; i<items.length; i++){
        box_item.push({"item":items[i].value, "price":prices[i].value});        
    }

    let data = {
        total_price : total_price,
        delivery_date: delivery_date,
        orderStatus: orderStatus,
        basket : {
            box_name: box_name,
            desc: box_description,
            items: box_item
        },
        action: "place_order"
    };      

     // disabled the submit button
    $("#place-order").prop("disabled", true);
    $("#save_to_draft").prop("disabled", true);

    $.ajax({
        url: "../server/controller/order.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            if(data == 201){
                alert("Your order has been received");
                $("#place-order").prop("disabled", false);
                $("#save_to_draft").prop("disabled", false);
            }else{
                alert(data);
                $("#place-order").prop("disabled", false);
                $("#save_to_draft").prop("disabled", false);
            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
            $("#save_to_draft").prop("disabled", false);
        }
    });
    

});



