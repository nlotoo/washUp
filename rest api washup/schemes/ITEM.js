const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const itemSchema = new mongoose.Schema({

    itemName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]





})


module.exports = mongoose.model('Item', itemSchema)