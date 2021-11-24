const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this creates user Schema
//Reference appointment schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref:'appointment'
        }
    ]
})

module.exports = mongoose.model('user', userSchema)