import { Avatar } from '@mui/material';
import React, { forwardRef } from 'react';
import InputOption from './InputOption';
import "./styles/Post.css";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {Link} from 'react-router-dom'
import YouTube from 'react-youtube';


const Post = forwardRef(({Userid ,Postid, name , email, message, photoUrl }, ref) => {
  return (
    <div ref={ref} className='post'>
      <div className='post__header'>  
      <Avatar src={photoUrl}>{name[0]}</Avatar>
      <div className="post__info">
      <Link to={`/user/${Userid}`} style={{textDecoration:'none' , color:'black'}}> 
       <h4>{name}</h4>
        <p>{email}</p>
        </Link> 
      </div>
      </div>

      <div className='post__body'>
        <h5>{message.message}</h5>
       {!message.photo?<p></p>: <img src = {message.photo} width="100%" height = "400"></img>}
       {!message.article? <p></p> : <div> {message.article} </div>}
       {!message.video ? <p></p>:        
      <YouTube
       videoId={message.video}
       autoplay={true}
       controls={true}
       />
       }
      </div>

      <div className="post__buttons">
        <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" userId = {Userid}/>
        <Link to={`/comments/${Userid}/${Postid}`} style={{textDecoration:'none'}}> <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray"  userId = {Userid} /> </Link>
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray"  userId = {Userid}/>
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray"  userId = {Userid} />

      </div>
    </div> 
  );
});

export default Post;