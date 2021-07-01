import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/farmlogonew.png';



const  navbar = () => {
    return(
        <>
            <nav className="navbar navbar-expand navbar-dark " style={{backgroundColor: "#0d4f02", paddingLeft: 20, height:70}} >
                    <img src={logo}
                         width="50" height="50" class="d-inline-block align-top" alt="" /> 

                    <NavLink className="navbar-brand" to="#" style={{paddingLeft: 20, fontSize:28}}> FarmCare</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span>
                    </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto"  style={{ fontSize:20}}>
                    <li className="nav-item "  >
                        <NavLink className="nav-link" to="/">Home </NavLink>
                    </li>
                    <li className="nav-item" style={{ marginLeft: 10}}>
                        <NavLink className="nav-link" to="/about"> About </NavLink>
                    </li>
                    <li className="nav-item" style={{ marginLeft: 10}}>
                        <NavLink className="nav-link" to="/contact"> Contact Us </NavLink>
                    </li>
                    </ul>
                   
                    <ul className="navbar-nav mr-auto" style={{ marginLeft:'60%', fontSize:20}}>
                        <li className="nav-item " >
                            <NavLink className="nav-link" to="/Login"> Sign In </NavLink>
                        </li>
                        <li className="nav-item " style={{ marginLeft: 10}}>
                            <NavLink className="nav-link" to="/SignUp"> Sign Up </NavLink>
                        </li>
            
                    </ul>
                </div>
            </nav>
          
        </>
    );
}
export default navbar;