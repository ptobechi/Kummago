function getAllMeals () {

    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: { action: "getMenu", category: "" },
        success: function (data) {
            // console.log(data)
            document.getElementById("allMenu").innerHTML += data;
            let x = localStorage.getItem("totalCart");
    let total = $("*#continue_to_checkout");

    // console.log(total)

    if(x > 0){
        document.querySelectorAll("#continue_to_checkout").forEach(element => {
            element.innerHTML = "<a class='text-success p-2' href='cart.html'>Continue to checkout</a>"
        }); 
    }

        },

        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: { action: "getMenu", category: "Breakfast" },
        success: function (data) {
            // console.log(data)
            document.getElementById("breakfastMenu").innerHTML += data;
        },

        error: function (e) {
            $("#output").text(e.responseText);
            console.log("ERROR : ", e);
            $("#place-order").prop("disabled", false);
        }
    });

}

// function getAllBreakFast() {
//     $.ajax({
//         url: "server/controller/product.php",
//         method: "POST",
//         data: { action: "homeBreakfast" },
//         success: function (data) {
//             let breakfast_Div = document.getElementById("breakfast_Div");
//             breakfast_Div.innerHTML += data;
//         },

//         error: function (e) {
//             $("#output").text(e.responseText);
//             console.log("ERROR : ", e);
//             $("#place-order").prop("disabled", false);
//         }
//     });
    
// }

getAllMeals();
