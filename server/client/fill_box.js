function addItem(e) {
    // alert(e)
    let item = e.split("-");

    let products = {
        name: item[0],
        price: item[1],
        image: item[2],
        inCart: 0
    };

    setItems(products);
    setPrice(products);
    countItem();
    displayResult();
    // document.getElementById("search_item").value = "";
    let x = localStorage.getItem("totalCart");
    // console.log(total)

    if(x > 0){
        document.querySelectorAll("#continue_to_checkout").forEach(element => {
            element.innerHTML = "<a class='text-success p-2' href='cart.html'>Continue to checkout</a>"
        }); 
    }


}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }

        cartItems[product.name].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function increaseinCart(product) {
    let cartItems = localStorage.getItem("productsInCart");
    let sum = localStorage.getItem("totalCost")
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < Object.keys(cartItems).length; i++) {
        if (Object.keys(cartItems)[i] == product) {
            setPrice(cartItems[product].price)
            cartItems[product].inCart += 1;
            localStorage.setItem("totalCost", parseInt(sum) + parseInt(cartItems[product].price));
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        }
    }
    displayResult();
}

function reduceinCart(product) {
    let cartItems = localStorage.getItem("productsInCart");
    let sum = localStorage.getItem("totalCost")
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < Object.keys(cartItems).length; i++) {
        if (Object.keys(cartItems)[i] == product) {
            if (cartItems[product].inCart > 0) {
                setNewPrice(cartItems[product].price)
                cartItems[product].inCart -= 1;
                localStorage.setItem("totalCost", parseInt(sum) - parseInt(cartItems[product].price));
                localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            }

        }
    }
    displayResult();
}

function setPrice(product) {
    let totalCost = localStorage.getItem("totalCost");

    if (totalCost != null) {
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalCost", totalCost + parseInt(product.price));
    } else {
        localStorage.setItem("totalCost", parseInt(product.price));
    }
}

function countItem() {
    let cart = localStorage.getItem("totalCart");

    if (cart != null) {
        cart = parseInt(cart);
        localStorage.setItem("totalCart", cart + 1);
    } else {
        localStorage.setItem("totalCart", 1);
    }
}

function setNewPrice(price) {
    let totalCost = localStorage.getItem("totalCost");

    if (totalCost != null) {
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalCost", totalCost - parseInt(price));
    } else {
        localStorage.setItem("totalCost", 0);
    }
}

function removeProduct(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < Object.keys(cartItems).length; i++) {
        if (Object.keys(cartItems)[i] == product) {
            setNewPrice(cartItems[product].price)
            delete cartItems[product]
            localStorage.setItem("productsInCart", JSON.stringify(cartItems))
            // console.log(cartItems[product].price)
        }
    }
    displayResult()
}

function displayResult() {
    let cartItems = localStorage.getItem("productsInCart");
    let sum = localStorage.getItem("totalCost")
    let cart = localStorage.getItem("totalCart")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById("cart");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class='product'>
                    <div class='product-cart-details'>
                        <h4 class='product-title'>
                            <a href='product.html'>${item.name}</a>
                        </h4>
                        <span class='cart-product-info'>
                           ${item.inCart}
                        </span>
                    </div>

                    <figure class='product-image-container'>
                        <a href='product.html' class='product-image'>
                            <img src='server/menu/${item.image}' alt='product'>
                        </a>
                    </figure>
                    <a href='#' class='btn-remove' title='Remove Product'><i class='icon-close'></i></a>
                </div>
            
            `
        });

        document.getElementById("total_price").textContent = sum;
        document.getElementById("total_sum").textContent = sum;
        document.getElementById("cart_total").textContent = cart;
        
    }

    

}

displayResult();

