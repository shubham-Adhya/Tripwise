
const loginbtn=document.getElementById("loginbtn")

loginbtn.addEventListener("click",()=>{
    const floatingInput=document.getElementById("floatingInput").value
    const floatingPassword=document.getElementById("floatingPassword").value

    loginfunc(floatingInput,floatingPassword)
})

const loginfunc=async(email,pass)=>{
    let payload={
        "email":email,
        "password":pass
    }

    await fetch("http://localhost:8080/users/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
        localStorage.setItem("userDetails",JSON.stringify(res))
        if(res.msg=="Wrong Password !"){
            swal(res.msg,"","warning")
        }else{
            swal(res.msg,"","success",{
                buttons:{
                    Home: "Ok"
                }
            }).then((value)=>{
                switch (value){
                    default:
                        window.location.href="../index.html"
                }
            })
           
        }
    })
    .catch(err=>console.log(err))
}

