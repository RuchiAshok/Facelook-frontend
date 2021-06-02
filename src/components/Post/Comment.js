import React,{useState} from 'react';


function Comment(props){
    let {data,delCommentAPI,index} = props;
    let [isLiked, setIsLiked] = useState(false)

    let color ="blue";
    function trigger(){
        setIsLiked(!isLiked)
    }

    if(isLiked)
        color = "red";
        return <div>
            <li style={{color:color, cursor:"pointer"}} onClick={trigger}>{data.text}</li>      
            {/* <button className="btn btn-secondary" onClick={() => delComment(index)} style={{marginLeft: "520px", marginTop: "-44px"}} type="submit">Delete</button>  
            */}
            <button className="btn btn-secondary" onClick={() => delCommentAPI(index)} style={{marginLeft: "520px", marginTop: "-44px"}} type="submit">Delete</button>  
      
      
        </div>
}

export default Comment;