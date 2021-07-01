import NavbarFarmer from './navbarFarmer';
import React,{useState, useEffect} from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
const ls = require('local-storage');


const AddMilkRecord = () => {

    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'))

    const [MilkList , setMilkList]= useState([]);
    

    useEffect (() => {
        getData()
    },[]);

        async function getData(){
          await axios(`http://localhost:5000/animal/viewanimal`).then((res)=>{
            console.log(res.data);
            setMilkList(res.data)
            
          })
          .catch((err)=>{
            console.log(err)
          })
          
        }

      

    const [userdata,setData]= useState({
        milkrecord_type:'', 
        milking_date:'',
        totalMilkProduced:'' ,
        totalMilkConsumed:'',
        noOfCattleMilked:'',
        CattleMilked: ''
       
      });


      console.log("Cattle: ",userdata.CattleMilked);

    

    
      const types = [
        'Individual', 'Bulk'
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



     const Handleeventname = (value) => {
        setData({
            ...userdata,
            milkrecord_type:value,
       })
       
       }


        const selectHandlerDoctor = (event) =>{
            let val = event.target.value;
            setData({
                ...userdata, 
                CattleMilked: val,
            })
            console.log(val);
        }


      const PostData = async (e) =>{
        e.preventDefault();
        const { milkrecord_type, milking_date,totalMilkProduced ,totalMilkConsumed, noOfCattleMilked, CattleMilked} = userdata;
   
        const res = await fetch("/farmer/Addmilkrecord", {
             method:"POST", 
             headers:{
               "Content-Type" : "application/json"
             },
             body: JSON.stringify({
                milkrecord_type:milkrecord_type.value, milking_date,totalMilkProduced ,totalMilkConsumed,noOfCattleMilked,CattleMilked
             })
         });
   
          const data= await res.json();
           if(data.status === 201 || !data){
               window.alert('Invalid Data');
               
           }
           else{
               window.alert('Milk Record added Successfully');
            
               history.push("/MilkRecordMain")
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
                    <NavLink to="/MilkRecordMain" > <ion-icon name="arrow-back-outline" size='large' style={{margin:'2%' , color:'black'}}></ion-icon></NavLink>
                
   
                <div style={{ display:'flex' , flexDirection:'row',flex:1 ,marginLeft:"15%", marginRight:"15%", marginTop:'2%' }}>
                        <div className='shadow p-3 ' style={{flex:1,backgroundColor:'#ffff', 
                                                width:"600px", height:'430px', borderColor:"red", marginBottom:30, 
                                    marginLeft:10, marginRight:15, borderRadius:10}}>

                            <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> Add Milk Record </h3>
                            <form method='POST' >

                                <div className="form-group" style={{marginTop:30}}>

                                    {/* Animal ID, Doctor ID */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                           
                                            <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                          
                                            <div  style={{ marginLeft:"10%",width:"70%"}}> 
                                                    <Dropdown options={types} 
                                                    value={userdata.event_name} 
                                                    onChange= {( (item) => Handleeventname(item))}
                                                    placeholder="Select Milk type"  />
                                                </div>
                                               
                                            </div>
                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            <label style={{ marginTop:5}}> Animal Milked  </label>

                                            <select  placeholder="Animal Milked"
                                                     onChange={selectHandlerDoctor}
                                                     value={userdata.CattleMilked}
                                                     style={{marginTop:0, marginLeft:19,width:"65%",borderColor:'lightgrey', height:"38px", borderRadius:3}} 
                                                     className='custome-select'
                                                   >
                                                   { MilkList.map((item) =>(
                                                        <option 
                                                            key={item.animal_name} 
                                                          
                                                           
                                                        >{item.animal_name}  </option>

                                                    ))}
                                                </select>
                                        
                                        
                                        </div>
                                
                                    </div>

                                   

                                    {/* Disease, Medicine */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                          
                                            <input type="text" className="form-control" id="symptoms" aria-describedby="symptoms" 
                                                value={userdata.milking_date}    name='milking_date'
                                                onChange={handleInputs}
                                                placeholder="Milking Date" style={{marginTop:5, marginLeft:"10%",width:"70%"}} />
                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                           
                                            
                                            <input type="text" className="form-control" id="disease" aria-describedby="disease" 
                                                value={userdata.totalMilkProduced}    name='totalMilkProduced'
                                                onChange={handleInputs}
                                            
                                                placeholder="Total Milk Produced" style={{marginTop:5, marginLeft:"25%",width:"65%"}} />
                                        </div>
                                
                                    </div>
                                        {/* Vaccine name, weighed result*/}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                           
                                        
                                            <input type="text" className="form-control" id="vaccine" aria-describedby="vaccine" 
                                                value={userdata.totalMilkConsumed}    name='totalMilkConsumed'
                                                onChange={handleInputs}
                                            
                                                placeholder="Total Milk Consumed" style={{marginTop:5, marginLeft:"10%",width:"70%"}} />
                                            

                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                          
                                            
                                            <input type="text" className="form-control" id="weighed" aria-describedby="weighed" 
                                               value={userdata.noOfCattleMilked}    name='noOfCattleMilked'
                                               onChange={handleInputs}
                                            
                                                placeholder="No of Cattle milked" style={{marginTop:5, marginLeft:"25%",width:"65%"}} />
                                            


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

export default AddMilkRecord;