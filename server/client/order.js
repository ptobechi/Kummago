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

(function(){
    let url = window.location.href;
    let explode = url.split("=");
    let id = explode[1]
    console.log(explode[1])
    $.ajax({
        url: "../server/controller/order.php",
        method: "POST",
        data:{action:"getDraftedOrderDetails", id:id},
        success: function (data) {
            // console.log(data);
            const tr_div = document.getElementById("todo_cart");
            cartItems = JSON.parse(data);
            console.log(cartItems["items"] )
    
            for(let i=0; i < Object.keys(cartItems["items"]).length; i++){
                console.log(cartItems["items"][i].item );
                tr_div.innerHTML += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center" data-kt-ecommerce-edit-order-filter="product" data-kt-ecommerce-edit-order-id="product_30">
                                <div class="ms-5">
                                    <a class="text-gray-800 text-hover-primary fs-5 fw-bolder">${cartItems["items"][i].item.toUpperCase()}</a>
                                    <input type='hidden' value='${cartItems["items"][i].item}' name='item[]' class='box_items' />
                                </div>
                            </div>
                        </td>
                        <td>
                            <icon class='fa fa-minus-circle' id='${cartItems["items"][i].item}' onclick="reduceinCart(this.id)"></icon>
                            <span class='fs-5'>${cartItems["items"][i].qty}</span>
                            <icon class='fa fa-plus-circle' id='${cartItems["items"][i].item}' onclick="increaseinCart(this.id)"></icon>
                        </td>
                        <td> 
                            &#8358;
                            <span class="item-price" data-kt-ecommerce-edit-order-filter="price">${cartItems["items"][i].price * cartItems["items"][i].qty}</span>
                            <input type='hidden' value='${cartItems["items"][i].price}' name='price[]' class='box_items_price' />
                            <input type='hidden' value='${cartItems["items"][i].qty}' name='quantity[]' class='box_items_qty' />
                        </td>
                        <td class="text-end pe-5" data-order="22"><icon class='fa fa-times-circle' id='${cartItems["items"][i].item}' onclick="removeProduct(this.id)"></icon></td>
                    </tr>
                
                `;
            }
            
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

    
})();


$("#kt_modal_offer_a_deal_form").submit(function(event){
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
    let quantity = document.querySelectorAll(".box_items_qty");
    let box_item = [];
    
    for(let i=0; i<items.length; i++){
        box_item.push({"item":items[i].value, "price":prices[i].value, "qty":quantity[i].value});        
    }

    // console.log(box_item)

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
                localStorage.removeItem("productsInCart");
                localStorage.removeItem("totalCost");
                $("#place-order").prop("disabled", false);
                $("#save_to_draft").prop("disabled", false);
                location.reload();
            }else{
                alert(data);
                $("#place-order").prop("disabled", false);
                $("#save_to_draft").prop("disabled", false);
                location.reload();

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



