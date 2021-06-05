import React,{ useState} from 'react';
import Comment from "./Post/Comment";
import axios from 'axios';
import ls from 'local-storage';
let token = ls.get('JWTToken');

function Post(props){
    let {data,delPostAPI,index} = props;
   // console.log(data);
    let [postComment, setComments] = useState(data.comments);
    let [inputCommment, setInpComment] = useState('');
    //let [likeCount, setLikeCount] = useState('1');
    


    function addComment(){
        let aComment = inputCommment;
        axios.post('http://localhost:8080/posts/insertComment', {
            index: index,
            commentData: aComment
           // postId:data.postId
          },
          {
            headers: {
              token: token
                     }
          })
          .then(function (response) {
            console.log('Successfully Inserted');
            console.log(response);
            let newComment = [...postComment,{"text":aComment}];      
            setInpComment('');
            data.comments = newComment;
            setComments(data.comments);
          })
          .catch(function (error) {
            console.log(error);
            console.log('error:Insert failed');
          });
    }
    

    function deleteCommentData(cIndex){
           
             axios.post('http://localhost:8080/posts/deleteComment', {
                pIndex: index,
                cIndex:cIndex
             },
             {
              headers: {
                token: token
                       }
            })
             .then(function (response) {
               console.log('Comment Deleted!!');
                let fetchPost = response.data;
                console.log(fetchPost);
                let newComment =[...postComment];
                newComment.splice(cIndex,1);
                data.comments = newComment;
                setComments(newComment);
             })
             .catch(function (error) {
               console.log('Error in delete comment');
               console.log(error);
             });  
    }

    return <div style={{paddingTop: "20px"}}>
        <h3><div className="alert alert-primary" role="alert">{data.title}
        </div>
        </h3>
            <div className="alert alert-warning" role="alert">{data.content}</div>
        <ul>{
                data.comments.map((commentData,index) =>{
                return <div key ={index}>
                    <Comment key ={index} index={index} data = {commentData}  delCommentAPI ={deleteCommentData}/>
                    
            </div> 
            })
        }</ul>
        {/* <button className="btn btn-secondary" style={{marginLeft: "520px", marginTop: "-44px"}} type="submit" onClick={() => deleteComment({commentData})}>Delete
                        </button> */}

        <input value={inputCommment} onChange={event => setInpComment(event.target.value)} style={{width: "50%",border: "1px solid #ced4da", borderRadius: ".25rem",height: "calc(1.5em + .75rem + 2px)"}} />
        {/* <button className="btn btn-danger" style={{}} type="submit" onClick={() => delPost({postData:data})}>Delete Post</button>*/}
        <button className="btn btn-primary" style={{marginLeft: "4px",marginTop:"-6px"}} type="submit" onClick={addComment}>Comment</button>
        <button className="btn btn-danger" style={{marginLeft: "4px",marginTop:"-6px"}} type="submit" onClick={() => delPostAPI(index)}>Delete Post</button>
    
    </div>


}

export default Post;