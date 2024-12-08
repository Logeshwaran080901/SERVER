const mongoose = require("mongoose");
const jointloadSchema = new mongoose.Schema({
    companyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
        required: true
    },
    jointrecord:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    companyweight:{
        type:Number,
        required:true
    },
    tolocation:{
        type:String,
        required:false
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("jointload", jointloadSchema)
