import './App.css';
import React,{ useState} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Home from "./Home";
import Dashboard from "./components/Dashboard";
import {
     Link
   } from "react-router-dom";


function Header() {
    const  [active, setActive] = useState("Posts");
  return (

 <div>

    <div>    
       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <span className="navbar-brand">FeedPost</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
           <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item active">
                <button className="btn btn-primary" onClick ={()=> setActive("Home")} type="submit">Approve</button>
                </li>
                <li className="nav-item active">
                <button className="btn btn-primary" onClick ={()=> setActive("Posts")} type="submit">Posts</button>
                </li>                   
           </ul>
               <div className="d-flex">
               <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search">
               </input>
               <button className="btn btn-success" type="submit">Search</button>
               <Link to="/"> <button className="btn btn-danger" style={{marginLeft :"5px"}} type="submit">Logout</button></Link>
          </div>
          </div>
          </nav>

    </div>
    <div>
         {active === "Home" && <Home />}
    </div>
    <div>
         {active === "Posts" && <Dashboard />}
    </div>

</div>

);
  }

export default Header;
