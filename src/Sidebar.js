import React from 'react';
import "./styles/Sidebar.css";
import {Avatar} from "@mui/material";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function Sidebar() {

    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className='sidebar__recentItem'>
            <span className='sidebar__hash'>#</span>
            <p>{topic}</p>
        </div>
    )

    
   return (
    <div className='sidebar'>
        <div className='sidebar__top'>
            <img src='https://images.unsplash.com/photo-1663004536868-1658c44ffb12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80' alt='' />
            <Avatar src={user.photoUrl} className='sidebar__avatar'>{user.email[0]}</Avatar>
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4>
        </div>

        <div className="sidebar__stats">
            <div className="sidebar__stat">
                <p>Who viewed you</p>
                <p className="sidebar__statNumber">[---]</p>
            </div>
            <div className="sidebar__stat">
                <p>Views on post </p>
                <p className="sidebar__statNumber">[---]</p>   
            </div>
        </div>

        <div className="sidebar__bottom">
            <p>Recent</p>
            {recentItem('reactjs')}
            {recentItem('nodejs')}
            {recentItem('redux')}
            {recentItem('informationTechnology')}
            {recentItem('cyberSecurity')}
        </div>

    </div>
  )
}

export default Sidebar