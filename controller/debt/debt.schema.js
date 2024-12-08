const mongoose = require("mongoose");
const debtSchema = new mongoose.Schema({
    creditername: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("debt", debtSchema)
