const mongoose = require("mongoose");
const businessSchema = new mongoose.Schema({
    businessname: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("business", businessSchema)
