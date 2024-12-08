const mongoose = require("mongoose");
const loadSchema = new mongoose.Schema({
    labourid: {
        type: String,
        ref: "labour",
        require: false
    },
    brokerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "broker",
        required: true
    },
    companyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
        required: true
    },
    jointid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jointload",
        required: false
    },
    date: {
        type: Number,
        required: true
    },
    localweight: {
        type: Number,
        required: false
    },
    companyweight: {
        type: Number,
        required: true
    },
    fromlocation: {
        type: String,
        required: false
    },
    tolocation: {
        type: String,
        required: false
    },
    transport:{
        type: String,
        required: false
    },
    type:{
        type: String,
        required: false
    },
    payedtolabour: {
        payedtolabour: {
            type: Boolean,
            required: true
        },
        billid: {
            type: String,
            required: false
        }
    },
    payedtobroker: {
        payedtobroker: {
            type: Boolean,
            required: true
        },
        billid: {
            type: String,
            required: false
        }
    },
    billed: {
        billed: {
            type: Boolean,
            required: true
        },
        billid: {
            type: String,
            required: false
        }
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("load", loadSchema)
