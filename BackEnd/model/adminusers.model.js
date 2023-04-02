const mongoose=require("mongoose");

const adminUserSchema=mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique:true
    },
    gender: String,
    password: String,
    age: Number,
    city: String
},{
    versionKey:false
})

const AdminUserModel=mongoose.model("user",adminUserSchema);

module.exports={
    AdminUserModel
}