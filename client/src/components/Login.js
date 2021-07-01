import React,{useState} from 'react';
import signuppic from '../assets/team_graphic.png';
import "react-datepicker/dist/react-datepicker.css";
import {NavLink,useHistory} from 'react-router-dom';
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Navbar from './navbar';
const ls = require('local-storage')
const requests = require('../axios/request');

const Login = () => {

   const history= useHistory();
//   const professions = [
//     'Farmer', 'Doctor'
//   ];
 

  const [email,setemail]= useState('');
  const [password,setpassword]= useState('');
  const [profession,setprofession]= useState('');

    // const Handleprofession = (value) => {
        
    //     setprofession({
    //      ...profession,
    //      profession:value,
    // })

    // }

 const loginUser = async() => {
    try {
        console.log("in login user axios ")
        let results = await requests.userLogin(
            email , password, profession
        )
        ls.set("id", results.data.user._id)
        ls.set('token',results.data.token)
        ls.set('role',results.data.user.role)
        console.log("results from axios ",results);
        if(ls.get('role') === 'Farmer') {
            history.push('/FarmerDashboard');
        }
        else if(ls.get('role') === 'Doctor') {
            history.push('/DoctorDashboard');
        }
        
    }
    catch(error){
        console.log(error)
    }
}



  return (

     <> 
         <Navbar />
        <div style={{ display:'flex' , flexDirection:'row', marginTop:"5%", marginLeft:'5%'}}>
            <div className='shadow p-3 ' style={{flex:0.5,marginLeft:'20%' ,backgroundColor:'#ffff', 
                                     height:480, borderColor:"red", marginBottom:30, 
                        marginRight:15, borderRadius:10}}>

                <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> Sign In </h3>
                <form method="POST">
                    <div className="form-group" style={{marginTop:30}}>
                       
                        <div style={{display:'flex', flexDirection:'column',marginLeft:20, marginBottom:30}}>
                             
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label  style={{ marginTop:5}}> <ion-icon name="mail-outline" size='large' ></ion-icon>   </label>
                                  <input type="text" name='email' className="form-control" id="phone" aria-describedby="phone" 
                                       value={email} onChange={(e) => setemail(e.target.value)}
                                      placeholder="Email i.e; komalnids453@gmail.com" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>

                              <div style={{display:'flex', flexDirection:'row',flex:1, marginTop:20}}>
                                  <label  style={{ marginTop:5}}> <ion-icon name="lock-closed-outline" size='large' ></ion-icon>   </label>
                                  <input type="password" name="password" className="form-control" id="pass" aria-describedby="pass" 
                                      value={password} onChange={(e) => setpassword(e.target.value)}
                                     placeholder="Password" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>

                              <div style={{display:'flex', flexDirection:'row', marginTop:20, marginBottom:70}}>
                                  <label  style={{ marginTop:5,marginRight:13}}> <ion-icon name="school-outline" size='large' ></ion-icon>   </label>
                                 
                                  {/* <Dropdown options={professions} className='dropdownStyleLogin'
                                       value={profession} 
                                       placeholder="Select a profession" 
                                     
                                       onChange= {( (item) => Handleprofession(item))}
                                       
                                       /> */}

                                    <input type="text" name="profession" className="form-control" id="pass" aria-describedby="pass" 
                                      value={profession} onChange={(e) => setprofession(e.target.value)}
                                     placeholder="Farmer" style={{marginTop:5, marginLeft:0,width:"70%"}} />
                                     
                              </div>
                          </div>

                       
                         <button type="button" className="btn" 
                              style={{marginLeft:'40%',width:'20%', height:50,backgroundColor:'#009387',fontSize:24, color:'white'}}
                               onClick= {loginUser}
                          
                              > Login</button>
                             
                              
                           

                          <h4 style={{fontSize:16, marginLeft:'35%', marginTop:15}}>New User? <NavLink to='/SignUp'> Sign Up</NavLink> </h4>    
                
                    </div>
                
                  </form>

            </div>


            <div style={{flex:0.8, marginTop: "5%"}}>
                <img src={signuppic} alt="hello"  height="30%" width="30%"  
                style={{position:'absolute', marginLeft:'10%'}}  />
                
            </div>
  
        </div>

     </>
    
  );
}

export default Login;