let flightSelected = JSON.parse(localStorage.getItem("flightSelected")) || []
let finalPrice=JSON.parse(localStorage.getItem("bill")) || 0


let payNow=document.querySelector(".Pay-now")
let COD=document.querySelector(".COD")




window.addEventListener("load",()=>{
    showtotal()
})
function showtotal(){
    final_price.textContent=finalPrice
}
payNow.addEventListener("click",()=>{
    createObj("Prepaid")
})



function createObj(status){
    // alert("Precessing....., Please Wait")
    
    swal("Precessing..... Please Wait","","info",{
        buttons:{
            Home: "Ok"
        }
    }).then(()=>{
        setTimeout(()=>{
            localStorage.removeItem("flightSelected")
            localStorage.removeItem("userInputs")
            localStorage.removeItem("bill")
            swal("Payment Success, Thank You 😊","","success",{
                button:{
                    Home: "OK"
                }
            }).then((value)=>{
                switch (value){
                    default:
                        window.location.href="./index.html"
                }
            })
        },3000)
    })
    
    
}







