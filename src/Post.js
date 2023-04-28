import { Avatar } from '@mui/material';
import React, { forwardRef } from 'react';
import InputOption from './InputOption';
import "./styles/Post.css";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {Link} from 'react-router-dom'

const Post = forwardRef(({Userid ,Postid, name , email, message, photoUrl }, ref) => {
  console.log();
  return (
    <div ref={ref} className='post'>
      <div className='post__header'>  
      <Avatar src={photoUrl}>{name[0]}</Avatar>
      <div className="post__info">
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
      </div>

      <div className='post__body'>
        <p>{message}</p>
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