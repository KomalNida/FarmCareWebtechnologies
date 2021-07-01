
import NavbarFarmer from './navbarFarmer';
import React,{ useState, useEffect} from 'react';
import signuppic from '../assets/team_graphic.png';
import "react-datepicker/dist/react-datepicker.css";
import {NavLink, useHistory} from 'react-router-dom';
import 'react-dropdown/style.css';
import axios from 'axios';
import Moment from 'react-moment';


const ls = require('local-storage');


const Profile = () => {

    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'))

    const iid= ls.get('id');
    console.log("Id is: ", iid);

 

    const [Farmer, setFarmer]= useState([]);
  


        useEffect (() => {
            getData()
        },[]);
    
            async function getData(){
              await axios(`http://localhost:5000/farmer/profile/${iid}`).then((res)=>{
                console.log(res.data);
                setFarmer(res.data)
                
              })
              .catch((err)=>{
                console.log(err)
              })
              
            }
   



 const loggedIn = () => {
    if (
      id !== null ||
      token !== null ||
      id !== undefined ||
      token !== undefined ||
      role !== null ||
      role !== undefined ||
      role !== "Doctor"
    ) {
      if (role === "Farmer") {
        return (
            <>
                <NavbarFarmer />
               

                  

                 
                    <div  style={{ display:'flex' , flexDirection:'row', marginTop:"5%", marginLeft:'15%'}}>
                        <div className='shadow p-3 ' style={{flex:0.8,marginLeft:'5%' ,backgroundColor:'#ffff', 
                                                height:480, borderColor:"red", marginBottom:30, 
                                   marginRight:15, borderRadius:10}}>

                            <h3 style={{ marginLeft:"40%", fontWeight:'bold', marginBottom:30}}> Profile </h3>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img src={signuppic} alt="" height='80%' width='80%'  />

                                </div>
                            {Farmer.map((row) => (
                                <div className='col-md-5'>
                                    <h5 >{row.fname} {row.lname}  </h5>
                                    <h6 style={{marginBottom:20}}> Username: {row.username} </h6>
                                    <h6 style={{color:'blueviolet', marginBottom:20}}> {row.role} </h6>
                                    
                                    <ul className="nav nav-tabs" role='tablist'>
                                            <li className="nav-item" >
                                                <NavLink className='nav-link active'  id="home-tab" data-toggle='tab' role="tab" to="#home">About</NavLink>
                                            </li>
                                            
                                    </ul>

                                </div>
                            ))} 
                               

                            </div>
                            <div className='row'>
                                {/* left side */}
                                <div className='col-md-4 worklink' >
                                    <p >  </p>

                                </div>
                                {Farmer.map((row) => (
                                <div className='col-md-8 row worklink'>
                                    <div className='col-sm-4 worklink' >
                                        <p style={{color:'black', fontWeight:'bold'}}> Phone No </p>
                                        <p style={{color:'black', fontWeight:'bold'}}> CNIC</p>
                                        <p style={{color:'black', fontWeight:'bold'}}> DOB</p>
                                        <p style={{color:'black', fontWeight:'bold'}}> Email</p>
                                       
                                    </div>

                                    <div className='col-sm-4'>
                                        <p> {row.phone} </p>
                                        <p > {row.CNIC}</p>
                                        <p > <Moment format='DD/MM/YYYY' >
                                                        {row.DOB}
                                                    </Moment></p>
                                        <p > {row.email}</p>
                                        
                                    </div>
                        
                                </div>

                            ))} 

                            </div>
                        
                        </div>
        
                </div>
           
           
           </>
  )
}
else {
    return (
      <>

            { window.alert('You need to be signed in as a Farmer')}
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

export default Profile;