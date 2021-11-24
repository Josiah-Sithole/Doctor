//React Library 
import React, {Component} from 'react';

//Boostrap and custom css 
import 'bootstrap/dist/css/bootstrap.min.css';
import './addAppointments.css';

//images and react-bootstrap library
import add from '../images/addImage.jpg';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Promise based HTTP client for the browser and node.js
//Cookies is a node.js module for getting and setting HTTP(S) cookies.
import axios from 'axios';
import cookies from 'js-cookie';

//React component 
//https://reactjs.org/docs/react-component.html
class Add extends Component{
    constructor(props){
        super(props)
        //below are all the states I used for this component
        this.state={
            name:'',
            reason:'',
            duration:'',
            date:'',
            day:'',
            _id:[],
            cookie:''
        }

        this.onChange = this.onChange.bind(this)
        this.onAdd = this.onAdd.bind(this)
    }

    //When the user adds values to the input fields
    onChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAdd = () => {
        //Values from state
        //destructuring in javaScript
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        const {name, reason, duration, date, day, _id} = this.state

        axios.post('/appointments/add', {name, reason, duration, date, day, _id})//Making a post request to add appointments
        .then((res) => alert(res.data.Message))
        .catch((err) => alert('Sorry, an error occured when adding your new appointment'))
    }

    //Fetching the data from storage when the component mounts and setting the states of the user id and cookie
    //https://reactjs.org/docs/react-component.html
    componentDidMount = async() => {
        const user = JSON.parse(window.localStorage.getItem('user'))
        const token = cookies.get('token')

        await this.setState({
            _id: user
        })

        await this.setState({
            cookie: token
        })
    }

    render(){
        return(
           <div className="content-wrapper">
               <img src={add} alt="background"/>
               <div className="text-wrapper">
               <Nav className="AddNav">
               <Nav.Link href="/appointments" className="AddNavLink"><b>Appointment Book</b></Nav.Link>
               </Nav>
                <h1 className="AddHeading">Add your appointments here</h1>
               <Form className="AddForm">
               <Form.Group>
               <Form.Label className="AddLabel"><b>Name of patient</b></Form.Label>
               <Form.Control type="text" name="name" onChange={this.onChange} placeholder="James Smith"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="AddLabel"><b>Reason for appointment</b></Form.Label>
               <Form.Control type="text" name="reason" onChange={this.onChange} placeholder="Flu symptoms eg. runny nose"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="AddLabel"><b>Length of appointment</b></Form.Label>
               <Form.Control type="text" name="duration" onChange={this.onChange} placeholder="10:30 a.m. - 11:30 a.m."/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="AddLabel"><b>Date of appointment</b></Form.Label>
               <Form.Control type="text" name="date" onChange={this.onChange} placeholder="5 Feb 2021"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="AddLabel"><b>Day of appointment</b></Form.Label>
               <Form.Control type="text" name="day" onChange={this.onChange} placeholder="Friday"/>
               </Form.Group>
               <Button variant="danger" onClick={this.onAdd} className="AddButton">Add Appointment</Button>
               </Form>
               </div>
           </div> 
        )
    }
}

export default Add

