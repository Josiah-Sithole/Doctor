// getting-started.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create user Schema
const appointmentSchema = new Schema({
    // String is shorthand for {type: String}
    name: {
        type: String,
        required: true,
        trim: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    day: {
        type: String,
        required: true,
        trim: true
    },
    user: [//Reference appointment schema
        {
            type: Schema.Types.ObjectId,
            ref:'user'
        }
    ]
    
})

module.exports = mongoose.model('appointment', appointmentSchema)