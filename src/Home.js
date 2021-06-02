import './App.css';
import React,{ useState,useEffect} from "react";
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Approval from "../src/components/Admin/Approval";
import ls from 'local-storage';
let token = ls.get('JWTToken');

function Home() {
  let [approvalData, setApproval] = useState([])

  useEffect(() => {
    getMemberData();  
  }, []);

  function getMemberData(){
    axios.get('http://localhost:8080/getMember', {
      headers: {
        token: token
      }
    })
    .then(function (response) {
      console.log('Connected to Member Infor API');
      let memeberData = response.data;
      setApproval(memeberData);


    })
    .catch(function (error) {
      console.log('Error');
      console.log(error);
    });  
  }

  function approveMember(data){
    let approveAllTag ='N';
    let userId = '0';
    if(data ==='A')
    {
      approveAllTag = 'Y';
    }
    else{
      userId =data.userId;
    }

    axios.post('http://localhost:8080/approveMember', {
      userId: userId,
      approveAll:approveAllTag
      },
      {
        headers: {
          token: token
                 }
      })
      .then(function (response) {
        let newList = response.data;
        // let newList = approvalData.filter(element =>element.username !==data.userData.username);
         setApproval(newList);
      })
      .catch(function (error) {
        console.log(error);
        console.log('error:Approval failed');
      });
  }


  return (
    <div className="container App_user" >
            <h2>
              <div className="alert alert-primary" role="alert">
                  Request Pending For Approval
              </div>
            </h2>
        <div>

        <table className="table table-bordered table-hover">
          <thead className="table-warning">
              <tr>
              <th scope="col">User Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email Id</th>
              <th scope="col">Contact No</th>
              <th scope="col">Action</th>
              </tr>
          </thead>
              {
                approvalData.map((userData,index) =>{       
                return <tbody key={index}>
                     <Approval key={index} data={userData} approveUser={approveMember}/>             
                      </tbody>                            
                })
              }   
          </table>




        <button className="btn btn-success"  style={{marginBottom: "20px",marginLeft: "500px"}} data-toggle="modal" data-target="#staticBackdrop" onClick={() => approveMember('A')} type="submit">Approve All</button>
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
                      All members have been approved successfully.
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
            </div>
                
      
      
      
      </div> 
    </div>
);    
}

export default Home;
