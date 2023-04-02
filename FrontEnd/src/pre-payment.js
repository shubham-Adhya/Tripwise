window.addEventListener("load",()=>{
    let flightDetails=JSON.parse(localStorage.getItem("flightDetails"))
    let flightSelected=JSON.parse(localStorage.getItem("flightSelected"))
    let userInputs=JSON.parse(localStorage.getItem("userInputs"))

    flightDetails.forEach(element => {
        if(element._id==flightSelected){
            // console.log(element)
            res=flightCardRender(element)
            let flightdiv=document.getElementById("right-sec")
            flightdiv.innerHTML=""
            flightdiv.innerHTML=res
            let traveler=document.getElementById("traveler")
            traveler.innerText=userInputs.travellers

            let price=document.getElementById("price")
            let fprice=document.getElementById("fprice")
            let tfprice=document.getElementById("tfprice")
            let ttprice=document.getElementById("ttprice")
            x1=userInputs.travellers*element.priceAmmount
            price.innerText=x1
            ttprice.innerText=x1
            tfprice.innerText=Math.round(x1*0.15)
            fprice.innerText=x1-Math.round(x1*0.15)

            let checkout=document.getElementById("checkout")
            checkout.addEventListener("click",()=>{
                localStorage.setItem("bill",JSON.stringify(x1))
                window.location.href="../checkout.html"
            })
        }
    });
})

const flightCardRender=(item)=>{
    if(item["non-stop"]){
        temp="Nonstop"
    }else{
        temp="1-Stop"
    }
    return `
    <div class="bg-white flightCard">
        <div class="info1 p-2" >
        <h6 class="m-0">
            <span class="dep-time">${item.departTime}</span>
            -
            <span class="arr-time">${item.arriveTime}</span>
        </h6>
        <p class="m-0 fw-bold fs-4">
            <span class="dep-city fs-4">${item.leavingFrom}</span>
            -
            <span class="arr-city fs-4">${item.goingTo}</span>
        </p>
        <p class="m-0">
            <img src="../img/icons8-airport-64.png" alt="" class="planeicon">
            <span class="airline fw-bolder">${item.airline}</span>
        </p>
        <p class="m-0">
            Flight-no: 
            <span class="flight-no fw-bolder ">${item.flight_no}</span>
        </p>
        </div>
        <div class="info2 p-2 bg-body-tertiary" >
        <p>Departure: <span class="dep-date">${item.departDate}</span></p>
        <p>Arrival: <span class="arr-date">${item.departDate}</span></p>
        <p>${temp}</p>
        </div>
    </div>
    `
}