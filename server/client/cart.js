function addItem(e) {
    // alert(e)
    let item = e.split("-");

    let products = {
        name:  item[0],
        price: item[1],
        image: item[2],
        inCart: 0
    };

    setItems(products);
    setPrice(products);
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
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById("cart");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <tr>
                    <td class="product-col">
                        <div class="product">
                            <figure class="product-media">
                                <a href="#">
                                    <img src="server/menu/${item.image}" alt="Product image">
                                </a>
                            </figure>
                            <h3 class="product-title">
                                <a href="#">${item.name}</a>
                            </h3>
                        </div>
                    </td>
                    <td class="price-col">&#8358; ${item.price}</td>
                    <td class="quantity-col">
                        <div class="cart-product-quantity"> 
                            <icon class='fa fa-minus-circle' id='${item.name}' onclick="reduceinCart(this.id)"></icon>
                            <span class='fs-5'>${item.inCart}</span>
                            <icon class='fa fa-plus-circle' id='${item.name}' onclick="increaseinCart(this.id)"></icon>
                        </div>
                    </td>
                    <td class="total-col text-success">&#8358;  ${item.price * item.inCart}</td>
                    <td class="remove-col"><button class="btn-remove" id='${item.name}' onclick="removeProduct(this.id)"><i class="icon-close"></i></button></td>
                </tr>
            
            `
        });
        document.getElementById("total_price").textContent = sum;
        document.getElementById("total_sum").value = sum;
    }

}

displayResult();
// let today = new Date();
// let tomorrow = new Date(today.getTime() + (48 * 60 * 60 * 1000));

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
let day = weekday[d.getDay()];

// weekday.forEach(element => {
//     if (element == day) {
//         alert(element);
//     }

// });

let dateContainer = document.getElementById("dateContainer");

for (let i = 2; i < weekday.length; i++) {
    dateContainer.innerHTML += `
        <option value="${weekday[i]}">${weekday[i]}</option>
    `;

}

// document.getElementById("delivery_date").textContent = weekday.length;
