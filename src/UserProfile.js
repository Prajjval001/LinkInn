import {React,useState} from 'react';
import {useParams} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { db }  from './firebase';


export default function UserProfile(){
    const param = useParams();
    const currentuser = firebase.auth().currentUser.uid;
    return (<div> Open the user with Userid {param.Userid}
     {currentuser === param.Userid ? 
     <div>
        
        {/* <h1>Currentuserprofile</h1>  */}
        (
  
     </div>
     
     :
     
     
     <h1>Someone'selse profile</h1> }
    </div>)
}