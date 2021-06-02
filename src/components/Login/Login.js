
import React,{useState} from "react";
import axios from 'axios';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import ls from 'local-storage';
import '/Users/pujag/Node JS Application/my-app/node_modules/bootstrap/dist/css/bootstrap.min.css'

function Login() {
    let [iUserName, setUserName] = useState('');
    let [iPassword, setPassword] = useState('');
    let [errMsg, setErrMsg] = useState(null);

  function userLogin(){ 


    axios.post('http://localhost:8080/login', {
      userName: iUserName,
      userPassword: iPassword
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data !=null){
        if(response.data.userFound ==='Y' && response.data.jwtToken != null)
        {
          console.log('Login Successful');
          ls.set('JWTToken', response.data.jwtToken);
          window.location.href = "http://localhost:3000/feedPost";
        }
        else{
          setErrMsg(response.data.message);
         // alert (response.data.message);
        } 
      }else{
        setErrMsg("Some Error Occurred");
        // alert("No user Found");
      }
      
    })
    .catch(function (error) {
      console.log(error);
      console.log('error:Error in User Login');
    });

  }

  return (
         
      <Switch>
          <Route path="/login">
          <div className="container" style={{width: "30%",paddingTop:"18%"}}  >
              <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping1">@</span>
                <input  value ={iUserName} type="text" className="form-control" onChange={event => setUserName(event.target.value)} placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>

              <div className="input-group flex-nowrap"  style={{marginTop :"10px"}}>
              <span className="input-group-text" id="addon-wrapping">@</span>
                <input value ={iPassword} type="text" onChange={event => setPassword(event.target.value)} className="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>

              {/* <Link to ="/feedPost"> <button type="button" className="btn btn-primary" style={{width: "100%", marginTop :"10px"}} onClick={userLogin}>Login</button></Link> */}
             
              {(errMsg)?<div style={{color:"red"}}>{errMsg}</div>:null}
              <button type="button" className="btn btn-primary" style={{width: "100%", marginTop :"10px"}} onClick={userLogin}>Login</button>
              
              <div style={{paddingTop:"10px" , paddingLeft: "110px"}}>
              <Link to ="/register"><span style={{textAlign: "left"}}>Forgot Password?  </span></Link>
              <span> |   </span>
              <Link to ="/register"><span style={{textAlign: "left"}}>Register  </span></Link>
              </div>
              </div>
              </Route>
      </Switch>  
  
   
);
  }

export default Login;
