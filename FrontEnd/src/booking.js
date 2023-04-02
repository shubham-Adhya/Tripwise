window.addEventListener("load",()=>{
    let temp={
        leavingFrom:"",
        goingTo:"",
        departDate:""
    }
    let userInputs=JSON.parse(localStorage.getItem("userInputs")) || temp

    let returning=document.getElementById("returning")
    let departing=document.getElementById("departing")
    let flyingto=document.getElementById("flyingto")
    let flyingfrom=document.getElementById("flyingfrom")

    flyingfrom.value=userInputs.leavingFrom
    flyingto.value=userInputs.goingTo
    departing.value=userInputs.departDate
    returning.value=userInputs.returnDate


    loadData()
})

const loadData=()=>{
    let flightDetails=JSON.parse(localStorage.getItem("flightDetails")) || 0
    if(flightDetails){
        res= renderData(flightDetails)
        let flightcards=document.getElementById("right-sec")
        flightcards.innerHTML=""
        flightcards.innerHTML=res

        document.querySelectorAll(".flightCard").forEach(function(div){
            div.addEventListener("click",function(){
                id=(this.getAttribute("data-id"))
                localStorage.setItem("flightSelected",JSON.stringify(id))
                window.location.href="./pre-payment.html"
            })
        })
    }
}

const renderData=(data)=>{
    let res=`
       ${
        data.map(item=>{
            if(item["non-stop"]){
                temp="Nonstop"
            }else{
                temp="1-Stop"
            }
            return `
            <div class="bg-white flightCard" 
            data-id='${item._id}'>
                <div class="info1 p-2" >
                <h6 class="m-0">
                    <span class="dep-time">${item.departTime}</span>
                    -
                    <span class="arr-time">${item.arriveTime}</span>
                </h6>
                <p class="m-0">
                    <span class="dep-city">${item.leavingFrom}</span>
                    -
                    <span class="arr-city">${item.goingTo}</span>
                </p>
                <p>
                    <img src="../img/icons8-airport-64.png" alt="" class="planeicon">
                    <span class="airline">${item.airline}</span>
                </p>
                </div>
                <div class="info2 p-2 bg-body-tertiary" >
                <p>Departure: <span class="dep-date">${item.departDate}</span></p>
                <p>Arrival: <span class="arr-date">${item.departDate}</span></p>
                <p>${temp}</p>
                </div>
                <div class="info3 p-2" >
                <h5 class="price text-center">${item.priceCurrency} ${item.priceAmmount}</h5>
                <p class="rpt text-center">Roundtrip per travel</p>
                </div>
            </div>
            `
        }).join("")
       } 
    `
    return res
}





