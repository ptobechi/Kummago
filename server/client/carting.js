(function () {
    btn = document.getElementById("kt_ecommerce_add_order_submit");
    btn.addEventListener("click", function(){
        //set array (box) to hold all products
        let items = [];

        //get items and price 
        let item = document.getElementById("item").value;
        let price = document.getElementById("price").value;

        //set price for each item and add to an array
        items.item = item;
        items.price = price;

        setItems(items);

        const itemBox = document.createElement("tr");
        itemBox.innerHTML =`
            <td>
                <div class="d-flex align-items-center" data-kt-ecommerce-edit-order-filter="product" data-kt-ecommerce-edit-order-id="product_30">
                    <div class="ms-5">
                        <a class="text-gray-800 text-hover-primary fs-5 fw-bolder">${items.item.toUpperCase()}</a>
                        <input type='hidden' value='${items.item}' name='item[]' class='box_items' />
                        <div class="fw-bold fs-7">Price: &#8358;
                            <span class="item-price" data-kt-ecommerce-edit-order-filter="price">${items.price}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td class="text-end pe-5" data-order="22">
            Price: &#8358;
                <input type='text' value='${items.price}' name='price[]' class='box_items_price' />
                <span class="fw-bolder text-danger ms-3">Remove</span>
            </td>
        </tr>
        `;
        const cart = document.getElementById("cart");
        const total = document.getElementById("total_price_container");
        cart.insertBefore(itemBox, total);
        showTotals();
    });

    //sum total item in a box
    function showTotals(){
        const total = [];
        const prices = document.querySelectorAll(".item-price");

        prices.forEach(function(price){
            total.push(parseFloat(price.textContent));
        });

        const totalSum = total.reduce(function(total,price){
            total += price;
            return total;
        },0);
        const sum = totalSum.toFixed(2);
        document.getElementById("kt_ecommerce_edit_order_total_price").textContent = sum;
        document.getElementById("total_price").value = sum;

    }

    function setItems(items){
        let cartItems = localStorage.getItem("product");
        cartItems = JSON.parse(cartItems);
        if(cartItems != null){
            cartItems = {
                ...cartItems,
                "item": items
            }
        }else{
            cartItems = {
                "item": items.item,
                "price": items.price
            }
        }
        

        localStorage.setItem("product", JSON.stringify(cartItems))
    }
    
})();



function removeItem(id){
    let list = document.getElementById(`list${id}`);
    let price = document.getElementById(`item_price${id}`);
    let itemprice = document.getElementById(`item_price${id}`).value;
    let itemName = document.getElementById(`item_name${id}`);
    let btn = document.getElementById(`${id}`)
    let total_price = document.getElementById("total_sum").textContent
    let updated_price = document.getElementById("total_sum")

    let sum = total_price - itemprice;
    updated_price.textContent = sum;
    document.getElementById("total_sum_input").value = sum;
    console.log(sum)

    list.disabled = "true"
    price.disabled = "true"
    price.style.display = "none"
    btn.style.display = "none"
    itemName.style.display = "none"


}
// alert("ghh")




