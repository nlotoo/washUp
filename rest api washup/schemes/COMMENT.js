const mongoose = require('mongoose')

const { Schema } = require('mongoose')
const commentSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    email: {
        type: String
    },
    content: {
        type: String,
    },
    time: {
        type: String,

    },
    likes: {
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
    },
    likeButton: {
        type: Boolean
    }


})


module.exports = mongoose.model('Comment', commentSchema)