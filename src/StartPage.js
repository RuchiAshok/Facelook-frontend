import './App.css';
import React  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Header from './Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';


function StartPage() {
  return (  
    <Router>  
     <Switch>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/register">
            <Register/>
        </Route>
        <Route path="/feedPost">
            <Header/>
        </Route>
        <Route path="/">
            <div className="container" style={{marginTop:"15%"}}>
            <div style={{backgroundImage: "url('www.google.com')"}}>
                <div style={{marginLeft:"30%"}}>
                <h2>
                <div className="alert alert-primary" style={{width:"50%", paddingLeft:"17%"}} role="alert"> Login As</div>
                </h2>   
                
            <Link to ="/login"><div className="alert alert-warning" style={{width:"50%", cursor:"pointer", paddingLeft:"22%"}} role="alert">Member</div></Link>
            <Link to ="/login"><div className="alert alert-warning" style={{width:"50%", cursor:"pointer",paddingLeft:"22%"}} role="alert">Admin</div></Link>          
                </div>
            </div>   
        </div>
        </Route>        
    </Switch>        
</Router>      
  );
  }

export default StartPage;
