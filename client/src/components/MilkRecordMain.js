import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useHistory } from 'react-router-dom';
import {  Table, TableBody, TableCell,  TableRow } from '@material-ui/core';
import NavbarFarmer from './navbarFarmer';
import axios from 'axios';
import Moment from 'react-moment';
const ls = require('local-storage');





const MilkRecordMain = () =>{
    
    
    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'));

    const[MilkRecordList , setMilkrecord]= useState([]);

    const[search, setsearch]= useState('');

    const moveTo = () =>{
        history.push('/AddMilkRecord')
    }

   
    useEffect (() => {
        getData()
    },[]);

        async function getData(){
          await axios(`http://localhost:5000/farmer/viewmilkrecord`).then((res)=>{
            console.log(res.data);
            setMilkrecord(res.data)
            
          })
          .catch((err)=>{
            console.log(err)
          })
          
        }
    
      const PostData = async (milkrecid) =>{
      
         const res = await fetch(`farmer/deletemilkrecord/${milkrecid}`, {
             method:"DELETE", 
             headers:{
               "Content-Type" : "application/json"
             },
             body: JSON.stringify({
              _id:milkrecid
             })
         });
   
          const data= await res.json();
           if(data.status === 422 || !data){
               window.alert('Invalid Registration');
              
           }
           else{
                window.alert('Successfully Deleted');
                setMilkrecord(data);
                history.push("/MilkRecordMain")
           }
     }

     const SearchData = async () =>{
      
      const res = await fetch(`farmer/viewmilkrecord/${search}`, {
          method:"GET", 
          headers:{
            "Content-Type" : "application/json"
          }
      });

       const data= await res.json();

        if(!data){
            setMilkrecord('No Data');
             
            window.alert('Animal Not Found');
            console.log('not found')
        }
        else{
            
            setMilkrecord(data);

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

            <h3  style={{margin:20, textAlign:'center'}}> Milk Records </h3>
                
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
                            <tr style={{paddingLeft:10}}>
                            
                            <th style={{padding:10}}>Milking Date</th>
                            <th>Milk Type</th>  
                            <th> Milk Produced</th> 
                            <th> Milk Consumed</th> 
                            <th>Cattle Milked</th> 
                            <th>No. of Cattle Milked</th> 
                            <th style={{marginLeft:"60px", paddingLeft:100}} >Action</th>
                            
                            </tr>
                        </thead>
                        <TableBody>
                                        {MilkRecordList.map((row) => (
                                            <TableRow >
                                            
                                        
                                            <TableCell>
                                                    <Moment format='DD/MM/YYYY' >
                                                        {row.milking_date}
                                                    </Moment>
                                            </TableCell>
                                            <TableCell >
                                                
                                                {row.milkrecord_type}
                                                </TableCell>
                                            <TableCell style={{paddingLeft: "4%"}} >{row.totalMilkProduced}</TableCell>
                                            <TableCell  style={{paddingLeft: "4%"}} >{row.totalMilkConsumed}</TableCell>
                                            <TableCell >{row.CattleMilked}</TableCell>
                                            <TableCell style={{paddingLeft: "8%"}} >{row.noOfCattleMilked}</TableCell>
                                            <TableCell  >
                                                <p style={{marginLeft:"40px"}}> 
                                                   <button className='btn' >
                                                    <NavLink style={{ textDecoration: 'none' }} 
                                                       to={{
                                                          pathname:'/EditMilkRecord',
                                                          state: {
                                                              _id:row._id, 
                                                              noOfCattleMilked:row.noOfCattleMilked,
                                                              totalMilkProduced:row.totalMilkProduced,
                                                              totalMilkConsumed:row.totalMilkConsumed,
                                                          }  
                                                          }}>
                                                          Edit
                                                          </NavLink>
                                                    </button>
                                                      | 
                                                        <button className='btn' onClick={ () => PostData(row._id)} >
                                                           <NavLink style={{ textDecoration: 'none' }}  to="/MilkRecordMain">Remove</NavLink>
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

export default MilkRecordMain;