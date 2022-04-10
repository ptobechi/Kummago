$("#kt_ecommerce_edit_order_form").submit(function(event){
    alert("Product Uploaded");
});

$("#edit_order_form").submit(function(event){
    event.preventDefault();

    let box_id = document.getElementById("box_id").value;
    let box = document.getElementById("box_name").value;
    let description = document.getElementById("box_description").value;
    let total_sum = document.getElementById("total_price").value;
    let items = document.getElementsByClassName("box_items");
    let itemsPrice = document.getElementsByClassName("box_items_price");
    let itemList = []

    for(i=0; i < items.length; i++){
        itemList.push({"item":items[i].value, "price":itemsPrice[i].value})
    }

    let data = 
        {
            "box": box,
            "description": description,
            "items": itemList,
            "total_sum": total_sum
        }
    
    // data.item
    console.log(data);
   
    let request = {
        "url": `/api/product/${box_id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert("Product updated successfully")
    })
});

if(window.location.pathname == "/admin"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        let id = $(this).attr("data-id")

        let request = {
            "url": `http://localhost:3000/api/product/${id}`,
            "method": "DELETE"
        }

        if(confirm("Do you really want to delete this product")){
            $.ajax(request).done(function(response){
                alert("Product deleted successfully");
                location.reload()
            })
        }  
        
    })
}

$("*#box_details").on('click', function(){
    document.getElementById("items_container").innerHTML = "";
    let id = $(this).attr("data-id")

    let request = {
        "url": `http://localhost:3000/api/product?id=${id}`,
        "method": "GET"
    }

    $.ajax(request).done(function(response){
        console.log(response);
        let items = response.items;
        for(i=0; i<items.length; i++){
            $("#item_name").text(items[i].price);
            const itemBox = document.createElement("div");
            itemBox.innerHTML =`
                <!--begin::Item-->
                <div class="d-flex flex-stack">
                    <div class="d-flex align-items-center me-5">
                        <div class="me-5">
                            <a id="item_name${i}" class="text-gray-800 fw-bolder text-hover-primary fs-6">${items[i].item}</a>
                            <input type="hidden"  id="list${i}" name="item[]" value="${items[i].item}">
                        </div>
                    </div>
                    <div class="text-gray-400 fw-bolder fs-7 text-end">
                        <input type="number" placeholder="&#8358 ${items[i].price}" value="${items[i].price}" name="price" id="item_price${i}">
                        <span class="text-danger" onclick="removeItem(this.id)" id="${i}">Remove</span>
                    </div>
                </div>
                <!--end::Item-->
                
                <!--begin::Separator-->
                <div id="dash${id}" class="separator separator-dashed my-5"></div>
                <!--end::Separator-->
            </div>
            `;
            const cart = document.getElementById("items_container");
            const total = document.getElementById("items_list");
            cart.insertBefore(itemBox, total);
        }
        
        $("#total_sum").text(response.total_sum);
        document.getElementById("total_sum_input").value = response.total_sum
        document.getElementById("box_name").value = response.box
        document.getElementById("box_description").value = response.description
        
    })
    // alert("Product Uploaded");

});

function sendData(e){
    let searchResult = document.getElementById("productSearchResult");
    let match = e.value.match(/^[a-zA-Z]*/);
    let match2 = e.value.match(/\s*/);
    if(match2[0] === e.value){
        searchResult.innerHtml = '';
        return;
    }
    if(match[0] === e.value){
        fetch('getProducts', {
            method:'POST', 
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({payload: e.value})
        }).then(res => res.json()).then(data => {
            let payload = data.payload;
            searchResult.innerHtml = '';
            if(payload.length < 1){
                // searchResult.innerHtml = "<p>Result not found.</p>";
                searchResult.innerHTML += "Result not found.";
                return;
            }
            payload.forEach((item, index) => {
                // if(index > 0) searchResult.innerHtml +='<hr>';
                searchResult.innerHtml += `${item.name}`;
                // if(index > 0){
                //     searchResult.innerHtml +='<hr>';
                //     console.log(item.name)
                // }else{
                //     searchResult.innerHtml += `<p>${item.name}</p>`;
                //     console.log(item.name)
                // }
            });
            return;
        });
        return;
    }
    // searchResult.innerHtml = 'Food';
    
}

