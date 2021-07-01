import NavbarFarmer from './navbarFarmer';
import React,{useState, useEffect} from 'react';
import {NavLink,useHistory,useLocation} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import bg from '../assets/cow1.jpg';
const ls = require('local-storage');


const EditMilkRecord = () => {

    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'))

    const [MilkList , setMilkList]= useState([]);
   
    let location = useLocation();
  
    const milkrecid= location.state._id;
    

   const [userdata,setData]= useState({
      
    noOfCattleMilked:location.state.noOfCattleMilked,
    totalMilkProduced:location.state.totalMilkProduced,
    totalMilkConsumed:location.state.totalMilkConsumed
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
        const {noOfCattleMilked, totalMilkProduced, totalMilkConsumed} = userdata;
   
         const res = await fetch(`farmer/updatemilkrecord/${milkrecid}`, {
             method:"PUT", 
             headers:{
               "Content-Type" : "application/json"
             },
             body: JSON.stringify({
                noOfCattleMilked, totalMilkProduced, totalMilkConsumed
             })
         });
   
          const data= await res.json();
           if(data.status === 422 || !data){
               window.alert('Invalid Registration');
              
           }
           else{
               window.alert('Successfully updated');
               setData({
                noOfCattleMilked: '',
                totalMilkProduced: '',
                totalMilkConsumed: ''
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
                    <NavLink to="/MilkRecordMain" > <ion-icon name="arrow-back-outline" size='large' style={{margin:'2%' , color:'black'}}></ion-icon></NavLink>
                
   
                <div style={{ display:'flex' , flexDirection:'row',flex:1 ,marginLeft:"15%", marginRight:"15%", marginTop:'2%' }}>
                        <div className='shadow p-3 ' style={{flex:1,backgroundColor:'#ffff', backgroundImage:{bg},
                                                width:"600px", height:'500px', borderColor:"red", marginBottom:30, 
                                    marginLeft:10, marginRight:15, borderRadius:10}}>

                            <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> Add Milk Record </h3>
                            <form method='POST' >

                                <div className="form-group" style={{marginTop:30}}>

                                    {/* Disease, Medicine */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1, marginLeft:"12%", marginTop:"3%"}}>
                                           
                                             <label > Total Milk Produced </label>
                                            <input type="text" className="form-control" id="disease" aria-describedby="disease" 
                                                value={userdata.totalMilkProduced}    name='totalMilkProduced'
                                                onChange={handleInputs}
                                            
                                                placeholder="Total Milk Produced" style={{marginTop:0, marginLeft:"10%",width:"40%"}} />
                                        </div>
                                
                                    </div>
                                        {/* Vaccine name, weighed result*/}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1,marginLeft:"11%", marginTop:"3%"}}>
                                           
                                                   <label > Total Milk Consumed </label>
                                            <input type="text" className="form-control" id="vaccine" aria-describedby="vaccine" 
                                                value={userdata.totalMilkConsumed}    name='totalMilkConsumed'
                                                onChange={handleInputs}
                                            
                                                placeholder="Total Milk Consumed" style={{marginTop:0, marginLeft:"10%",width:"40%"}} />
                                            

                                        </div>
                                        
                                      
                                    </div>
                                         {/* Vaccine name, weighed result*/}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1,marginLeft:"12%", marginTop:"3%"}}>
                                           
                                                   <label > No of Cattle Milked </label>
                                            <input type="text" className="form-control" id="vaccine" aria-describedby="vaccine" 
                                                value={userdata.noOfCattleMilked}    name='noOfCattleMilked'
                                                onChange={handleInputs}
                                            
                                                placeholder="No of Cattle milked" style={{marginTop:0, marginLeft:"10%",width:"40%"}} />
                                            

                                        </div>
                                        
                                     
                                    </div>

                                    <button type="submit" className="btn" name='signUp'
                                        style={{marginTop:'5%',marginLeft:'40%',width:'15%', height:50,backgroundColor:'#009387',fontSize:24, color:'white'}}
                                         onClick={PostData}
                                        > 
                                        
                                        Update</button>
                            
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

export default EditMilkRecord;