import React from 'react';
import {Route,Switch} from 'react-router-dom';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import FarmerDashboard from './components/FarmerDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Animal from './components/Animal';
import Profile from './components/Profile';
import Errorpage from './components/Errorpage';
import AnimalMain from './components/AnimalMain'; 
import AnimalEdit from './components/AnimalEdit';  
import ViewAnimal from './components/ViewAnimal';

import AddAnimalEvent from './components/AddAnimalEvent';
import EditAnimalEvent from './components/EditAnimalEvent';
import ViewAnimalEvents from './components/ViewAnimalEvents';
import MilkRecordMain from './components/MilkRecordMain';
import AddMilkRecord from './components/AddMilkRecord';
import EditMilkRecord from './components/EditMilkRecord';
import AddPrescription from './components/AddPrescription';
import PrescriptionMain from './components/PrescriptionMain';
import DoctorAnimalMain from './components/DoctorAnimalMain';
import DoctorViewAnimal from './components/DoctorViewAnimal';
import DoctorProfile from './components/DoctorProfile';
import BarChart from './components/BarChart';


function App() {
  return (

     <>
   
     <Switch>
     <Route exact path="/">
         <Home />
      </Route>
      <Route path="/about">
         <About />
      </Route>
      <Route path="/contact">
         <Contact />
      </Route>
      <Route path="/Login">
         <Login />
      </Route>
      <Route path="/SignUp">
         <SignUp />
      </Route>

      <Route path="/FarmerDashboard">
         <FarmerDashboard />
      </Route>

      <Route path="/DoctorDashboard">
         <DoctorDashboard />
      </Route>
      
      <Route path="/Animal">
         <Animal />
      </Route>

      <Route path="/Profile">
         <Profile />
      </Route>

      <Route path="/AnimalMain">
         <AnimalMain />
      </Route>

      <Route path="/AnimalEdit">
         <AnimalEdit />
      </Route>

      <Route path="/ViewAnimal">  
        <ViewAnimal />
    </Route>

     <Route path="/AddAnimalEvent">  
         <AddAnimalEvent /> 
      </Route>    
      
       <Route path="/EditAnimalEvent">  
         <EditAnimalEvent /> 
      </Route>
      
      <Route path="/ViewAnimalEvents">  
         <ViewAnimalEvents /> 
      </Route>

      <Route path="/MilkRecordMain">  
         <MilkRecordMain /> 
      </Route>

      <Route path="/AddMilkRecord">  
         <AddMilkRecord /> 
      </Route>
      <Route path="/EditMilkRecord">  
         <EditMilkRecord /> 
      </Route>   

      <Route path="/AddPrescription">  
         <AddPrescription /> 
      </Route>   
   
      <Route path="/PrescriptionMain">  
         <PrescriptionMain /> 
      </Route>   

      <Route path="/DoctorAnimalMain">  
         <DoctorAnimalMain /> 
      </Route>       

      <Route path="/DoctorViewAnimal">
         <DoctorViewAnimal />
      </Route>

      <Route path="/DoctorProfile">
         <DoctorProfile />
      </Route>

      <Route path="/BarChart">
         <BarChart />
      </Route>
 
      <Route>
         <Errorpage />  
      </Route>

     </Switch>
      

      <Footer />
     
     </>
    
  );
}

export default App;


