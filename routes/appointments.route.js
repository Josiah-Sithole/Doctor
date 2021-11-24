//init express 
const express = require('express');

//Express dev dependence
const router = express.Router();

const {addAppointments, fetchAppointments, requireUser, removeAppointment, updateAppointment, fetchAllAppointments} = require('../controllers/appointments.controller');

//Route for registering a user into the web application
router.post('/add', addAppointments)

//Route for registering a user into the web application
router.get('/fetch', requireUser, fetchAppointments)

//Route for removing an appointment of a patient
router.delete('/:_id', removeAppointment)

//Route for updating an appointment in the database of a patient
router.put('/update', updateAppointment)

module.exports = router;