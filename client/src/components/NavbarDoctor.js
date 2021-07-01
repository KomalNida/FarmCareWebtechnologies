import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/farmlogonew.png';
import user from '../assets/user (1).png';
import { useHistory } from 'react-router-dom';
const ls = require('local-storage');



const  NavbarDoctor = () => {

    const history= useHistory();
   

    const LogoutButton = () =>{
        ls.clear();
        history.push('/')
    }

    const Profilebutton = () =>{
       
        history.push('/DoctorProfile')
    }
   
    return(
        <>
            <nav className="navbar navbar-expand navbar-dark " style={{backgroundColor: "#0d4f02", paddingLeft: 20, height:70}} >
                    <img src={logo}
                         width="50" height="50" className="d-inline-block align-top" alt="" /> 

                    <NavLink className="navbar-brand" to="/FarmerDashboard" style={{paddingLeft: 20, fontSize:28}}> FarmCare</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span>
                    </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto"  style={{ fontSize:20}}>
                    <li className="nav-item "  >
                        <NavLink className="nav-link" to="/DoctorDashboard"> Home </NavLink>
                    </li>
                    <li className="nav-item" style={{ marginLeft: 10}}>
                        <NavLink className="nav-link" to="/DoctorAnimalMain"> Animal </NavLink>
                    </li>
                    <li className="nav-item" style={{ marginLeft: 10}}>
                        <NavLink className="nav-link" to="/PrescriptionMain"> Prescription </NavLink>
                    </li>
                   
                    </ul>
                   
                    <ul className="navbar-nav mr-auto" style={{ marginLeft:'50%'}}>
                        <li className="nav-item " >
                            <button type='button' className='btn' style={{color:'white',marginTop:10, fontSize:20}}
                             onClick={LogoutButton}
                            >
                                 Logout
                            </button>
                           
                        </li>

                        <li className="nav-item " style={{ marginLeft: 10}}>
                            
                            <button type='button' className='btn' style={{backgroundColor:'none'}}
                               onClick={Profilebutton}
                            >  
                            <img src={user}
                                width="50" height="50" className="d-inline-block align-top" alt="" /> 
                            </button>

                        </li>
            
                    </ul>
                </div>
            </nav>
          
        </>
    );
}
export default NavbarDoctor;