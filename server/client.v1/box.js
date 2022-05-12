$("#kt_modal_offer_a_deal_form").submit(function(event){
    event.preventDefault();

    //initialize form variables
    let box_name = document.getElementById("box_name").value;
    let box_description = document.getElementById("box_description").value;
    let total_price = document.getElementById("total_price").value;
    let items = document.querySelectorAll(".box_items");
    let prices = document.querySelectorAll(".box_items_price");
    let quantity = document.querySelectorAll(".box_items_qty");
    let box_item = [];
    
    if(box_name == "" || box_description == "" ){
        document.getElementById("empty_form_error").innerHTML = "<span class='alert alert-warning' role='alert'>Do ensure to enter all available field</span>";
        document.getElementById("empty_form_error").scrollIntoView();
        return
    }

    for(let i=0; i<items.length; i++){
        box_item.push({"item":items[i].value, "price":prices[i].value, "qty":quantity[i].value});        
    }

    // console.log(box_item)

    let data = {
        total_price : total_price,
        desc: box_description,
        box_name: box_name,
        items : box_item,
        action: "create_box"
    };      

     // disabled the submit button
    $("#kt_ecommerce_edit_order_submit").prop("disabled", true);

    $.ajax({
        url: "../server/controller/box.php",
        method: "POST",
        enctype: 'multipart/form-data',
        data: data,
        success: function (data) {
            if(data == 201){
                alert("Created");
                localStorage.removeItem("productsInCart");
                localStorage.removeItem("totalCost");
                $("#kt_ecommerce_edit_order_submit").prop("disabled", false);
                location.reload();
            }else{
                alert("Failed");
                $("#kt_ecommerce_edit_order_submit").prop("disabled", false);
                location.reload();

            }
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#kt_ecommerce_edit_order_submit").prop("disabled", false);
        }
    });
    

});
