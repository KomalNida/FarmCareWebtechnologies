import React,{useState, useEffect} from 'react';
import {NavLink,useHistory, useLocation} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import NavbarFarmer from './navbarFarmer';
import axios from 'axios';
const ls = require('local-storage');




const EditAnimalEvent = () => {

  

    const history= useHistory();

    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'))

    let location = useLocation();
  
     const eventid= location.state._id;
     const animalstatus= location.state.disease_symptoms;
     console.log(eventid,"     ",animalstatus);
     console.log(location.state.diagnosed_disease,"     ",location.state.weighed_results);

    const [userdata,setData]= useState({
       
        disease_symptoms:location.state.disease_symptoms,   
        diagnosed_disease:location.state.diagnosed_disease,
        vaccine_Name:location.state.vaccine_Name,
        weighed_results:location.state.weighed_results,
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
            const {disease_symptoms,diagnosed_disease,vaccine_Name,weighed_results} = userdata;
       
             const res = await fetch(`event/updateevent/${eventid}`, {
                 method:"PUT", 
                 headers:{
                   "Content-Type" : "application/json"
                 },
                 body: JSON.stringify({
                    disease_symptoms,diagnosed_disease,vaccine_Name,weighed_results
                 })
             });
       
              const data= await res.json();
               if(data.status === 422 || !data){
                   window.alert('Invalid Registration');
                  
               }
               else{
                   window.alert('Successfully updated');
                   setData({
                   disease_symptoms:'',diagnosed_disease:'',vaccine_Name:'',weighed_results:''
                      
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
            <NavLink to="/ViewAnimalEvents" > <ion-icon name="arrow-back-outline" size='large' style={{margin:'2%' , color:'black'}}></ion-icon></NavLink>

                <div style={{ display:'flex' , flexDirection:'row', marginLeft:"15%", marginRight:"15%", marginTop:'2%' }}>
                        <div className='shadow p-3 ' style={{flex:1,backgroundColor:'#ffff', 
                                                width:300, height:'400px', borderColor:"red", marginBottom:30, 
                                    marginLeft:20, marginRight:15, borderRadius:10}}>

                            <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> Edit Animal Event </h3>
                            <form >

                                <div className="form-group" style={{marginTop:30}}>

                                

                                

                                    {/* Disease, Medicine */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Symptoms </label>
                                            <input type="text" className="form-control" id="symptoms" aria-describedby="symptoms" 
                                              
                                                value={userdata.disease_symptoms}    name='disease_symptoms'
                                                onChange={handleInputs}
                                                placeholder="" style={{marginTop:5, marginLeft:15,width:"70%"}} />
                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label style={{ marginTop:5}}> Disease  </label>
                                            
                                            <input type="text" className="form-control" id="disease" aria-describedby="disease" 
                                                value={userdata.diagnosed_disease}    name='diagnosed_disease'
                                                onChange={handleInputs}
                                            
                                                placeholder="" style={{marginTop:5, marginLeft:53,width:"70%"}} />
                                        </div>
                                
                                    </div>
                                        {/* Vaccine name, weighed result*/}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Vaccine </label>
                                        
                                            <input type="text" className="form-control" id="vaccine" aria-describedby="vaccine" 
                                                 value={userdata.vaccine_Name}    name='vaccine_Name'
                                                 onChange={handleInputs}
                                                placeholder="" style={{marginTop:5, marginLeft:37,width:"70%"}} />
                                            

                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Weighed   </label>
                                            
                                            <input type="text" className="form-control" id="weighed" aria-describedby="weighed" 
                                               value={userdata.weighed_results}    name='weighed_results'
                                               onChange={handleInputs}
                                                placeholder="" style={{marginTop:5, marginLeft:45,width:"70%"}} />
                                            


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

                { window.alert('You need to be signed in as NavLink Farmer')}
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

export default EditAnimalEvent;