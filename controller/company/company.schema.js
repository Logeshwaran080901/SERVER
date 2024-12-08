const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    companyname: {
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

module.exports = mongoose.model("company", companySchema)
