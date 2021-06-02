
import React,{useState} from "react";
import axios from 'axios';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import '/Users/pujag/Node JS Application/my-app/node_modules/bootstrap/dist/css/bootstrap.min.css';


function Register() {
  
  let [iUserName, setUserName] = useState('');
  let [iEmail, setEmail] = useState('');
  let [iContactNo, setContactNo] = useState('');
  let [iPassword, setPassword] = useState('');

  function memberRegister(){ 
    console.log(iUserName +', '+ iEmail + ', '  + iContactNo + ', ' + iPassword);

    axios.post('http://localhost:8080/memberRegister', {
      userName: iUserName,
      userEmail: iEmail,
      userMobile: iContactNo,
      userPassword: iPassword,
      userTag:"M",
      userApproved: "N"
    })
    .then(function (response) {
      console.log('Successfully Inserted');
      console.log(response);
      setUserName('')
      setEmail('')
      setContactNo('')
      setPassword('');
    })
    .catch(function (error) {
      console.log(error);
      console.log('error:Error in Member Registration');
    });

  }

  function pageRedirect(){
    window.location.href = "http://localhost:3000/login";
  }

  return (
    <Switch>
      <Route path="/register">       
          <div className="container" style={{width: "50%",paddingTop:"10%"}} >
            <h2>
              <div className="alert alert-primary" role="alert">
                  Enter User details
              </div>
            </h2>
            <div className="form-group">
                  <label htmlFor="uName">Username</label>
                  <input value ={iUserName} onChange={event => setUserName(event.target.value)} type="" className="form-control" id="exampleInputUserName">
                </input>
            </div>
              <div className="form-group">
                <label htmlFor="uEmail">Email address</label>
                <input value ={iEmail} onChange={event => setEmail(event.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              </input>
            </div>
              <div className="form-group">
                <label htmlFor="uMobileNo">Mobile Number</label>
                <input value ={iContactNo} onChange={event => setContactNo(event.target.value)} type="" className="form-control" id="exampleMobileNo">
              </input>
            </div>

            <div className="form-group">
              <label htmlFor="uInputPassword">Password</label>
              <input value ={iPassword} onChange={event => setPassword(event.target.value)} type="password" className="form-control" id="exampleInputPassword1"></input>
                  </div>

                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onClick={memberRegister}>Register</button>
     
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header modal_headercolor">
                      <h5 className="modal-title" id="staticBackdropLabel">Success</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Member has been registered successfully.
                    </div>
                    <div className="modal-footer">
                      <Link to="/login"><button type="button" onClick={pageRedirect} className="btn btn-secondary" data-dismiss="modal">Close</button></Link>
                    </div>
                  </div>
                </div>
            </div>
                
        </div>
        </Route>
    </Switch>
);
  }

export default Register;
