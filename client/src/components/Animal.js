import NavbarFarmer from './navbarFarmer';
import React,{useState} from 'react';
import {NavLink,useHistory} from 'react-router-dom';
const ls = require('local-storage');


const Animal = () => {

    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'))

    const [userdata,setData]= useState({
        animal_name: "",
        animal_breed: "",
        animal_BirthDate:"",
        animal_JoiningDate: "",
        animal_color: "",
        animal_age: "",
        animal_quantity: "",
        animal_height: "",
        animal_weight: "",
        animal_stage:"",
        animal_status: "",
       
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
        const {animal_name, animal_breed, animal_BirthDate,animal_JoiningDate,animal_color ,
            animal_age, animal_quantity, animal_height,   animal_weight, animal_stage,animal_status} = userdata;
   
        const res = await fetch("/animal/addanimal", {
             method:"POST", 
             headers:{
               "Content-Type" : "application/json"
             },
             body: JSON.stringify({
                animal_name, animal_breed, animal_BirthDate,animal_JoiningDate,animal_color ,
                animal_age, animal_quantity, animal_height,   animal_weight, animal_stage,animal_status
             })
         });
   
          const data= await res.json();
           if(data.status === 201 || !data){
               window.alert('Invalid Data');
               
           }
           else{
               window.alert('Animal Added Successfully');
            
               history.push("/AnimalMain")
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
                    <NavLink to="/AnimalMain" > <ion-icon name="arrow-back-outline" size='large' style={{margin:'2%' , color:'black'}}></ion-icon></NavLink>
                     <div style={{ display:'flex' , flexDirection:'row', marginTop:"0%"}}>
                    <div className='shadow p-3 ' style={{flex:0.8,backgroundColor:'#ffff', 
                                                height:650, borderColor:"red", marginBottom:30, 
                                    marginLeft:"20%", marginRight:15, borderRadius:10}}>

                            <h3 style={{ marginLeft:"40%", fontWeight:'bold'}}> Add Animal </h3>
                             <form method="POST">
                                <div className="form-group" style={{marginTop:30}}>

                                    {/* name , breed */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                        
                                            <input type="text" className="form-control" id="animalname" aria-describedby="animalname" 
                                                value={userdata.animal_name}  name='animal_name'
                                                onChange={handleInputs}  required
                                                placeholder="Animal Name i.e; CAT01" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                        
                                            <input type="text" className="form-control" id="animal_breed" aria-describedby="animal_breed" 
                                                value={userdata.animal_breed}    name='animal_breed'
                                                onChange={handleInputs}   
                                                placeholder="Animal breed i.e; " style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                    </div>

                                    {/* dob , job */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                        
                                            <input type="text" className="form-control" id="birthdate" aria-describedby="birthdate" 
                                                value={userdata.animal_BirthDate}   name='animal_BirthDate'
                                                onChange={handleInputs}
                                                placeholder="Birthdate i.e; 13-july-2000" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            
                                            <input type="text" className="form-control" id="animal_JoiningDate" aria-describedby="animal_JoiningDate" 
                                                value={userdata.animal_JoiningDate}    name='animal_JoiningDate'
                                                onChange={handleInputs}
                                                placeholder="Joining date i.e; 13-july-2000" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                
                                    </div>

                                    {/* color , age */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            
                                        <input type="text" className="form-control" placeholder="Color i.e; black or brown"
                                                value={userdata.animal_color}   name='animal_color'
                                                onChange={handleInputs}
                                                style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            
                                            <input type="text" className="form-control" id="animal_age" aria-describedby="animal_age" 
                                                value={userdata.animal_age}   name='animal_age'
                                                onChange={handleInputs} 
                                                placeholder=" Age " style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                            
                                        </div>
                                
                                    </div>

                                    {/* quantity , height */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            
                                        <input type="text" className="form-control" id="animalquantity" aria-describedby="animalquantity" 
                                                value={userdata.animal_quantity}    name='animal_quantity'
                                                onChange={handleInputs}
                                                placeholder="Quantity" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            
                                            <input type="text" className="form-control" id="animal_height" aria-describedby="animal_height" 
                                                value={userdata.animal_height}    name='animal_height'
                                                onChange={handleInputs}
                                                placeholder="Height" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                    </div>

                                    {/* weight , stage */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20, marginBottom:30}}>
                                        
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            
                                            <input type="text" className="form-control" id="animal_weight" aria-describedby="animal_weight" 
                                                value={userdata.animal_weight}   name='animal_weight'
                                                onChange={handleInputs}
                                                placeholder="Weight" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            
                                            <input type="text" className="form-control" id="animal_stage" aria-describedby="animal_stage" 
                                                value={userdata.animal_stage}   name='animal_stage'
                                                onChange={handleInputs}
                                                placeholder="Stage" style={{marginTop:5, marginLeft:10,width:"70%"}} />
                                        </div>
                                    </div>

                                    {/* License No */}
                                    <div style={{display:'flex', flexDirection:'row',marginLeft:20}}>
                                        <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                            
                                            <input type="text" className="form-control" id="animal_status" aria-describedby="animal_status" 
                                                value={userdata.animal_status}   name='animal_status'
                                                onChange={handleInputs}
                                                placeholder="Status" style={{marginTop:5, marginLeft:10,width:"35%"}} />
                                                
                                        </div>
                                    </div>
                                    

                                    <button type="submit" className="btn" name='signUp'
                                        style={{marginLeft:'40%',width:'15%', height:50,backgroundColor:'#009387',fontSize:24, color:'white', marginTop:'5%'}}
                                            onClick={PostData}
                                        > 
                                        
                                        Submit</button>
                            
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

export default Animal;