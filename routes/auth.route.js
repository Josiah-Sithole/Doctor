//init express 
const express = require('express');

//Express dev dependence 
const router = express.Router();

const {registerUser, loginUser, idUser} = require('../controllers/auth.controller');

//Route for registering a user into the web application created
router.post('/register', registerUser)

//Route for logging in user
router.post('/login', loginUser)

//Route for to identify a user when adding an appointment.  
router.post('/id', idUser)

module.exports = router;