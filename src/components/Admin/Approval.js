import React from "react";
import '/Users/pujag/Node JS Application/my-app/node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '/Users/pujag/Node JS Application/my-app/node_modules/bootstrap/dist/js/bootstrap.js'

function Approval(userdata) {
    let {data,approveUser} = userdata;
    console.log(data);
        return <tr>
        <th scope="row">{data.userId}</th>
        <td>{data.userName}</td>
        <td>{data.userEmail}</td>
        <td>{data.userMobile}</td>
        <td> <button className="btn btn-primary" onClick={() => approveUser({userId:data.userId})} type="submit">Approve</button> </td>
        </tr>
}
export default Approval;