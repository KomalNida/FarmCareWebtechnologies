import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,useHistory,useLocation } from 'react-router-dom';
import {  Table, TableBody, TableCell,  TableRow } from '@material-ui/core';
import NavbarFarmer from './navbarFarmer';
import axios from 'axios';
import Moment from 'react-moment';
const ls = require('local-storage');


const ViewAnimal = () =>{
    
    
    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'));


    const[AnimalList , setAnimalList]= useState([]);

     let location= useLocation();
     const animalid= location.state._id;
     console.log(animalid);

      const  [Disease , setDisease]= useState([]);
    


        useEffect (() => {
            getData()
        },[]);

    async function getData(){
      await axios(`http://localhost:5000/animal/viewanimal/${location.state.animal_name}`)
      .then((res)=>{

        const data= res.data;
        console.log(res.data);
        setAnimalList(data)
        
      })
      .catch((err)=>{
        console.log(err)
      })
      
    }

    
    // useEffect(async () => {
        
    //     var response =  await axios.get(`http://localhost:5000/animal/viewanimal/${location.state.animal_name}`);
    //     console.log(response);
    //     setAnimalList(response.data);
    //     var diseasejson= response.data.animal_disease;
    //     // if(Disease.length === 0) 
    //     setDisease(diseasejson);
    //   //  alert(Disease);

    // },[Disease]);



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
            <h3  style={{marginTop:20, textAlign:'center', marginBottom:30}}>Animal Profile </h3>
           
             
             <div className='shadow p-3 ' style={{ display: 'flex', flex:1 ,flexDirection: 'column',alignItems: 'center', 
             marginLeft:'150px', marginRight:'150px'
            , marginBottom:'90px', marginTop:'30px' }}>
            
                        <Table  hover='true' >

                            <div className='row'>
                                <div className='cold-md-6' style={{marginLeft:"30%"}}>
                                  <thead style={{ color:'black', marginBottom:30}}>
                            
                                    <tr ><th> Name </th> </tr>
                                    <tr >  <th > Breed </th>   </tr>
                                    <tr >  <th >Age</th>   </tr>
                                    <tr >  <th >Stage </th>   </tr>
                                    <tr >  <th >Status </th>   </tr>
                                    <tr >  <th >Height </th>   </tr>
                                    <tr >  <th >Weight </th>   </tr>
                                    <tr >  <th >Birth Date </th>   </tr>
                                    <tr >  <th >Joining Date </th>   </tr>
                                    <tr >  <th >Color </th>   </tr>
                                    <tr >  <th style={{paddingBottom:70}} >Disease </th>   </tr>
                        
                                    <tr >  <th style={{paddingBottom:70}} >Treatment </th>   </tr>
                                    <tr >  <th style={{paddingBottom:70}} >Prescription </th>   </tr>


                                  </thead>
                                </div> 

                                <div className='cold-md-6' style={{marginLeft:"5%"}}>

                                    

                                  

                                         {AnimalList.map((row) => ( 
                                            <thead style={{color:'grey', marginBottom:30,fontSize:'20'}}>
                                                <tr  > <th> {row.animal_name}  </th>   </tr>
                                                <tr style={{marginTop:10}} > <th>{row.animal_breed}  </th>   </tr>
                                                <tr >  <th>{row.animal_age}   </th>     </tr>
                                                <tr >  <th> {row.animal_stage} </th>     </tr>
                                                <tr >  <th>  {row.animal_status} </th>    </tr>
                                                <tr > <th>  {row.animal_height} ft   </th>  </tr>
                                                <tr >  <th>  {row.animal_weight} kg </th>      </tr>
                                                 
                                                <tr >   <th> 
                                                   <Moment format="YYYY/MM/DD">
                                                           {row.animal_BirthDate}
                                                        </Moment>  </th>     </tr>
                                                        
                                                <tr >  <th>  <Moment format="YYYY/MM/DD">
                                                           {row.animal_JoiningDate}
                                                        </Moment>   </th>   </tr>

                                                <tr >  <th style={{marginBottom:40}}> {row.animal_color}  </th>     </tr>
                                                {row.animal_disease.map((dis)=>(
                                                            <tr >  <th> * {dis}   </th>     </tr>
                                                ))}
                                               
                                               
                                                {row.animal_treatment.map((treat)=>(
                                                            <tr >  <th style={{paddingBottom:70, paddingTop:50}}> * {treat}   </th>     </tr>
                                                ))}

                                                {row.animal_prescription.map((pres)=>(
                                                            <tr >  <th> * {pres}   </th>     </tr>
                                                ))}
                                                
                                               
                                            </thead>

                                           
                                             ))}
                                </div>

                            </div>
                      
                        
                            
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

export default ViewAnimal;