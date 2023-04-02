
const continueBtn=document.getElementById("continue")

continueBtn.addEventListener("click",()=>{
    let email=document.getElementById("email").value
    let fName=document.getElementById("fName").value
    let lName=document.getElementById("lName").value
    let pass=document.getElementById("pass").value
    signUpfunc(email,fName,lName,pass)
})

const signUpfunc=async(e,f,l,p)=>{
    let payload={
        name:`${f} ${l}`,
        email:e,
        password:p
    }

    await fetch("http://localhost:8080/users/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
        swal(res.msg,"","success",{
            buttons:{
                Home: "Ok"
            }
        }).then((value)=>{
            switch (value){
                default:
                    window.location.href="../pages/Login.html"
            }
        })
    })
    .catch(err=>console.log(err))

}