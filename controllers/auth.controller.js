const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { request } = require('express');
const {hash, compare} = require('bcryptjs');

//register user function 
//this is for the first time user on the web application 
//user info coming from the client
const registerUser = async(req, res) => {
    const {name, email, password} = req.body

    try{
        const user = await User.findOne({email});

        if(user){
            console.log('Error: User already exists')
            return res.status(400).json({Error: "User already exists"})
        }
        //hash password sent by user from client
        const hashed_password = await hash(password, 10)

        const newUser = new User({
            name: name,
            email: email,
            password: hashed_password
        });

        //Save new user to database
        await newUser.save()
        return res.status(201).json({Message: 'You have registered successfully', newUser})
    }
    //catch an error
    //if it occurs 
    catch(error){
        console.log('An error occured when registering')
        res.status(404).json({Error: 'Registration unsuccessful, please try again'})
    }
}

//Values coming from the client
const loginUser = async(req, res) => {
    const {email, password} = req.body

    try {
        //Checking if user exists in the database 
        const user = await User.findOne({email})

        //Check if the password provided by the user matches the user password in the database
        const validPassword = await compare(password, user.password)
        
        //If user cannot be found 
        //return an error message 
        if(!user){
            console.log('User does not exist')
            return res.status(400).json({Error: 'User could not be found, please register'})
        }

        //If user cannot be found
        //return password error message
        if(!validPassword){
            console.log('Password invalid')
            return res.status(404).json({Error: 'Password invalid'})
        }

        //Create token from user id 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

        //If successful, send user object and token to client in the response
        return res.status(200).json({user, token})

        //If error occurs when logging in
        //return error message 
    } catch (error) {
        console.log('An error occured when logging in')
        return res.status(404).json({Error: 'Login unsuccessful, please try again'})
    }
}

//Id user when adding a new appointment
const idUser = async (req, res) => {
    const _id = req.body._id

    try {
        //Check if the user exists
        const user = await User.findOne({_id})

        if(!user){
        console.log('User does not exist')
        return res.status(400).json({Error: 'User does not exist, please register'})
        }

        //Create a token containing user info
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        return res.status(200).json({user, token})
 
        //catch error
    } catch (error) {
        console.log('An error occured while finding user')
        return res.status(400).json({Error: 'User could not be found'})
    }
}

//Export functions
module.exports = {registerUser, loginUser, idUser}