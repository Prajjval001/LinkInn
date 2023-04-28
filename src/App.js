import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import Comments from './Comments';


function App() {
  const user = useSelector(selectUser);
  // const user = false;
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        // user logged out
        dispatch(logout());
      }
    });
  }, []);

  return (
<BrowserRouter>
    
    <div className="">
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app__body">
            <Sidebar />
            
            <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/comments/:Userid/:Postid" element={<Comments/>} />
            </Routes>
          
            <Widgets />
          </div>
        </div>
      )}
    </div>
    
    </BrowserRouter>
  );
}

export default App;
