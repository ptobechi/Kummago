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
            console.log(JSON.parse(data))
            cartItems = JSON.parse(data);
            const label_div = document.getElementById("detail_div");
            for(let i=0; i < Object.keys(cartItems).length; i++){
                label_div.innerHTML += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center" data-kt-ecommerce-edit-order-filter="product" data-kt-ecommerce-edit-order-id="product_30">
                                <div class="ms-5">
                                    <a class="text-gray-800 text-hover-primary fs-5 fw-bolder">${cartItems[i].item.toUpperCase()}</a>
                                    <input type='hidden' value='${cartItems[i].item}' name='item[]' class='box_items' />
                                </div>
                            </div>
                        </td>
                        <td>
                            <icon class='fa fa-minus-circle' id='${cartItems[i].item}' onclick="reduceinCart(this.id)"></icon>
                            <span class='fs-5'>${cartItems[i].qty}</span>
                            <icon class='fa fa-plus-circle' id='${cartItems[i].item}' onclick="increaseinCart(this.id)"></icon>
                        </td>
                        <td> 
                            &#8358;
                            <span class="item-price" data-kt-ecommerce-edit-order-filter="price">${cartItems[i].price * cartItems[i].qty}</span>
                            <input type='hidden' value='${cartItems[i].price}' name='price[]' class='box_items_price' />
                            <input type='hidden' value='${cartItems[i].qty}' name='quantity[]' class='box_items_qty' />
                        </td>
                        <td class="text-end pe-5" data-order="22"><icon class='fa fa-times-circle' id='${cartItems[i].item}' onclick="removeProduct(this.id)"></icon></td>
                    </tr>
                
                `;
            }
            boxTotalCost(boxid)
            let check = $("*#offer_type").prop('checked',false);
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });
}

function boxTotalCost(boxid){
    
    $.ajax({
        url: "../server/controller/box.php",
        method: "POST",
        data:{action:"getTotalCost", id:boxid},
        success: function (data) {
            document.getElementById("totalCost").textContent = data;
            document.getElementById("total_price").value = data;
        },
        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });
}
