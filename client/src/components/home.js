//Default React Library
import React, {Component} from 'react';

//Bootstrap  and custom css 
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
//image  and react-bootstrap
import home from '../images/homeImage.jpg';
import Button from 'react-bootstrap/Button';

//React Home component 
class Home extends Component{
    constructor(props){
        super(props)
    }
    //This is the home page component
    //Home page rendered 
    render(){
        return(
           <div className="content-wrapper">
               <img src={home} alt="background"/>
               <div className="text-wrapper">
                   <a href="/login"><Button className="HomeLoginButton"><b>Log in</b></Button></a>
                   <h1 className="HomeHeading">{`Welcome: Register or Login to see the Doctor !!!`}</h1>
                   <br/>
                   <a href="/register"><Button className="HomeButton"><b>Register</b></Button></a>
               </div>
           </div> 
        )
    }
}

export default Home;
