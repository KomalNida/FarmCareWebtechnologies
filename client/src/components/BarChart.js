import React,{useState} from 'react'
// import { Pie } from 'react-chartjs-2'
import {Bar,Pie} from 'react-chartjs-2';
import ls from  'local-storage';
import NavbarFarmer from './navbarFarmer'
import { set } from 'date-fns';
import axios from 'axios';
import { Chart } from "react-google-charts";



const BarChart = () => {

  var [treated,settreated]=useState(0)
  var [pregnantt,setpregnant]= useState(0)
  var [weigh,setweighed]= useState(0)
  var [aboertion,setabortion]=  useState(0)
  var [inseminate,setinseminated]= useState(0);

  var [jersey , setJersey]= useState(0);
  var [ayrshire , setAyrshire]= useState(0);
  var [friesian , setFriesian]= useState(0);
  var [guernsey , setGuernsey]= useState(0);


  React.useEffect(() => {
    getData(); 
  },[]);

  async function getData() {
    await axios("http://localhost:5000/event/viewevent")
      .then((res) => {
        for(let i =0 ; i<res.data.length;i++){
          if(res.data[i].event_name === 'Treated'){
           settreated(treated++);
           ls.set("treated",treated)
           
          }
          else if(res.data[i].event_name === "Pregnant"){
            setpregnant(pregnantt++)
            ls.set("pregnant",pregnantt)
         }
         else if(res.data[i].event_name === "Weighed"){
            setweighed(weigh++)
            ls.set("weighed",weigh)
            
         }
         else if(res.data[i].event_name==="Aborted Pregnancy"){
            setabortion(aboertion++)
            ls.set("abortedPregnancy",aboertion)
         }
         else if(res.data[i].event_name==="Inseminated"){
            setinseminated(inseminate++)
            ls.set("inseminated",inseminate)
         }
        

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const[chartData,setchartData]=React.useState({
    labels: ['Treated', 'Pregnant', 'Weighed','Aborted Pregnancy', 'Inseminated'],
    datasets:[
      {
        label:"Animals",
        data:[
          ls.get("treated"),
          ls.get ("pregnant"),
          ls.get("weighed"),
          ls.get("abortedPregnancy"),
          ls.get("inseminated"),
        ],
        backgroundColor:[
          '#009387',
        
        ]
      }
    ]})



  React.useEffect(() => {
    getbreed(); 
  },[]);

  async function getbreed() {
    await axios("http://localhost:5000/animal/report")
      .then((res) => {
        for(let i =0 ; i<res.data.length;i++){
          if(res.data[i].animal_breed === 'Jersey'){     
            setJersey(jersey++);
      
           
          }
          else if(res.data[i].animal_breed === "Ayrshire"){
            setAyrshire(ayrshire++)
           
         }
         else if(res.data[i].animal_breed === "Friesian"){
            setFriesian(friesian++)
         
            
         }
         else if(res.data[i].animal_breed ==="Guernsey"){
            setGuernsey(guernsey++)
            // ls.set("guernsey",Guernsey)
         }
        

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (
      <>
       <NavbarFarmer/>
       <h3 style={{marginLeft:"40%", marginTop:"5%"}}> Animals Events Report </h3>
       <div className="chart" style={{flex:1, display:'flex' , width:'60%' , marginLeft: '20%' , marginTop:'5%'}} >
        <Bar
       
          data={chartData}
          options={{
            responsive: true,
            scales:{
                x:{
                    ticks:{
                        color:"black"
                    }
                },
                y:{
                    ticks:{
                        color:"black"
                    }
                }

            },
            plugins:{   
                legend: {
                  display: false
                        },
                    
                     },    
             maintainAspectRatio: false,
            
          }}
          height={350}
        />

        
      </div>

      <h3 style={{marginLeft:"45%", marginTop:"10%"}}> Animal by Breed </h3>
      <div className="chart" style={{flex:1, display:'flex' , width:'60%' , marginLeft: '35%' , marginTop:'0%'}} >
        <Chart
            width={'700px'}
            height={'500px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Animal Breed', 'Hours per Day'],
                ['Jersey', jersey],
                ['Ayrshire', ayrshire],
                ['Friesian', friesian],
                ['Guernsey', guernsey],
               
            ]}
            options={{
               
                is3D: true,
            }}
            rootProps={{ 'data-testid': '2' }}
            />

          </div>
 

                </>
                
            )
}

export default BarChart;