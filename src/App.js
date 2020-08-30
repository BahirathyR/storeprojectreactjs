import React from 'react';
import{Switch,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import StoreOwner from './components/StoreOwner';
import EmployeeDetails from './components/EmployeeDetails';
 import CustomerDetails from './components/CustomerDetails';
import SupplierDetails from './components/SupplierDetails';
import LandingPage from './components/LandingPage'
import {Link} from 'react-router-dom';
import Navbar from './components/Navbar'

import LoginForm from './components/LoginForm'
import New from './components/New'

function App() {
  return (


    <React.Fragment>
     <Route exact path="/" component={LoginForm}/> 
    <Route  path="/LandingPage" component={LandingPage}/>
      <Route path="/StoreOwner" component={StoreOwner}/>
      <Route path="/SupplierDetails" component={SupplierDetails}/>
      <Route path="/EmployeeDetails" component={EmployeeDetails}/>
      <Route path="/CustomerDetails" component={CustomerDetails}/> 
     
      </React.Fragment>   
      
  );
}

export default App;
