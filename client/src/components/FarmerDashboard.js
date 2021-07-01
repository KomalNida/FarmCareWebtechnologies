import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {  Card } from 'react-bootstrap';
import bg from '../assets/cow1.jpg';
import bg1 from '../assets/cattle.jpg';
import inven from '../assets/inventory.jpg';
import rep from '../assets/rep1.png';
import {useHistory} from 'react-router-dom';

import NavbarFarmer from './navbarFarmer';
const ls = require('local-storage')

const  FarmerDashboard = () => {

    const history= useHistory();
    const [id]= useState(ls.get('id'));
    const [role]= useState(ls.get('role'))
    const [token] = useState(ls.get('token'))

    const animal = () =>{
        history.push('/AnimalMain')
    }

    const event = () =>{
        history.push('/ViewAnimalEvents')  
    }

    const milk = () =>{
        history.push('/MilkRecordMain')  
    }
    const chart = () =>{
        history.push('/BarChart')  
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
            
                <div style={{ display: 'flex', flexDirection: 'row',alignItems: 'center', marginLeft:'150px', marginRight:'150px'
                    , marginBottom:'90px', marginTop:'30px' }}>
    
                    <Card style={{ width: '20%', flex:1 , marginRight:'20px',  marginLeft:'40px'}}>
                        <Card.Title style={{marginLeft:"35%", paddingTop:10,paddingBottom:10}} >Animal</Card.Title>
                        <Card.Img variant="top" src={bg} style={{width:'100%' ,
                        height: '10vw'}} />
                            <Card.Body>
                    
                                <Card.Text> Animal Menu to keep track of the animals. </Card.Text>
                                <button className='btn' style={{ width: '8rem', marginLeft:40, backgroundColor:'#009387',color:"white" }} 
                                        onClick={animal}>Explore</button>
                            </Card.Body>
                    </Card>
    
                    <Card style={{ width: '20%', flex:1 , marginRight:'20px',  marginLeft:'40px'}}>
                        <Card.Title style={{marginLeft:"35%", paddingTop:10,paddingBottom:10}} >Animal Event</Card.Title>
                        <Card.Img variant="top" src={bg1} style={{width:'100%' ,
                        height: '10vw'}} />
                            <Card.Body>
                    
                                <Card.Text> Animal events such as vaccination, castration etc. </Card.Text>
                                <button className='btn' style={{ width: '8rem', marginLeft:40, backgroundColor:'#009387',color:"white"}}
                                  onClick={event}
                                >Explore</button>
                            </Card.Body>
                    </Card>
    
                    <Card style={{ width: '20%', flex:1 , marginRight:'20px',  marginLeft:'40px'}}>
                        <Card.Title style={{marginLeft:"35%", paddingTop:10,paddingBottom:10}} >Milk Record</Card.Title>
                        <Card.Img variant="top" src={inven} style={{width:'100%' ,
                        height: '10vw'}} />
                            <Card.Body>
                    
                                <Card.Text> Keep track of the inventory of the farm. </Card.Text>
                                <button className='btn'   onClick={milk}
                                 style={{ width: '8rem', marginLeft:40, backgroundColor:'#009387',color:"white"}}
                                 >Explore</button>
                            </Card.Body>
                    </Card>
                    <Card style={{ width: '20%', flex:1 , marginRight:'20px',  marginLeft:'40px'}}>
                        <Card.Title style={{marginLeft:"35%", paddingTop:10,paddingBottom:10}} >Reports</Card.Title>
                        <Card.Img variant="top" src={rep} style={{width:'100%' ,
                        height: '10vw'}} />
                            <Card.Body>
                    
                                <Card.Text> Reports related to animals and farm. </Card.Text>
                                <button className='btn'  onClick={chart}
                                style={{ width: '8rem', marginLeft:40, backgroundColor:'#009387',color:"white"}}>Explore</button>
                            </Card.Body>
                    </Card>
                
                </div> 
        </>
      )
    }
    else {
        return (
          <>

                { window.alert(' You need to be signed in as a Farmer')}
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
export default FarmerDashboard;