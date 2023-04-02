const express = require("express")
const AdminuserRouter = express.Router();
const { UserModel } = require("../model/users.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//registration
AdminuserRouter.post("/register", async (req, res) => {
    // console.log(req.body)
    const {name,email,gender,password,age,city}=req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            const user = new UserModel({ name, email, gender, password: hash, age, city,})
            await user.save()
            res.status(200).send({ "msg": "User Registration Successful" })
        });
    } catch (error) {
        res.status(400).json({ "msg": error.message })
    }
})

//login
AdminuserRouter.post("/login", async (req, res) => {
    const {email, password}=req.body;
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
                // result == true
                if(result){
                    res.status(200).json({ "msg": "Login Success !",token:jwt.sign({"userID":user._id},'tripwise',{expiresIn:"24h"})})
                }else{
                    res.status(400).json({ "msg": "Wrong Password !" })
                }
            });
        }else{
            res.status(400).json({ "msg": "User not found" })
        }
    } catch (error) {
        res.status(400).json({ "msg": error.message })
    }
})

module.exports = {
    AdminuserRouter
}