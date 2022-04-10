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

