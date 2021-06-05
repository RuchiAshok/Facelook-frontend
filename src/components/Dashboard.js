import React,{ useState,useEffect} from "react";
import axios from 'axios';
import Post from "./Post";
import ls from 'local-storage';
let token = ls.get('JWTToken');


function Dashboard(){
    
    let [posts, setposts] = useState([])
    let [inputTitle, setInpTitle] = useState('')
    let [inputContent, setInpContent] = useState('')

    useEffect(() => {
        getPostData();
    }, []);

    function addPostDataAPI(){

        let newTitle = inputTitle;
        let newContent = inputContent;
      //  let newPost = [...posts,{title: newTitle,content: newContent,comments:[]}];
        setInpContent('');
        setInpTitle('');
        

        axios.post('http://localhost:8080/posts/insertPost', {
            newTitle: inputTitle,
            newContent: inputContent
          },
          {
            headers: {
              token: token
                     }
          })
          .then(function (response) {
            console.log('Successfully Inserted');
            // console.log(response);
            setposts(response.data);
          })
          .catch(function (error) {
            console.log(error);
            console.log('error:Insert failed');
          });
    }
    function getPostData(){
            axios.get('http://localhost:8080/posts/getPost', {
            headers: {
              token: token
            }
            })
            .then(function (response) {
              console.log('True Hurray Connected!!');
              let fetchPost = response.data;
              setposts(fetchPost);      
            })
            .catch(function (error) {
              console.log('Error');
              console.log(error);
            });  

    }
   
    function deletePostData(postData){
      console.log(postData.postData.postId);
      
       // console.log(index);
       //   let newPost = posts.filter((element,index_no) =>index_no !==index);
        axios.post('http://localhost:8080/posts/deletePost', {
            postId: postData.postData.postId
        },
          {
          headers: {
            token: token
                   }
        })
        .then(function (response) {
          console.log('True Hurray Connected for delete!!');
           let fetchPost = response.data;
        //   setposts(fetchPost);
          // let newPost =[...posts];
          // newPost.splice(index,1);
          //let newPost = posts.filter((element,index_no) =>element.postId !==postData.postData.postId);
           setposts(fetchPost);

  
        })
        .catch(function (error) {
          console.log('Error in delete');
          console.log(error);
        });  
    }


    return <div className="container App_user">{
        posts.map((postData,index) =>{
            return <div key={index}>
                {/* // Key is not accessible to us under post component */}
               <Post key={index} index={index}  data={postData} delPostAPI={deletePostData}/>           
                   </div>          
        })
        }

      <div style={{paddingTop: "20px"}}>
      <div className="form-group">
                  <label htmlFor="postTitle" style={{fontWeight: "600"}}>Title</label>
                  <input type="" className="form-control" value={inputTitle} onChange={event => setInpTitle(event.target.value)} style={{width: "50%"}} />
      </div>
      <div className="form-group">
                  <label htmlFor="postContent" style={{fontWeight: "600"}}>Content</label>
                  <input type="" className="form-control" value={inputContent} onChange={event => setInpContent(event.target.value)} style={{width: "50%"}} />
      </div>
        <button className="btn btn-success" onClick={addPostDataAPI} style={{marginLeft: "7px",marginBottom: "20px"}} type="submit">Add Post</button>     
      </div>       
        </div>
}
export default Dashboard;