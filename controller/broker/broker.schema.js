const mongoose = require("mongoose");
const brokerSchema = new mongoose.Schema({
    brokername: {
        type: String,
        required: true
    },
    businessid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business",
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("broker", brokerSchema)
