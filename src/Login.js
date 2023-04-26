import { display } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { auth , googleProvider} from './firebase';
import {signInWithPopup}  from "firebase/auth"
import './styles/Login.css'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();
    const [signup , setSignup] = useState(false);

    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then(userAuth => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL,
            })
          );
        }).catch((error) => alert(error));
    };

    const signInwithGoogle = async() =>{
        try{
            await signInWithPopup(auth,googleProvider);
        }catch(err){
            alert(err.message);
        }
    }

    const register = (e) => {
        e.preventDefault();
        if (!name) {
            return alert("Please enter a Full name!")
        }

        auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic,
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoUrl: profilePic,
                })
              );
            });
        } ).catch(error => alert(error));
    };

  
  return (!signup ? <div className ='login'>
       <img src='https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-16.png' alt='' />

       <form className = '' >
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="full name (required if registering)" type='text' />

        <input value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder='Profile pic URL (optional)' type='text'/>

        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email'/>

        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password'/>

        <button type='submit' onClick={register}> Sign Up </button>
       </form>
       <br></br>
       <div style={{width:'50%',height:'1px' , backgroundColor:'black',margin:'1px 1px 1px 1px' }}></div>
        <p><b>  Or </b></p>
        <div id = 'google' onClick = {signInwithGoogle}> </div>
       <p>Already a member?{" "}
        <span className='login__register' onClick={e=>setSignup(true)} >Log In</span>
       </p>
    </div>
     :
    <div className='login'>
         <img src='https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-16.png' alt='' />

        <form>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email'/>

        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password'/>
        <button type='submit' onClick={loginToApp}> Sign In </button>
        </form>
        <br></br>
       <div style={{width:'50%',height:'1px' , backgroundColor:'black',margin:'1px 1px 1px 1px' }}></div>
        <p><b>  Or </b></p>
        <div id = 'google' onClick = {signInwithGoogle}> </div>
        <p>Not a member?{" "}
        <span className='login__register' onClick={e=>{setSignup(false)}}> Sign Up</span>
       </p>
       
    </div>
  );





}

export default Login;