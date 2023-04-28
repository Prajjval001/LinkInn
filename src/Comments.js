import {React , useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import { Avatar } from '@mui/material';
import firebase from 'firebase/compat/app';
import { db }  from './firebase';
import FlipMove from 'react-flip-move';
import Post from './Post.js';
import './styles/comments.css'
import './styles/Post.css'

export default function Comments(){
    const postbyuserid = useParams();
    const [inputcomment,setInputcomment] = useState("");
    const user = firebase.auth().currentUser;
    const [fetched_comments,setFetched_comments] = useState([]);
/*

comment: "Sat this is what I want to add"
email: "satyamkumar9600@gmail.com"
id: "S4oe836yspN7rrMfllnl"
name: "Satyam Singh"
photoUrl: ""
postId: "6Ehc8TOUWbqOa1rzMrNA"
timestamp: nt {seconds: 1682590236, nanoseconds: 530000000}
userId: "NLlOCgD2ZBS7d2dD6ybAp2EUHIJ2"

*/
    
    useEffect(() => {

        console.log('fetching...from use Effect')
        db.collection('comments')
        .orderBy("timestamp","asc")
        .where('postId', '==', postbyuserid.Postid)
        .get()
        .then((querySnapshot) => {
          const comments = [];
          querySnapshot.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() });
          });
          const ans = [];
          comments.map((obj) =>{
            // console.log(obj);
           ans.push({ comment : obj.comment , name:obj.name, email:obj.email, photoURL:obj.photoUrl});
          })

          setFetched_comments(ans.reverse());
        })
        .catch((error) => {
         console.log('fetching ...failed')
            console.error("Error getting comments: ", error);
        });
    
    }, [inputcomment]);
    

    const addComment = (e) => {
        e.preventDefault();
        // Add a new document to the "comments" collection
        const newCommentRef = db.collection('comments').doc();
        newCommentRef.set({
          userId: firebase.auth().currentUser.uid,
          name: user.displayName,
          email: user.email,
          comment: inputcomment,
          photoUrl: user.photoURL || "",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          postId: postbyuserid.Postid // Add the post ID to the comment document
        })
        .then(() => {
          console.log("Comment added successfully.");
          // Update the "comments" array of the post document with the new comment ID
          db.collection('posts').doc(postbyuserid.Postid).update({
            comments: firebase.firestore.FieldValue.arrayUnion(newCommentRef.id)
          });
        })
        .catch(error => console.error("Error adding comment: ", error));
        setInputcomment('');

      };
      
    
    //Need to search all comments collection with this `postbyuserid` in firebase store 
    //
      

    return (
    <div>
        <form className='post_cmnts'>
            <input type="text" placeholder="Add a comment" value={inputcomment} onChange={e => setInputcomment(e.target.value)} ></input>
            <button onClick={addComment} type='submit'></button>
        </form>
        <FlipMove>
        {

        fetched_comments.length === 0 ?
        
        <div className = "nocomments" ><p>No comments!</p> </div>
        
        : 
       
        fetched_comments.map((com) => {
            return ( 

            <div className='comments' > 
             <Avatar src={com.photoURL}>{com.name[0]}</Avatar>

             <div className="post_info">
              <h2>{com.name}</h2>
              <p>{com.email}</p>
              <div className = "cmt" >{com.comment}</div>
            </div>
            
            </div>
            
            )
        })

        }
        </FlipMove>
    </div>

    // <div><h1>Post by - {JSON.stringify(postbyuserid)} and current user{firebase.auth().currentUser.uid}</h1></div>
)

}