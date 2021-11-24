# Doctor's Appointment Web Application

## Live Demo
![Doctor's Appointment]()

* This a web applications which shows an individual patient having to book for a dcotors appointment.
* The User has opitons to create, edit and delete his own appointments after successful logIn
* A new user is allowed to register and be able to have their details registered with the web application

## Screenshots: Web Application
* Home Page
![Screenshot (143)](https://user-images.githubusercontent.com/81366533/124412049-f6eed680-dd4d-11eb-8498-e393a836acfc.png)

* Login Page
![Screenshot (144)](https://user-images.githubusercontent.com/81366533/124412122-17b72c00-dd4e-11eb-96fe-e8ad0534e940.png)

* Appointment List
![Screenshot (145)](https://user-images.githubusercontent.com/81366533/124412141-243b8480-dd4e-11eb-9d55-861ed263eafa.png)

* Add New Appointments
![Screenshot (146)](https://user-images.githubusercontent.com/81366533/124412175-33bacd80-dd4e-11eb-8783-1ff5961489a0.png)

* Update Appointments
![Screenshot (147)](https://user-images.githubusercontent.com/81366533/124412200-43d2ad00-dd4e-11eb-9551-7593e27c87a3.png)


# Software Requirements

* This created Web Application allows doctors to track information about patients and appointments made on the web application.
* The Web Application will make use of the MERN stack to create this web application
* The MERN stack consists of 4 technologies namely: MongoDB, Express, Node and React. 
* MongoDB, Express and Node.js will be for backend and React.js for frontend 
* The Web Application will use passport and JWT for the authentication middleware
* On the deployment part Heroku or Vercel and GitHub will be used. 
* The styling part will be making use of Bootstrap and React Bootstrap because these make attractive web pages. 

## How will this application work? 
* This web application will allow doctors to make, cancel or edit appointments and patient information 
* On the frontend , React will accept information given by the end-user, send it to the server(Express) via Axios to interact with the MongoDB database
* To get acccess to the appointments list, users will either need to login or register as a new user
* Express (the server) will be listening for any requests made by the client and then modify the MongoDB database accordingly.

# Systems Requirements Specifications
## Functional Requirements 

* user login with their username and password 
* non-existing users will be allowed to register and create a new account on the web application
* users should be notified upon successful login status 
* users should be able to add, update and delete appointments
* users who are not logged in or registered will only have access to view appointments made

## Non-functional Requirements 

* signing into the web application should take less than 10 seconds
* non-existing users should be given the option to sign up to create an account
* the UI needs to be attractive and user-friendly

## Project Challenges

1. AJAX: I faced a some difficulties sending and retrieving data from the backend.
2. APIs: We searched for APIs to use, but didn't find any related things.
3. User: User authentication is a little bit complex process due to it is based on token.
4. Styling: I found difficulties in implementing css styles in the component level.


## Usage

* To make use of all the functionalities of this web application you have to register as a new user and then sign in.
* Then after successfully logged into the web application, you can now make appointments by clicking on the 'Make New Appointment' button.
* When the button is clicked , you'll be sent to a page where you will fill out all the necessary details. 
* Once completed, you can return back to the home page to view your appointment list , with the newly added appointment. 
* Should you wish to edit any information about the appointment you can simlpy click on the "Update Appointment Information" button. 

## Installation

* npm install 
* cd to client
* npm install 
* create a .env file with the following content:
   `
   DB: enter mongoDB string 
   PORT: enter port number
   JWT_SECRET = enter secret
   `
* npm run dev to run the client and the backend of the application concurrently

## Security 

* Helmet is used for the server side of the Web Application .
* Helmet helps you secure your Express apps by setting various HTTP headers. 

## Contact
* Created by [Josiah Sithole]- feel free to contact me!