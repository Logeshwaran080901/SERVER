const mongoose = require("mongoose");
const labourSchema = new mongoose.Schema({
    labourname: {
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

module.exports = mongoose.model("labour", labourSchema)
