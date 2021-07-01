import React from 'react';
import bg from '../assets/cow1.jpg';
import Navbar from './navbar';


const  Home = () => {
    return(
       <>
            <Navbar  />
            <div style={{position:'relative', color:'white'}}>
                  <div className = "head-image">
                     <img src = {bg} alt = "Freedom Blog" />
                  </div>
                     <div style={{position:'absolute', right:'30%', left:'40%', bottom:'80%', alignItems:'center', fontSize:40}}>
                        <h3 style={{fontSize:40, fontFamily:'serif',textShadow: '3px 3px purple'}}> Welcome to FarmCare </h3>
                      
                     </div>
            </div>

       </>
    );
}
export default Home;