import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useHistory } from 'react-router-dom';
import {  Table, TableBody, TableCell,  TableRow } from '@material-ui/core';
import NavbarFarmer from './navbarFarmer';
import axios from 'axios';
const ls = require('local-storage');





const ViewAnimalEvents = () =>{
    
    
    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'));

    const[AnimalEventList , setAnimalList]= useState([]);

    const[search, setsearch]= useState('');

    const moveTo = () =>{
        history.push('/AddAnimalEvent')
    }

   
    useEffect (() => {
        getData()
    },[]);

        async function getData(){
          await axios(`http://localhost:5000/event/viewevent`).then((res)=>{
            console.log(res.data);
            setAnimalList(res.data)
            
          })
          .catch((err)=>{
            console.log(err)
          })
          
        }
    
     
    
      const PostData = async (animalid) =>{
      
         const res = await fetch(`event/deleteevent/${animalid}`, {
             method:"DELETE", 
             headers:{
               "Content-Type" : "application/json"
             },
             body: JSON.stringify({
              _id:animalid
             })
         });
   
          const data= await res.json();
           if(data.status === 422 || !data){
               window.alert('Invalid Registration');
              
           }
           else{
                window.alert('Successfully Deleted');
                setAnimalList(data);
   
              
           }
     }

     const SearchData = async () =>{
      
      const res = await fetch(`event/viewevent/${search}`, {
          method:"GET", 
          headers:{
            "Content-Type" : "application/json"
          }
      });

       const data= await res.json();

        if(!data){
            setAnimalList('');
             
            window.alert('Event Not Found');
            console.log('not found')
        }
        else{
            
           setAnimalList(data);

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

            <h3  style={{margin:20, textAlign:'center', marginTop:40 , marginBottom:40}}> Events </h3>
                
            <div style={{display:'flex', flexDirection:'row', marginLeft:'15%'}}> 

                <input autoComplete="disable"  value={search} name='search' 
                onChange={(e) => setsearch(e.target.value)} 
                  placeholder="Event Name" type="text" 
                  style={{width:'30%',marginLeft:'190px',  marginRight:'10px',color:'black', height:40, marginTop:25,borderRadius:"9px 9px 9px 9px", paddingLeft:15}}></input>

                    <button className="btn waves-effect waves-light right hoverable "
                      style={{fontSize:14,backgroundColor:'green',color:'white', marginTop:25,marginBottom:30,width:100,height:40,borderRadius:"20px 20px 20px 20px" , marginLeft:"15px"}}
                       onClick={SearchData}
                      >
                    Search
                                
                    </button>     
                    <button className="btn waves-effect waves-light right hoverable " 
                    style={{fontSize:14,backgroundColor:'green',color:'white', marginTop:25,marginBottom:30,width:100,height:40,borderRadius:"20px 20px 20px 20px", marginLeft:"15px"}}
                    onClick={moveTo}
                    >
                    Add
                                
                    </button>   
                  
            </div>

            <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', marginLeft:'150px', marginRight:'150px'
            , marginBottom:'90px', marginTop:'30px' }}>
               
            
                    <Table striped='true' bordered='true' hover='true' >
                    <thead style={{backgroundColor:'darkgreen', color:'white'}}>
                        <tr>
                        
                        {/* <th>Animal Name</th> */}
                        <th>Event Name</th>
                        <th>Event Type</th>
                        <th>Disease</th>
                        <th>Symptoms</th>
                        {/* <th>Treated By</th> */}
                        <th>Vaccine</th>
                        <th>Weighed Result</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <TableBody>
                                    {AnimalEventList.map((row) => (
                                        <TableRow key={row.sr}>
                                           
                                        {/* <TableCell  >{row.animal_id}</TableCell> */}
                                        <TableCell>{row.event_name}</TableCell>
                                        <TableCell  >{row.event_type}</TableCell>
                                        <TableCell>{row.diagnosed_disease}</TableCell>
                                        <TableCell >{row.disease_symptoms}</TableCell>
                                        <TableCell >{row.vaccine_Name}</TableCell>
                                        <TableCell  >{row.weighed_results}</TableCell>
                                        <TableCell >
                                        <button className='btn' >
                                                    <NavLink style={{ textDecoration: 'none' }} 
                                                       to={{
                                                          pathname:'/EditAnimalEvent',
                                                          state: {
                                                              _id:row._id, 
                                                              disease_symptoms:row.disease_symptoms,
                                                              diagnosed_disease:row.diagnosed_disease,
                                                              vaccine_Name:row.vaccine_Name,
                                                              weighed_results:row.weighed_results,
                                                          }  
                                                          }}>
                                                          Edit
                                                          </NavLink>
                                                    </button>
                                                      |   
                                                        {/* <button className='btn'>
                                                           <NavLink style={{ textDecoration: 'none' }}  
                                                           to={{
                                                            pathname:'/ViewAnimal',
                                                            state: {_id:row._id, 
                                                              animal_name: row.animal_name,
                                                              animal_status:row.animal_status,
                                                              animal_stage:row.animal_stage,
                                                              animal_weight:row.animal_weight,
                                                              animal_height:row.animal_height,}  
                                                            }}
                                                           >View</NavLink>
                                                        </button>  */}
                                                        {/* |  */}
                                                        <button className='btn' onClick={ () => PostData(row._id)} >
                                                           <NavLink style={{ textDecoration: 'none' }}  to="#">Remove</NavLink>
                                                        </button>
                                        
                                        </TableCell>
                                        </TableRow>
                                        
                                    ))}
                        </TableBody>
                    
                    
                        
                    </Table>
                    
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

    return(

        <>
          {loggedIn()}
            
        </>

    );
}

export default ViewAnimalEvents;