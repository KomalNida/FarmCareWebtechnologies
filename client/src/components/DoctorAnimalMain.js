import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useHistory } from 'react-router-dom';
import {  Table, TableBody, TableCell,  TableRow } from '@material-ui/core';
import NavbarDoctor from './NavbarDoctor';
import axios from 'axios';
const ls = require('local-storage');





const DoctorAnimalMain = () =>{
    
    
    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'));

    const[AnimalList , setAnimalList]= useState([]);

    const[search, setsearch]= useState('');


   
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
    
     
    
      const PostData = async (animalid) =>{
      
         const res = await fetch(`animal/deleteanimal/${animalid}`, {
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
                window.alert('Successfully updated');
              setAnimalList(data);
   
              //  history.push("/AnimalEdit")
           }
     }

     const SearchData = async () =>{
      
      const res = await fetch(`animal/viewanimal/${search}`, {
          method:"GET", 
          headers:{
            "Content-Type" : "application/json"
          }
      });

       const data= await res.json();

        if(!data){
             setAnimalList('');
             
            window.alert('Animal Not Found');
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
          role !== "Farmer"
        ) {
          if (role === "Doctor") {
            return (
                <>
            <NavbarDoctor />   

            <h3  style={{margin:20, textAlign:'center'}}>Animal List</h3>
                
            <div style={{display:'flex', flexDirection:'row', marginLeft:'15%'}}> 

                <input autoComplete="disable"  value={search} name='search' 
                onChange={(e) => setsearch(e.target.value)} 
                  placeholder="Animal Name" type="text" 
                  style={{width:'30%',marginLeft:'190px',  marginRight:'10px',color:'black', height:40, marginTop:25,borderRadius:"9px 9px 9px 9px", paddingLeft:15}}></input>

                    <button className="btn waves-effect waves-light right hoverable "
                      style={{fontSize:14,backgroundColor:'green',color:'white', marginTop:25,marginBottom:30,width:100,height:40,borderRadius:"20px 20px 20px 20px" , marginLeft:"15px"}}
                       onClick={SearchData}
                      >
                    Search
                                
                    </button>     
                   
                  
            </div>
 
             
             <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', marginLeft:'150px', marginRight:'150px'
            , marginBottom:'90px', marginTop:'30px' }}>
            
                        <Table striped='true' bordered='true' hover='true' >
                        <thead style={{backgroundColor:'darkgreen', color:'white'}}>
                            <tr>
                            
                            <th style={{paddingLeft:"3%"}}>Animal Name</th>
                            <th  style={{paddingLeft:"3%"}}>Animal Breed</th>
                            <th  style={{paddingLeft:"3%"}}>Animal Status</th>
                            <th  style={{paddingLeft:"3%"}}>Animal Stage</th>
                            <th  style={{paddingLeft:"3%"}} >Action</th>
                            
                            </tr>
                        </thead>
                        <TableBody>
                                        {AnimalList.map((row) => (
                                            <TableRow  >
                                            

                                            <TableCell style={{paddingLeft:"4%"}}>{row.animal_name}</TableCell>
                                            <TableCell style={{paddingLeft:"4%"}} >{row.animal_breed}</TableCell>
                                            <TableCell style={{paddingLeft:"4%"}} >{row.animal_status}</TableCell>
                                            <TableCell style={{paddingLeft:"4%"}} >{row.animal_stage}</TableCell>
                                            <TableCell  >
                                                <p style={{marginLeft:"10px"}}> 
                                                     
                                                        <button className='btn'>
                                                           <NavLink style={{ textDecoration: 'none' }}  
                                                           to={{
                                                            pathname:'/DoctorViewAnimal',
                                                            state: {_id:row._id,  
                                                              animal_name: row.animal_name,
                                                              animal_status:row.animal_status,
                                                              animal_stage:row.animal_stage,
                                                              animal_weight:row.animal_weight,
                                                              animal_height:row.animal_height,}  
                                                            }}
                                                           >View</NavLink>
                                                        </button>  
                                                        
                                                     
                                                </p>
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

export default DoctorAnimalMain;