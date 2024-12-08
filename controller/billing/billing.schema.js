const mongoose = require("mongoose");
const billingSchema = new mongoose.Schema({
    labourid: {
        type: String,
        ref: "labour",
        require: false
    },
    brokerid: {
        type: String,
        ref: "broker",
        required: false
    },
    companyid: {
        type: String,
        ref: "companies",
        required: false
    },
    totalamount:{
        type:Number,
        required:true
    },
    totalrate:{
        type:Number,
        required:true
    },
    billingrecord:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("bill", billingSchema)
