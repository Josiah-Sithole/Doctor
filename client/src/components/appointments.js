//default React Library
import React, {Component} from 'react';

//Bootstrap  and custom css 
import 'bootstrap/dist/css/bootstrap.min.css';
import './appointments.css';

//images and react-bootstrap 
import appointmentImage from '../images/appointmentPage.jpg';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';

//Promise based HTTP client for the browser and node.js
//Cookies is a node.js module for getting and setting HTTP(S) cookies.
import axios from 'axios';
import cookies from 'js-cookie';

//the concept of state and lifecycle in a React component
//https://reactjs.org/docs/state-and-lifecycle.html
class Appointments extends Component{
    constructor(props){
        super(props)

        this.state={
            user:[],
            cookie:'',
            appointments:[]
        }
    }

    componentDidMount = async () => {
        //Fetch user object and cookie from storage
        const user = JSON.parse(window.localStorage.getItem('user'))
        const token = cookies.get('token')

        await this.setState({
            user: user
        })

        await this.setState({
            cookie: token
        })

        //Function for fetching appointments from the database and setting the appointments state
        //https://www.npmjs.com/package/axios
        await axios({
            method: 'GET',
            url: '/appointments/fetch',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response)
            this.setState({
                appointments: response.data
            })
        })
        .catch((err)=>console.log(err))
    }

    render(){
        //the appointments array in state
        const appointments = this.state.appointments
        
        //Function for making the delete request when the delete button is clicked
        const onDelete = (_id) => {
            //Sent the id of the appointment in params 
            axios.delete(`/appointments/${_id}`)
            .then((res)=>alert(res.data))
            .catch((err)=>alert('Sorry, appointment could not be deleted'))

            window.location.reload();
        }
        //Mapped through appointments and displayed them in a table
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
        const displayAppointments = appointments.map((appointment) => {
            return <tr>
                <td>{appointment.name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.duration}</td>
                <td>{appointment.date}</td>
                <td>{appointment.day}</td>
                <td><Button variant="danger" onClick={onDelete.bind(this, appointment._id)} className="DeleteButton"><b>X</b></Button></td>
                </tr>
        })

        return(
           <div className="content-wrapper">
               <img src={appointmentImage} alt="background"/>
               <div className="text-wrapper">
               <Nav className="AppointmentsNav">
               <Nav.Link href="/add appointments" className="AppointmentsNavLink"><b>Add New Appointment</b></Nav.Link>
               </Nav>
                <h1 className="AppointmentsHeading">Your appointment book</h1>
                <br/>
                <h5 className="AppointmentsSubheading">Update Appointments<Nav><Nav.Link href="/update" className="AppointmentsSubLink">click here</Nav.Link></Nav></h5>
                <Table className="AppointmentsTable">
                <thead className="AppointmentsTableHead">
                <tr>
                <th>Name of patient</th>
                <th>Reason</th>
                <th>Length</th>
                <th>Date of appointment</th>
                <th>Day of appointment</th>
                <th className="TableRemove">Delete</th>
                </tr>
                </thead>
                <tbody>
                {displayAppointments}
                </tbody>
                </Table>
                <br/>
               </div>
           </div> 
        )
    }
}

export default Appointments

