const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteContent: {
        type: String,
        required: true
    },
    noteJonner: {
        type: String,
        required: false
    },
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    modified: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Note', schema);