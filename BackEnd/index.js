const express=require("express")

require("dotenv").config()
const { connection } = require("./connection/db");
const { userRouter } = require("./routes/users.routes")
const { flightRouter } = require("./routes/flights.routes")
const { AdminuserRouter } = require("./routes/adminusers.routes")
const { auth } = require("./middlewares/auth.middleware")
const cors=require("cors");

const app=express()
app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to TripWise Backend")
})

app.use("/users",userRouter)
app.use("/admin",AdminuserRouter)

app.use(auth)
app.use("/flights",flightRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Can not Connect to DB")
        console.log(error)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})