import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useHistory } from 'react-router-dom';
import {  Table, TableBody, TableCell,  TableRow } from '@material-ui/core';
import NavbarDoctor from './NavbarDoctor';
import axios from 'axios';
import Moment from 'react-moment';
const ls = require('local-storage');





const PrescriptionMain = () =>{
    
    
    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'));

    const[Prescription , setPrescription]= useState([]);

    const[search, setsearch]= useState('');

    const moveTo = () =>{
        history.push('/AddPrescription')
    }

   
    useEffect (() => {
        getData()
    },[]);

        async function getData(){
          await axios(`http://localhost:5000/prescription/viewprescription`).then((res)=>{
            console.log(res.data);
            setPrescription(res.data)
            
          })
          .catch((err)=>{
            console.log(err)
          })
          
        }
    
    
     const SearchData = async () =>{
      
      const res = await fetch(`prescription/viewprescription/${search}`, {
          method:"GET", 
          headers:{
            "Content-Type" : "application/json"
          }
      });

       const data= await res.json();

        if(!data){
            setPrescription('No Data');
        
            console.log('not found')
        }
        else{
            
            setPrescription(data);

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

            <h3  style={{margin:20, textAlign:'center'}}> Prescriptions </h3>
                
            <div style={{display:'flex', flexDirection:'row', marginLeft:'15%'}}> 

                <input autoComplete="disable"  value={search} name='search' 
                onChange={(e) => setsearch(e.target.value)} 
                  placeholder="Milk Record Name" type="text" 
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
             
             <div style={{ display: 'flex', flex:1 , flexDirection: 'column',alignItems: 'center', marginLeft:'80px', marginRight:'150px'
            , marginBottom:'90px', marginTop:'30px' , width:"90%" }}>
            
                        <Table striped='true' bordered='true' hover='true' >
                        <thead style={{backgroundColor:'darkgreen', color:'white'}}>
                            <tr >
                            
                            <th style={{padding:10}}>Animal</th>
                            <th style={{paddingLeft:20}}>Doctor</th>  
                            <th style={{paddingLeft:20}}> Date</th> 
                            <th> Disaese</th> 
                            <th>Medicine</th> 
                            <th style={{paddingLeft:50}}>Description</th> 
                            <th style={{marginLeft:"30px", paddingLeft:20}} >Action</th>
                            
                            </tr>
                        </thead>
                        <TableBody>
                                        {Prescription.map((row) => (
                                            <TableRow >
                                            <TableCell> {row.animal_id} </TableCell>
                                        
                                            <TableCell>  {row.treatedBy} </TableCell>
                                            <TableCell >
                                                <Moment format='DD/MM/YYYY' >
                                                   {row.presc_date}
                                                </Moment>
                                               
                                            </TableCell>
                                            <TableCell  >{row.diagnosed_disease}</TableCell>
                                            <TableCell >{row.medicineName}</TableCell>
                                            <TableCell >{row.presc_description}</TableCell>
                                          
                                            <TableCell  >
                                                <p style={{marginLeft:"30px"}}> 
                                                   <button className='btn' >
                                                    <NavLink style={{ textDecoration: 'none' }} 
                                                       to={{
                                                          pathname:'/EditMilkRecord',
                                                          state: {
                                                              _id:row._id, 
                                                              animal_name:row.animal_name,
                                                              treatedBy:row.treatedBy,
                                                              presc_date:row.presc_date,
                                                              diagnosed_disease:row.diagnosed_disease,
                                                              medicineName:row.medicineName,
                                                              presc_description:row.presc_description

                                                          }  
                                                          }}>
                                                          View
                                                          </NavLink>
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

export default PrescriptionMain;