"use strict";var KTModalOfferADealFinance=function(){
    var e,t,a,n,i;
    return{init:function(){
        n=KTModalOfferADeal.getForm(),
        i=KTModalOfferADeal.getStepperObj(),
        e=KTModalOfferADeal.getStepper().querySelector('[data-kt-element="finance-next"]'),
        t=KTModalOfferADeal.getStepper().querySelector('[data-kt-element="finance-previous"]'),
        // KTDialer.getInstance(n.querySelector("#kt_modal_finance_setup")).on("kt.dialer.changed"),
                    e.addEventListener("click",(function(t){
                        t.preventDefault(),
                            e.disabled=!0,a&&a.validate().then((function(t){
                            console.log("validated!"),"Valid"==t?(e.setAttribute("data-kt-indicator","on"),
                            setTimeout((function(){e.removeAttribute("data-kt-indicator"),
                            e.disabled=!1,i.goNext()}),1500)):(e.disabled=!1,Swal.fire(
                                {text:"Sorry, looks like there are some errors detected, please try again.",
                                icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",
                                customClass:{confirmButton:"btn btn-primary"}}))}))})),
                                t.addEventListener("click",
                                (function(){i.goPrevious()}))}}}();
                                "undefined"!=typeof module&&void 0!==module.exports&&(window.KTModalOfferADealFinance=module.exports=KTModalOfferADealFinance);