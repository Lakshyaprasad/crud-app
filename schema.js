const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersSchema = new Schema({
    name : {
        type: String,
        minlength: 2,
        required: true
    }, 
    email : {
        type: String,
        minlength: 2,
        required: true
    },
    date : {
        type: Date,
        dafault: Date.now
    },
    starred : {
        type: Boolean,
        default: false
    }
})

module.exports = usersSchema