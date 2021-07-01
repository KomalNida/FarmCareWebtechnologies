import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const footer = () =>{
   return(
       <>
            <div 
             style={{backgroundColor:'lightgrey' , height:230 ,paddingTop:"30px"
             ,paddingLeft:20,  display:'flex' ,  flexDirection:'row' , marginTop:"10%"
             }}>

               <div  style={{flex:0.5 , marginLeft:"10%", alignItems:'center'}}>
                   <h3  style={{marginBottom:20}}>About</h3>
                   <p> FarmCare is a website where Farmers can manage 
                       farm task such as animals , animal events , 
                       prescriptions and doctors can check animal and 
                       prescribe them medicines effectively and efficiently.</p>

               </div>

               <div  style={{flex:0.5 ,marginLeft:"10%", lineHeight:1}}>
                   <h3 style={{marginBottom:20}}>Contact Us</h3>
                   <p> <ion-icon name="home"></ion-icon> St 12 , H 56 , abc town, Islamabad </p>
                   <p> <ion-icon name="call"></ion-icon> +92-315673469 </p>
                   <p> <ion-icon name="mail" ></ion-icon> infofarmcare@gmail.com </p>

               </div>
              
            </div>
       </>
   )
}

export default footer;