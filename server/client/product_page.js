function getAllMeals () {

    $.ajax({
        url: "server/controller/product.php",
        method: "POST",
        data: { action: "getMenu", category: "" },
        success: function (data) {
            // console.log(data)
            document.getElementById("allMenu").innerHTML += data;
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
