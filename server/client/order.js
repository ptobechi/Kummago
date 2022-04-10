
$("#order_form").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let box_name = document.getElementById("box_name").value;
    let box_description = document.getElementById("box_description").value;
    let total_price = document.getElementById("total_price").value;
    let items = document.querySelectorAll(".box_items");
    let prices = document.querySelectorAll(".box_items_price");
    let box_item = [];
    
    for(let i=0; i<items.length; i++){
        box_item.push({"item":items[i].value, "price":prices[i].value});        
    }

    let data = {
        box_name: box_name,
        box_description: box_description,
        total_price : total_price,
        box_item : box_item,
        action: "place_order"
    };      

     // disabled the submit button
    $("#place-order").prop("disabled", true);

    $.ajax({
        url: "../server/controller/box.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            // $("#output").text(data);
            // console.log("SUCCESS : ", data);
            if(data == 201){
                alert("upload done");
                $("#place-order").prop("disabled", false);
            }else{
                alert("upload Failed");
                $("#place-order").prop("disabled", false);
            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });
    

});
