const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'user'
    }
}, {
    timestamps: true
})

const Note = mongoose.model('note', noteSchema);
module.exports = Note
