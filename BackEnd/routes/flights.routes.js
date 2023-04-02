const express = require("express")
const flightRouter = express.Router();
const { FlightModel } = require("../model/flights.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

flightRouter.get("/result",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded= jwt.verify(token,'tripwise')
    try {
        if(decoded){
            let {leavingFrom,goingTo,departDate}=req.query
            // console.log(leavingFrom,goingTo,departDate)
            const flights = await FlightModel.find(
                {
                    leavingFrom,goingTo,departDate
                }
            )
            res.status(200).json(flights)

        }else{
            res.status(400).json({"msg":"No flights available"})
        }
        
    } catch (error) {
        res.status(400).json({"msg":error.message})
    }
})

module.exports={
    flightRouter 
}
