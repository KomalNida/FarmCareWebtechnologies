import React,{useState, useEffect} from 'react';
import {NavLink,useHistory, useLocation} from 'react-router-dom';
import 'react-dropdown/style.css';
import NavbarFarmer from './navbarFarmer';
import axios from 'axios';
const ls = require('local-storage');




const AnimalEdit = () => {

  
    const history= useHistory();

    const [id,setid]= useState(ls.get('id'));
    const [role,setrole]= useState(ls.get('role'))
    const [token,setToken] = useState(ls.get('token'))

    let location = useLocation();
  
     const animalid= location.state._id;
     const animalstatus= location.state.animal_status;
     console.log(animalid,"     ",animalstatus);

    const [userdata,setData]= useState({
       
        animal_height:location.state.animal_height,
        animal_weight: location.state.animal_weight,
        animal_stage: location.state.animal_stage,
        animal_status: location.state.animal_status,
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


          const PostData = async (e) =>{
            e.preventDefault();
            const {animal_weight, anial_height, animal_stage, animal_status} = userdata;
       
             const res = await fetch(`animal/updateanimal/${animalid}`, {
                 method:"PUT", 
                 headers:{
                   "Content-Type" : "application/json"
                 },
                 body: JSON.stringify({
                  animal_weight, anial_height, animal_stage, animal_status
                 })
             });
       
              const data= await res.json();
               if(data.status === 422 || !data){
                   window.alert('Invalid Registration');
                  
               }
               else{
                   window.alert('Successfully updated');
                   setData({
                    animal_weight: '',
                      animal_height: '',
                       animal_status: '',
                       animal_stage: ''
                   });
       
                  //  history.push("/AnimalEdit")
               }
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
            <NavLink to="/AnimalMain" > <ion-icon name="arrow-back-outline" size='large' style={{margin:'2%' , color:'black'}}></ion-icon></NavLink>

        
            <div style={{ display:'flex' , flexDirection:'row', marginLeft:"15%", marginRight:"15%", marginTop:'2%' }}>
                    <div className='shadow p-3 ' style={{flex:1,backgroundColor:'#ffff', 
                                            width:300, height:400, borderColor:"red", marginBottom:30, 
                                marginLeft:20, marginRight:15, borderRadius:10}}>

                        <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> Edit Animal </h3>
                        <form >
                            <div className="form-group" style={{marginTop:30}}>
                                {/* Animal weight, stage*/}
                                <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                    <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                        <label  style={{ marginTop:5}}> Weight </label>
                                        <input type="text" className="form-control" id="weight" aria-describedby="weight" 
                                            name='animal_weight'
                                            value={userdata.animal_weight}  
                                            onChange={handleInputs}  
                                            placeholder="180kg" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                    </div>
                                    
                                    <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                        <label  style={{ marginTop:5}}> Stage   </label>
                                        <input type="text" className="form-control" id="stage" aria-describedby="stage" 
                                             name='animal_stage'
                                             value={userdata.animal_stage}  
                                             onChange={handleInputs}  
                                            placeholder="child" style={{marginTop:5, marginLeft:17,width:"70%"}} />
                                    </div>
                                </div>

                                {/* Status, Height */}
                                <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                    <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                        <label  style={{ marginTop:5}}> Status </label>
                                        <input type="text" className="form-control" id="status" aria-describedby="status" 
                                             name='animal_status' 
                                              value={userdata.animal_status}  
                                             onChange={handleInputs}  
                                            placeholder="Status" style={{marginTop:5, marginLeft:17,width:"70%"}} />
                                    </div>
                                    
                                    <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                        <label style={{ marginTop:5}}> Height  </label>
                                        <input type="text" className="form-control" id="height" aria-describedby="height" 
                                            name='animal_height'
                                            value={userdata.animal_height}  
                                            onChange={handleInputs}  
                                            placeholder="6 feet" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                    </div>
                            
                                </div>

                            

                                <button type="submit" className="btn" name='signUp'
                                    style={{marginTop:'5%',marginLeft:'40%',width:'15%', height:50,backgroundColor:'#009387',fontSize:24, color:'white'}}
                                    onClick={PostData}
                                    > 
                                    
                                    Save</button>
                        
                            </div>
                        
                        </form>

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

  return (


    <>
          {loggedIn()}
     
     </>
    
  );
}

export default AnimalEdit;