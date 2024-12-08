const mongoose = require("mongoose");
const amountGivenSchema = new mongoose.Schema({
    brokerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "broker",
        required: false
    },
    labourid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "labour",
        required: false
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    paymentmethod:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("amountgiven", amountGivenSchema)
