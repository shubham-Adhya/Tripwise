const mongoose=require("mongoose");

const flightSchema=mongoose.Schema({
    flight:{
        airline: String,
        flight_no: String,
        departure:{
            airport: String,
            city: String,
            state: String,
            country: String,
            date: String,
            time:String
        },
        arrival:{
            airport: String,
            city: String,
            state: String,
            country: String,
            date: String,
            time:String
        },
        price:{
            currency: String,
            amount: Number
        }
    },
    "non-stop":Boolean
},{
    versionKey:false
})

const FlightModel=mongoose.model("flight",flightSchema);

module.exports={
    FlightModel
}