//Default React Library
import React, {Component} from 'react';

//Bootstrap and custom css 
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';

//React Components and register image 
import register from '../images/registerImage.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//React dev dependences
import axios from 'axios';
import {withRouter} from 'react-router-dom';

//React Component 
//https://reactjs.org/docs/state-and-lifecycle.html
class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    //This will set the states of the email and password when the user inputs values in the input fields
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onRegister = () => {
        const {name, email, password} = this.state

        //This will send a request to register the user by using the name, email and password the user inputs in state
        //This will redirect the user to the sign in page
        axios.post('/auth/register', {name, email, password})
        .then((res) => (alert(res.data.Message), 
            this.props.history.push('/login')))
        .catch((err) => alert('Registration unsuccessful: You may have used an e-mail address that is unavailable. Please check that you have entered your e-mail address correctly and try again.'))
    }

    render(){
        return(
            //return and register form 
           <div className="content-wrapper">
               <img src={register}/>
               <div className="text-wrapper">
                <h1 className="RegisterHeading">Welcome, You Can Register Below</h1>
               <Form className="RegisterForm">
                <Form.Group>
                <Form.Label className="RegisterLabel"><b>Name</b></Form.Label>
                <Form.Control type="text" onChange={this.onChange} name="name" placeholder="David Isaacs"/>
                </Form.Group>

               <Form.Group>
               <Form.Label className="RegisterLabel"><b>Email Address</b></Form.Label>
               <Form.Control type="email" onChange={this.onChange} name="email"/>
               <Form.Text className="RegisterMuted">This email will be keep privately.</Form.Text>
               </Form.Group>

               <Form.Group controlId="formBasicPassword">
               <Form.Label className="RegisterLabel"><b>Password</b></Form.Label>
               <Form.Control type="password" onChange={this.onChange} name="password"/>
               </Form.Group>
               <Button variant="primary" onClick={this.onRegister} className="RegisterButton">Register</Button>
               </Form>
               </div>
           </div> 
        )
    }
}

export default withRouter(Register)