import NavbarFarmer from './navbarFarmer';
import React,{useState, useEffect} from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
const ls = require('local-storage');


const AddAnimalEvent = () => {

    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'))

    const [AnimalList , setAnimalList]= useState([]);
    const [doctor, setDoctor]= useState([]);
    const [doctorid, setDoctorid]= useState([]);
    const [animalid, setAnimalid]= useState([]);

  

    useEffect (() => {
        getData()
    },[]);

        async function getData(){
          await axios(`http://localhost:5000/animal/viewanimal`).then((res)=>{
            console.log(res.data);
            setAnimalList(res.data)
            
          })
          .catch((err)=>{
            console.log(err)
          })
          
        }

        useEffect (() => {
            getdoctor()
        },[]);
    
            async function getdoctor(){
              await axios(`http://localhost:5000/auth/user/Doctor`).then((res)=>{
                console.log(res.data);
                setDoctor(res.data)
                
              })
              .catch((err)=>{
                console.log(err)
              })
              
            }

      

    const [userdata,setData]= useState({
        event_name:'',
        event_type:'',
        disease_symptoms:'',
        diagnosed_disease:'',
        vaccine_Name:'',
        weighed_results:'',
        additional_notes:'',
        treatedBy:'',
        animalname:'CAT01',
       
      });

      console.log(AnimalList);
     
     
      const aname= userdata.animalname;
      console.log(aname);

      const filterID = AnimalList.filter(el=>(

          el.animal_name === aname 
      ))

      console.log("Filter ID: ",filterID.map((e)=>(e._id)));
     

      const splitNme =userdata.treatedBy.split(" ")
      console.log("split anme" , splitNme)

      const filterdocID = doctor.filter(el=>(
            el.fname=== splitNme[0] && el.lname === splitNme[1]
           
      ));
      
       console.log("Filter Doc ID: ",filterdocID.map((e)=>(e._id)));
 
     
      const events = [
        'Treated', 'Inseminated', 'Pregnant','Weighed','Aborted Pregnancy'
      ];
    
      const types = [
        'Individual', 'Mass'
      ];
     
    
      let name ,value;
    
      const handleInputs = (e) =>{
         name= e.target.name;
         value= e.target.value;
    
         setData({
             ...userdata , 
             [name]:value
         })
      }

    

        const Handleeventtype = (value) => {
        
            setData({
                 ...userdata,
                 event_type:value,
            })
            
            }

     const Handleeventname = (value) => {
        setData({
            ...userdata,
            event_name:value,
       })
       
       }
    
       const selectHandler = (event) =>{
        let selectedVal = event.target.value;
        setData({
            ...userdata, 
            animalname:selectedVal
        })
        console.log(selectedVal);
        }

        const selectHandlerDoctor = (event) =>{
            let val = event.target.value;
            setData({
                ...userdata, 
                treatedBy: val,
            })
            console.log(val);
        }


      const PostData = async (e) =>{
        e.preventDefault();
        const { event_name,event_type,disease_symptoms,diagnosed_disease,vaccine_Name,weighed_results
            ,additional_notes,treatedBy,animal_id } = userdata;
   
        const res = await fetch("/event/addevent", {
             method:"POST", 
             headers:{
               "Content-Type" : "application/json"
             },
             body: JSON.stringify({
                event_name:event_name.value ,    event_type:event_type.value,
                disease_symptoms,diagnosed_disease,vaccine_Name,weighed_results
                ,additional_notes,
                treatedBy: filterdocID.map((e)=>(e._id)),
                animal_id:filterID.map((e)=>(e._id))
             })
         });
   
          const data= await res.json();
           if(data.status === 201 || !data){
               window.alert('Invalid Data');
               
           }
           else{
               window.alert('Event Added Successfully');
            
               history.push("/ViewAnimalEvents")
           }
     };

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
                                                width:300, height:'600px', borderColor:"red", marginBottom:30, 
                                    marginLeft:20, marginRight:15, borderRadius:10}}>

                            <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> Add Event </h3>
                            <form method='POST' >

                                <div className="form-group" style={{marginTop:30}}>

                                    {/* Animal ID, Doctor ID */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Animal </label>
                                            <div  style={{marginTop:5, marginLeft:19,width:"150%",borderColor:'lightgrey'}}> 


                                                <select   
                                                      onChange={selectHandler}
                                                      value={userdata.animalname}
                                                  
                                                        style={{marginTop:0, marginLeft:19,width:"80%",borderColor:'lightgrey', height:"38px", borderRadius:3}} 
                                                        className='custome-select' 
                                                   >
                                                   { AnimalList.map((item) =>(
                                                        <option 
                                                            key={item.animal_name}
                                                        > {item.animal_name} </option>

                                                    ))}
                                                </select>

                                              
                                            </div>

                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label style={{ marginTop:5}}> Doctor Name  </label>

                                            <select 
                                                     onChange={selectHandlerDoctor}
                                                     value={userdata.treatedBy}
                                                     style={{marginTop:0, marginLeft:19,width:"80%",borderColor:'lightgrey', height:"38px", borderRadius:3}} 
                                                     className='custome-select'
                                                   >
                                                   { doctor.map((item) =>(
                                                        <option 
                                                            key={item.fname} 
                                                          
                                                           
                                                        >{item.fname} {item.lname} </option>

                                                    ))}
                                                </select>
                                        
                                        
                                        </div>
                                
                                    </div>

                                    {/* Event name, event type*/}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Event name </label>
                                            <div  style={{marginTop:5, marginLeft:5,width:"70%"}}> 
                                            <Dropdown options={events} 
                                             value={userdata.event_name} 
                                             onChange= {( (item) => Handleeventname(item))}
                                             placeholder="Select an option"  /></div>


                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Event Type   </label>
                                            <div  style={{marginTop:5, marginLeft:30,width:"70%"}}> 
                                               <Dropdown options={types}  
                                                value={userdata.event_type} 
                                                onChange= {( (item) => Handleeventtype(item))}
                                               placeholder="Select an option"  />
                                            </div>


                                            </div>
                                    </div>

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
                                        {/* Additional notes*/}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}>Additional Notes </label>
                                        
                                            <input type="text" className="form-control" id="notes" aria-describedby="notes" 
                                                value={userdata.additional_notes}    name='additional_notes'
                                                onChange={handleInputs}
                                            
                                               style={{marginTop:5, marginLeft:5,width:"83%", height:"200%"}} />
                                            

                                        </div>
                                        
                                
                                    </div>
                                

                                    <button type="submit" className="btn" name='signUp'
                                        style={{marginTop:'5%',marginLeft:'40%',width:'15%', height:50,backgroundColor:'#009387',fontSize:24, color:'white'}}
                                         onClick={PostData}
                                        > 
                                        
                                        Add</button>
                            
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

export default AddAnimalEvent;