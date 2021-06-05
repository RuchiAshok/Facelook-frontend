import React,{ useState,useEffect} from 'react';
import Comment from "./Post/Comment";
import axios from 'axios';
import ls from 'local-storage';
let token = ls.get('JWTToken');

function Post(props){
    let {data,delPostAPI,index} = props;
    let [postComment, setComments] = useState([]);
    let [inputCommment, setInpComment] = useState('');
    //let [likeCount, setLikeCount] = useState('1');
    
    useEffect(() => {
      getCommentData();
    }, []);

    function addComment(){
        let aComment = inputCommment;
        axios.post('http://localhost:8080/posts/insertComment', {
            postId: data.postId,
            commentData: aComment
          },
          {
            headers: {
              token: token
                     }
          })
          .then(function (response) {
            console.log('Comment Successfully Inserted');
            // console.log(response);
            let fetchComment = response.data
            console.log(response.data);
            // if(fetchComment == null){
            // setComments([]);
            // }else{
            //   setComments(fetchComment);
            // }
            // let newComment = [...postComment,{"text":aComment}];    
            setComments(fetchComment);  
            setInpComment('');
            
          })
          .catch(function (error) {
            console.log(error);
            console.log('error:Insert failed');
          });
    }
    
    function getCommentData() {
      axios.post('http://localhost:8080/posts/getComment', {
        postId: data.postId
      },{
          headers: {
            token: token
          }
        })
        .then(function (response) {
          console.log('True Hurray Connected!!');
          let fetchComment = response.data;
          console.log(fetchComment);
          if(fetchComment != null){
            setComments(fetchComment);
          }
        })
        .catch(function (error) {
          console.log('Error');
          console.log(error);
        });
  
    }

    function deleteCommentData(commentData){
           console.log('post id to be deleted' + commentData.commentData.postId);
           console.log('comment id to be deleted' + commentData.commentData.commentId);

             axios.post('http://localhost:8080/posts/deleteComment', {
                postId: commentData.commentData.postId,
                commentId:commentData.commentData.commentId
             },
             {
              headers: {
                token: token
                       }
            })
             .then(function (response) {
               console.log('Comment Deleted!!');
                let fetchComment = response.data;
                // console.log(fetchPost);
                // let newComment =[...postComment];
                // newComment.splice(cIndex,1);
                // data.comments = newComment;
                setComments(fetchComment);
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
                postComment.map((commentData,index) =>{
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
        <button className="btn btn-danger" style={{marginLeft: "4px",marginTop:"-6px"}} type="submit" onClick={() => delPostAPI({postData:data})}>Delete Post</button>
    
    </div>


}

export default Post;