"use strict"; var KTModalOfferADealType = function () {
    var e, t, o, boxid, r; return {
        init: function () {
            o = KTModalOfferADeal.getForm(), r = KTModalOfferADeal.getStepperObj(),
            e = KTModalOfferADeal.getStepper().querySelectorAll('[data-kt-element="type-next"]'),
            t = FormValidation.formValidation(o, {
                fields: { offer_type: { validators: { notEmpty: { message: "Select Box" } } } },
                plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) }
            }),
            // boxid = document.getElementById(),
            e.forEach(es =>{
                es.addEventListener("click", (function (o) {
                    o.preventDefault(), es.disabled = !0, t && t.validate().then((function (t) {
                        console.log("validated!"),
                        console.log(t),
                        boxid = o.target.value,
                        
                        "Valid" == t ? (es.setAttribute("data-kt-indicator", "on"),
                            setTimeout((function () {
                                es.removeAttribute("data-kt-indicator"),
                                box_details(boxid);
                                es.disabled = !1, r.goNext()
                            }), 1e3)) : (es.disabled = !1, Swal.fire({
                                text: "Sorry, looks like there are some errors detected, please try again.", icon: "error",
                                buttonsStyling: !1, confirmButtonText: "Ok, got it!",
                                customClass: { confirmButton: "btn btn-primary" }
                            }))
                    }))

                }))
            })
            
        }
    }
}(); "undefined" != typeof module && void 0 !== module.exports && (window.KTModalOfferADealType = module.exports = KTModalOfferADealType);


