import React, {useState} from 'react';
import signuppic from '../assets/team_graphic.png';
import {useHistory} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Navbar from './navbar';


const SignUp = () => {

    const history= useHistory();
  
  const roles = [
    'Farmer', 'Doctor'
  ];
 

  const [userdata,setData]= useState({
    fname: "",
    lname: "",
    phone: "",
    CNIC: "",
    DOB: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
    role:'',
    license:'',
    // licenseEnable: false,
  });


  let name ,value;

  const handleInputs = (e) =>{
     name= e.target.name;
     value= e.target.value;

     setData({
         ...userdata , 
         [name]:value
     })
  }

 

  const Handlerole = (value) => {
        
    setData({
         ...userdata,
         role:value,
    })
    // console.log(userdata.role);
    // setValue(value);    
    }


 const PostData = async (e) =>{
     e.preventDefault();
     const {fname,  lname, phone, CNIC, DOB, email,username, 
        password, cpassword, license,
        role } = userdata;

      const res = await fetch("/auth/register", {
          method:"POST", 
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            role:role.value,fname,  lname, phone, CNIC, DOB, email,username, 
            password, cpassword,licenseNo:license
          })
      });

       const data= await res.json();
        if(data.status === 422 || !data){
            window.alert('Invalid Registration');
            console.log('Invalid Registration');
        }
        else{
            window.alert('Registration Successfull');
            console.log('Registration Successfull');

            history.push("/Login")
        }
  }

  return (

     <>
      <Navbar />
        <div style={{ display:'flex' , flexDirection:'row', marginTop:"5%"}}>
            <div className='shadow p-3 ' style={{flex:1,backgroundColor:'#ffff', 
                                     height:650, borderColor:"red", marginBottom:30, 
                          marginLeft:20, marginRight:15, borderRadius:10}}>

                <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> SignUp </h3>
                <form method="POST">
                    <div className="form-group" style={{marginTop:30}}>
                        {/* Names */}
                        <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label  style={{ marginTop:5}}> <ion-icon name="person-outline" size='large' ></ion-icon>   </label>
                                  <input type="text" className="form-control" id="fname" aria-describedby="fname" 
                                       value={userdata.fname}  name='fname'
                                       onChange={handleInputs} 
                                      placeholder="First Name i.e; komal" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>
                              
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label  style={{ marginTop:5}}> <ion-icon name="person-outline" size='large' ></ion-icon>   </label>
                                  <input type="text" className="form-control" id="lname" aria-describedby="lname" 
                                      value={userdata.lname}    name='lname'
                                      onChange={handleInputs}   
                                      placeholder="Last Name i.e; Nida" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>
                        </div>

                        {/* Email , phone no */}
                        <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label  style={{ marginTop:5}}> <ion-icon name="call-outline" size='large' ></ion-icon>   </label>
                                  <input type="text" className="form-control" id="phone" aria-describedby="phone" 
                                      value={userdata.phone}   name='phone'
                                      onChange={handleInputs}
                                      placeholder="Phone No.i.e; 03456789567" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>
                              
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label style={{ marginTop:5}}> <ion-icon name="mail-outline" size='large' ></ion-icon>   </label>
                                  <input type="email" className="form-control" id="lemail" aria-describedby="lemail" 
                                     value={userdata.email}    name='email'
                                     onChange={handleInputs}
                                     placeholder="Email i.e; komalnida23@gmail.com" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>
                    
                          </div>

                        {/* CNIC , DOB */}
                        <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label  style={{ marginTop:5}}> <ion-icon name="card-outline" size='large' ></ion-icon>   </label>
                                  <input type="text" className="form-control" id="cnic" aria-describedby="cnic" 
                                      value={userdata.CNIC}   name='CNIC'
                                      onChange={handleInputs}
                                      placeholder="CNIC i.e; 3420345678567" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>
                              
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label  style={{ marginTop:5,  marginRight:10}}> <ion-icon name="calendar-number-outline" size='large'></ion-icon>  </label>
                                  <input type="text" className="form-control" id="dob" aria-describedby="dob" 
                                      value={userdata.DOB}   name='DOB'
                                      onChange={handleInputs}
                                      placeholder="Date of Birth i.e; 12-July-1998" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                  
                                  {/* <input type="email" class="form-control" id="lemail" aria-describedby="lemail" 
                                      placeholder="Enter Date of Birth" style={{marginTop:5, marginLeft:10,width:"70%"}} /> */}
                              </div>
                    
                          </div>

                          {/* password ,username */}
                        <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label for="lusername" style={{ marginTop:5}}> <ion-icon name="reader-outline" size='large' ></ion-icon>   </label>
                                  <input type="text" className="form-control" id="username" aria-describedby="username" 
                                      value={userdata.username}  name='username'
                                      onChange={handleInputs}
                                      placeholder="Usernamei.e; komal_nida12" tooltip='komal_nida12' style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>
                              
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label for="lpass" style={{ marginTop:5}}> <ion-icon name="lock-closed-outline" size='large' ></ion-icon>   </label>
                                  <input type="password" className="form-control" id="pass" aria-describedby="pass" 
                                     value={userdata.password}    name='password'
                                     onChange={handleInputs}
                                     placeholder="Password" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>
                         </div>

                           {/* Confirm password , role */}
                        <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                              
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label  style={{ marginTop:5}}> <ion-icon name="lock-closed-outline" size='large' ></ion-icon>   </label>
                                  <input type="password" className="form-control" id="cpass" aria-describedby="cpass" 
                                      value={userdata.cpassword}   name='cpassword'
                                      onChange={handleInputs}
                                      placeholder="Confirm Password" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                              </div>
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label style={{ marginTop:5,marginRight:13}}> <ion-icon name="school-outline" size='large' ></ion-icon>   </label>
                                  <Dropdown options={roles} className='dropdownStyle'   
                                    //    name='role'
                                    //    value={selectedValue} 
                                       value={userdata.role}
                                       placeholder="Select a Role" 
                                    //    onChange={handleInputs}
                                        onChange= {( (item) => Handlerole(item))}
                                       
                                       />
                                       {/* <input type="text" className="form-control" id="role" aria-describedby="role" 
                                    value={userdata.role}   name='role'
                                    onChange={handleInputs}
                                    placeholder="Farmer or Doctor" style={{marginTop:5, marginLeft:10,width:"35%"}} /> */}
                              </div>
                         </div>

                         {/* License No */}
                        <div style={{display:'flex', flexDirection:'row',marginLeft:20}}>
                              <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                  <label for="llicense" style={{ marginTop:5}}> <ion-icon name="id-card-outline" size='large' ></ion-icon>   </label>
                                  <input type="text" className="form-control" id="license" aria-describedby="license" 
                                    value={userdata.license}   name='license'
                                    onChange={handleInputs}
                                    placeholder="License No.i.e; Abc12" style={{marginTop:5, marginLeft:10,width:"35%"}} />
                                    
                              </div>
                          </div>
                          <p style={{marginLeft:67, color:'grey'}}>Only for doctors</p> 

                          <button type="submit" className="btn" name='signUp'
                              style={{marginLeft:'40%',width:'15%', height:50,backgroundColor:'#009387',fontSize:24, color:'white'}}
                               onClick={PostData}
                              > 
                              
                              Sign Up</button>
                
                    </div>
                
                  </form>

            </div>

            <div style={{flex:0.8, marginTop: "10%"}}>
                <img src={signuppic} alt="hello"  height="35%" width="35%"  
                style={{position:'absolute', marginLeft:'5%'}}  />
                
            </div>
  
        </div>

     </>
    
  );
}

export default SignUp;