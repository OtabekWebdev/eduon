const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    surname: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    accessToken: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('User', UserSchema)