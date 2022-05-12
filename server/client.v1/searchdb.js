$(document).ready(function(){
    $("#search_item").keyup(function(){
        let input = $(this).val();
        // alert(input);
        if(input != ""){
            data = {
                action: "searchproduct",
                input: input
            }
            $.ajax({
                url: "../server/controller/product.php",
                method: "POST",
                data: data,
                success: function (data) {
                    $("#display_result").html(data);
                    // $("#display_result").val() = "";
                },
                error: function (e) {
                    $("#display_result").css("display", "none");  
                }
    
            });
        }
        
    });
});

