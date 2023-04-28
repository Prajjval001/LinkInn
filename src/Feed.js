import React, { useEffect, useState } from 'react';
import './styles/Feed.css';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import InputOption from './InputOption';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';
import firebase from 'firebase/compat/app';
import { db }  from './firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';
import { Avatar } from '@mui/material';


function Feed() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => 
         setPosts(
            snapshot.docs.map((doc) => ({ 
                id: doc.id,
                data: doc.data(),
            }))
         )  
        );
    }, []);
    
    const sendPost = (e) => {
        e.preventDefault();
        db.collection('posts').add({
            Userid : firebase.auth().currentUser.uid,
            name: user.displayName,
            email: user.email,
            message: input,
            photoURL: user.photoUrl || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            comments:[],
        })
        setInput("");
        setPosts(prev => prev);
    };
   
    

  return (
    <div className='feed'>
        
        <div className="feed__inputContainer">
        <h3>Write a post</h3>
        <br></br>
            <div className="feed__input">
               
                <Avatar src={user.photoUrl}></Avatar>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder='Post something'/>
                    <button onClick= {sendPost} type='submit'>Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9"/>
                <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E"/>
                <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
                <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E"/>
            </div>
        </div>
        <h1>Master Feed</h1>
        {/* Posts */}
       <FlipMove>

          {posts.map(({ id, data: {Userid , name, email, message, photoUrl } })=> (
            <Post 
            key={id}
            Postid = {id}
            Userid={Userid}
            name={name}
            email={email}
            message={message}
            photoUrl={photoUrl}
            />
        ))}
        </FlipMove>
      
    </div>
  );
};

export default Feed;