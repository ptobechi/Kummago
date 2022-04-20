function addItem(e){
    // alert(e)
    let item = e.split("-");
    
    let products = {
        name: item[0],
        price: item[1],
        inCart: 0
    };

    setItems(products);
    setPrice(products);
    displayResult();


}

function setItems(product){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }

        cartItems[product.name].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function setPrice(product){
    let totalCost = localStorage.getItem("totalCost");
    
    if(totalCost != null){
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalCost", totalCost + parseInt(product.price));
    }else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayResult(){
    let cartItems = localStorage.getItem("productsInCart");
    let sum = localStorage.getItem("totalCost")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById("cart");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex align-items-center" data-kt-ecommerce-edit-order-filter="product" data-kt-ecommerce-edit-order-id="product_30">
                            <div class="ms-5">
                                <a class="text-gray-800 text-hover-primary fs-5 fw-bolder">${item.name.toUpperCase()}</a>
                                <input type='hidden' value='${item.price}' name='item[]' class='box_items' />
                            </div>
                        </div>
                    </td>
                    <td>
                        <icon class='fa fa-minus-circle' name="remove-circle-outline"></icon>
                         <span class='fs-5'>${item.inCart}</span>
                        <icon class='fa fa-plus-circle' name="add-circle-outline"></icon>
                    </td>
                    <td> 
                        &#8358;
                        <span class="item-price" data-kt-ecommerce-edit-order-filter="price">${item.price * item.inCart}</span>
                        <input type='hidden' value='${item.price}' name='price[]' class='box_items_price' />
                    </td>
                    <td class="text-end pe-5" data-order="22"><icon class='fa fa-times-circle' name="add-circle-outline"></icon></td>
                </tr>
            
            `
        });
        document.getElementById("kt_ecommerce_edit_order_total_price").textContent = sum;
        document.getElementById("total_price").value = sum;
        // productCost.textContent = totalCost;
    }
    
}
displayResult();
