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
    document.getElementById("search_item").value = "";


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

function increaseinCart(product){
    let cartItems = localStorage.getItem("productsInCart");
    let sum = localStorage.getItem("totalCost")
    cartItems = JSON.parse(cartItems);

    for(let i=0; i<Object.keys(cartItems).length; i++){
        if(Object.keys(cartItems)[i] == product){
            setPrice(cartItems[product].price)
            cartItems[product].inCart += 1;
            localStorage.setItem("totalCost", parseInt(sum) + parseInt(cartItems[product].price) );
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        }
    }
    displayResult();
}

function reduceinCart(product){
    let cartItems = localStorage.getItem("productsInCart");
    let sum = localStorage.getItem("totalCost")
    cartItems = JSON.parse(cartItems);

    for(let i=0; i<Object.keys(cartItems).length; i++){
        if(Object.keys(cartItems)[i] == product){
            if(cartItems[product].inCart > 0){
                setNewPrice(cartItems[product].price)
                cartItems[product].inCart -= 1;
                localStorage.setItem("totalCost", parseInt(sum) - parseInt(cartItems[product].price) );
                localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            }
            
        }
    }
    displayResult();
}

function setPrice(product){
    let totalCost = localStorage.getItem("totalCost");
    
    if(totalCost != null){
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalCost", totalCost + parseInt(product.price));
    }else{
        localStorage.setItem("totalCost", parseInt(product.price));
    }
}

function setNewPrice(price){
    let totalCost = localStorage.getItem("totalCost");
    
    if(totalCost != null){
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalCost", totalCost - parseInt(price));
    }else{
        localStorage.setItem("totalCost", 0);
    }
}

function removeProduct(product){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    for(let i=0; i<Object.keys(cartItems).length; i++){
        if(Object.keys(cartItems)[i] == product){
            setNewPrice(cartItems[product].price)
            delete cartItems[product]
            localStorage.setItem("productsInCart", JSON.stringify(cartItems))
            // console.log(cartItems[product].price)
        }
    }
    displayResult()
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
                                <a class="text-gray-800 text-hover-primary fs-5 fw-bolder">${item.name}</a>
                                <input type='hidden' value='${item.name}' name='item[]' class='box_items' />
                            </div>
                        </div>
                    </td>
                    <td>
                        <icon class='fa fa-minus-circle' id='${item.name}' onclick="reduceinCart(this.id)"></icon>
                         <span class='fs-5'>${item.inCart}</span>
                        <icon class='fa fa-plus-circle' id='${item.name}' onclick="increaseinCart(this.id)"></icon>
                    </td>
                    <td> 
                        &#8358;
                        <span class="item-price" data-kt-ecommerce-edit-order-filter="price">${item.price * item.inCart}</span>
                        <input type='hidden' value='${item.price}' name='price[]' class='box_items_price' />
                        <input type='hidden' value='${item.inCart}' name='quantity[]' class='box_items_qty' />
                    </td>
                    <td class="text-end pe-5" data-order="22"><icon class='fa fa-times-circle' id='${item.name}' onclick="removeProduct(this.id)"></icon></td>
                </tr>
            
            `
        });
        document.getElementById("kt_ecommerce_edit_order_total_price").textContent = sum;
        document.getElementById("total_price").value = sum;
        // productCost.textContent = totalCost;
    }
    
}

displayResult();
