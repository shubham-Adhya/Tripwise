let flightSearch=document.getElementById("flightSearch")


window.addEventListener("load",()=>{
    let loginbtn=document.getElementById("login")
    let signOut=document.getElementById("signOut")
    let userDetails=JSON.parse(localStorage.getItem("userDetails")) || "Login"
    if(userDetails=="Login"){
        let userName="Login"
        // console.log(userName)
        loginbtn.innerText=userName
    }else{
        let userName=userDetails.userName.split(' ')[0]
        // console.log(userName)
        loginbtn.innerText=userName
        loginbtn.setAttribute("disabled",true)
        signOut.removeAttribute("hidden")
    }
})

let signOut=document.getElementById("signOut")
signOut.addEventListener("click",()=>{
    localStorage.removeItem("userDetails")
    localStorage.removeItem("flightDetails")
    let loginbtn=document.getElementById("login")
    loginbtn.setAttribute("disabled",false)
    swal("See you later 👋","","info",{
        buttons:{
            Home: "Ok"
        }
    }).then((value)=>{
        switch (value){
            default:
                window.location.reload()
        }
    })
})

flightSearch.addEventListener("click",async()=>{
    let cabin=document.getElementById("cabin").value
    let travellers=document.getElementById("travellers").value
    let returnDate=document.getElementById("returnDate").value
    let departDate=document.getElementById("departDate").value
    let goingTo=document.getElementById("goingTo").value
    let leavingFrom=document.getElementById("leavingFrom").value
    let oneWay=document.getElementById("oneWay").value //on
    
    if(leavingFrom=="" || departDate=="" || goingTo==""){
        swal("Some fields are empty ☹️","","info",{
            buttons:{
                Home: "Ok"
            }
        }).then((value)=>{
            switch (value){
                default:
                    window.location.reload()
            }
        })
    }else{
        // console.log(leavingFrom,goingTo,departDate)
        let payload={
            leavingFrom,goingTo,departDate,returnDate,travellers,cabin,oneWay
        }
        token=JSON.parse(localStorage.getItem("userDetails")).token
        // console.log(token)
        await fetch(
            `http://localhost:8080/flights/result?leavingFrom=${leavingFrom}&goingTo=${goingTo}&departDate=${departDate}`
            ,{
            headers:{
                "Content-type":"application/json",
                "authorization": `Bearer ${token}` 
            }
        }).then((res)=>res.json())
        .then((res)=>{
            localStorage.setItem("flightDetails",JSON.stringify(res))
            localStorage.setItem("userInputs",JSON.stringify(payload))
            window.location.href="./pages/booking.html"
        })
        .catch((err)=>console.log(err))
    }
})

redirectToLogin=()=>{
    window.location.href="./pages/Login.html"
}