import NavbarDoctor from './NavbarDoctor';
import React,{useState, useEffect} from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import 'react-dropdown/style.css';
import axios from 'axios';
const ls = require('local-storage');


const AddPrescription = () => {

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
        presc_description:'',
        presc_date:'',
        diagnosed_disease:'',
        medicineName:'', 
        treatedBy:'',
        animal_id:'' 
       
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

    //   const docid=filterdocID.map((e)=>(e._id))
    //   setDoctorid(docid);
      
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
            animal_id:selectedVal
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
        const { presc_description,presc_date,diagnosed_disease,medicineName, treatedBy,animal_id  } = userdata;
   
        const res = await fetch("/prescription/addprescription", {
             method:"POST", 
             headers:{
               "Content-Type" : "application/json"
             },
             body: JSON.stringify({
                presc_description,presc_date,diagnosed_disease,medicineName, treatedBy,animal_id 
             })
         });
   
          const data= await res.json();
           if(data.status === 201 || !data){
               window.alert('Invalid Data');
               
           }
           else{
               window.alert('Prescription Added Successfully');
            
               history.push("/PrescriptionMain")
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
          role !== "Farmer"
        ) {
          if (role === "Doctor") {
            return (
                <>
                    <NavbarDoctor />     
                    <NavLink to="/PrescriptionMain" > <ion-icon name="arrow-back-outline" size='large' style={{margin:'2%' , color:'black'}}></ion-icon></NavLink>
                
   
                <div style={{ display:'flex' , flexDirection:'row', marginLeft:"15%", marginRight:"15%", marginTop:'2%' }}>
                        <div className='shadow p-3 ' style={{flex:1,backgroundColor:'#ffff', 
                                                width:300, height:'500px', borderColor:"red", marginBottom:30, 
                                    marginLeft:20, marginRight:15, borderRadius:10}}>

                            <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> Add Prescription </h3>
                            <form method='POST' >

                                <div className="form-group" style={{marginTop:30}}>

                                    {/* Animal ID, Doctor ID */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Animal </label>
                                            <div  style={{marginTop:5, marginLeft:19,width:"150%",borderColor:'lightgrey'}}> 


                                                <select   
                                                      onChange={selectHandler}
                                                      value={userdata.animal_id}
                                                  
                                                        style={{marginTop:0, marginLeft:47,width:"78%",borderColor:'lightgrey', height:"38px", borderRadius:3}} 
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
                                                     style={{marginTop:0, marginLeft:"5%",width:"70%",borderColor:'lightgrey', height:"38px", borderRadius:3}} 
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

                                 

                                    {/* Disease, Medicine */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Disease </label>
                                            <input type="text" className="form-control" id="symptoms" aria-describedby="symptoms" 
                                                value={userdata.diagnosed_disease}    name='diagnosed_disease'
                                                onChange={handleInputs}
                                                placeholder="" style={{marginTop:5, marginLeft:"13%",width:"67%"}} />
                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label style={{ marginTop:5}}> Medicine  </label>
                                            
                                            <input type="text" className="form-control" id="disease" aria-describedby="disease" 
                                                value={userdata.medicineName}    name='medicineName'
                                                onChange={handleInputs}
                                            
                                                placeholder="" style={{marginTop:5, marginLeft:53,width:"70%"}} />
                                        </div>
                                
                                    </div>
                                        {/* Vaccine name, weighed result*/}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Description </label>
                                        
                                            <input type="text" className="form-control" id="vaccine" aria-describedby="vaccine" 
                                                value={userdata.presc_description}    name='presc_description'
                                                onChange={handleInputs}
                                            
                                                placeholder="" style={{marginTop:5, marginLeft:37,width:"67%"}} />
                                            

                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label  style={{ marginTop:5}}> Date   </label>
                                            
                                            <input type="text" className="form-control" id="weighed" aria-describedby="weighed" 
                                               value={userdata.presc_date}    name='presc_date'
                                               onChange={handleInputs}
                                            
                                                placeholder="" style={{marginTop:5, marginLeft:80,width:"70%"}} />
                                            


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

export default AddPrescription;