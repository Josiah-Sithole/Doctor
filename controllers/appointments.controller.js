const Appointment = require('../models/appointments.model')
const User = require('../models/user.model')
const expressJwt = require('express-jwt')

//this function adds an appointment to the web application.
//the user can see the appointment, date. 
const addAppointments = async(req, res) => {
    const {_id, name, reason, duration, date, day} = req.body

    //they is a check if the user exists on the database 
    //return an error message if the user doesnt exist 
    //Error message : User new Appointment 
    User.findById(_id).exec((error, user) => {
        if(error){
            return res.status(400).json({Error: 'User not found'})
        }

        //create new appointment for the patient
        const newAppointment = new Appointment(
            {
            name: name,
            reason: reason,
            duration: duration,
            date: date,
            day: day,
            user: _id
        });
        
        //new appointment is Added 
        newAppointment.save((err, appointment) => {
            if(err){
                console.log('Could not save Appointment')
                return res.status(400).json({Error: 'Appointment could not be saved'})
            }
            //In response, send appointment
            return res.status(200).json({
                Message: 'Appointment has been added successfully',
                appointment,
            });
        });
        
        //push new appointment to the user appointments array
        //Save user with new appointment
        user.appointments.push(newAppointment);
        user.save();
    })
}
//Fetch all appointments from the database
//req.user only available when using requireUser middleware
const fetchAppointments = async(req, res) => {
    const _id = req.user._id

    User.findById(_id).populate('appointments').exec((err, user) => {
        if(err){
            console.log('Failed to fetch appointments')
            return res.status(400).json({Error: 'Failed to fetch appointments'})
        }

        //User appointments
        //Send apppointments in response
        const appointments = user.appointments
        return res.send(appointments);
    })
}

//Identifying a user when fetching appointments using the json web token provided
const requireUser = expressJwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']})

//Function for deleting an appointment using the id provided by the user 
const removeAppointment = async(req, res) => {
    const _id = req.params._id

    Appointment.findOneAndRemove({_id: _id}, (err) => {
        if(err){
            console.log('Could not remove appointment')
            return res.status(400).json({Error: 'Unable to remove appointment'})
        }

        return res.send('Appointment Removed')
    })
}

//Function for fetching all appointments in the database
const fetchAllAppointments = (res) => {
    Appointment.find((err) => {
        if(err){
            console.log('An error coccured while trying to fetch data')
            return res.status(400).json({Error: 'An error coccured while trying to fetch data'})
        }

        return res.status(200).json({Message: 'Data was fetched successfully'})
    })
}

//Function for updating appointments
const updateAppointment = (req, res) => {
    const {name, reason, duration, date, day, toBeChanged, newValue} = req.body

    Appointment.findOneAndUpdate({name: name, reason: reason, duration: duration, date: date, day: day}, {$set: {[toBeChanged]: newValue}}, (err) => {
        if(err){
            console.log('An error occured while updating document')
            return res.status(404).json({Error: 'An error occured while trying to update document'})
        }

        return res.status(201).json({Message: 'Appointment updated successfully! You can now view the changes in your "Appointment Book"'})
    })
}

module.exports = {addAppointments, fetchAppointments, requireUser, removeAppointment, fetchAllAppointments, updateAppointment}