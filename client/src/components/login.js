// Default React Library 
import React, {Component} from 'react';

// Bootstrap and custom css 
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

// login image
import login from '../images/loginImage.jpg';

// React-bootstrap css 
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// React dev dependences 
import axios from 'axios';
import {authenticateUser} from '../utils/utils';
import {withRouter} from 'react-router-dom';

//the concept of state and lifecycle in a React component
//https://reactjs.org/docs/state-and-lifecycle.html
class Login extends Component{
    constructor(props){
        super(props)

        this.state={
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    //This will set the states of the email and password when the user inputs values in the input fields
    onChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogin=()=>{
        const {email, password} = this.state

        //Function for making the login request when the Sign in but below is clicked
        //This will redirect the user to the appointment book if the login is successful
        axios.post('/auth/login', {email, password})
        .then((response)=>authenticateUser(response, () => {
            alert('You are now signed in! You will be redirected to your appointment book shortly.')
            this.props.history.push('/appointments')
        }))
        .catch((err)=>alert('Sorry, your sign in failed. Please check your user info and try again'))
    }

    render(){
        return(
           <div className="content-wrapper">
               <img src={login}/>
               <div className="text-wrapper">
                <h1 className="LoginHeading">Hello World, Please Log in</h1>
               <Form className="LoginForm">
               <Form.Group>
               <Form.Label className="LoginLabel"><b>Email Address</b></Form.Label>
               <Form.Control type="email" onChange={this.onChange} name="email"/>
               <Form.Text className="LoginMuted">This email will be keep privately.</Form.Text>
               </Form.Group>

               <Form.Group controlId="formBasicPassword">
               <Form.Label className="LoginLabel"><b>Password</b></Form.Label>
               <Form.Control type="password" onChange={this.onChange} name="password"/>
               </Form.Group>
               <Button variant="primary" onClick={this.onLogin} className="LoginButton">Log in</Button>
               </Form>
               </div>
           </div> 
        )
    }
}

export default withRouter(Login)