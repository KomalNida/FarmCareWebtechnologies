import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {  Card } from 'react-bootstrap';
import bg from '../assets/cow1.jpg';
import bg1 from '../assets/cattle.jpg';

import {useHistory} from 'react-router-dom';

import NavbarDoctor from './NavbarDoctor';
const ls = require('local-storage')

const DoctorDashboard = () => {

    const history= useHistory();
    const [id,setid]= useState(ls.get('id'));
    const [role,setrole]= useState(ls.get('role'))
    const [token,setToken] = useState(ls.get('token'))

    const animal = () =>{
        history.push('/DoctorAnimalMain')
    }

    const event = () =>{
        history.push('/PrescriptionMain')  
    }

   
    
   const loggedIn = () => {
        if (
          id !== null ||
          token !== null ||
          id !== undefined ||
          token !== undefined ||
          role !== null ||
          role !== undefined ||
          role !== "Farmer"
        ) {
          if (role === "Doctor") {
            return (
                <>
                <NavbarDoctor />
            
                <div style={{ display: 'flex', flexDirection: 'row',alignItems: 'center', marginLeft:'150px', marginRight:'150px'
                    , marginBottom:'90px', marginTop:'30px' }}>
    
                    <Card style={{ width: '25%' , marginRight:'20px',  marginLeft:'20%'}}>
                        <Card.Title style={{marginLeft:"35%", paddingTop:10,paddingBottom:10}} >Animal</Card.Title>
                        <Card.Img variant="top" src={bg} style={{width:'100%' ,
                        height: '10vw'}} />
                            <Card.Body>
                    
                                <Card.Text> Animal Menu to view the record of of the animals. </Card.Text>
                                <button className='btn' style={{ width: '8rem', marginLeft:60, backgroundColor:'#009387',color:"white" }} 
                                        onClick={animal}>Explore</button>
                            </Card.Body>
                    </Card>
                    <Card style={{ width: '25%' , marginRight:'20px',  marginLeft:'40px'}}>
                        <Card.Title style={{marginLeft:"35%", paddingTop:10,paddingBottom:10}} >Prescription</Card.Title>
                        <Card.Img variant="top" src={bg} style={{width:'100%' ,
                        height: '10vw'}} />
                            <Card.Body>
                    
                                <Card.Text> Prescription menu to add the prescription of the animal</Card.Text>
                                <button className='btn' style={{ width: '8rem', marginLeft:60, backgroundColor:'#009387',color:"white" }} 
                                        onClick={event}>Explore</button>
                            </Card.Body>
                    </Card>
    
                
                </div> 
        </>
      )
    }
    else {
        return (
          <>

                { window.alert(' You need to be signed in as a Doctor')} 
                { history.push("./Login")}
            
          </>
        );
      }
  }
  
 }
 
    return(
        <>
          {loggedIn()}
           </>
    );
} 
export default DoctorDashboard;