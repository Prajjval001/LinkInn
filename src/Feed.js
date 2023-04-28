import React, { useEffect, useState } from "react";
import "./styles/Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import InputOption from "./InputOption";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "./Post";
import firebase from "firebase/compat/app";
import { db } from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";
import { Avatar } from "@mui/material";

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");

  const [photo_input, setPhotoInput] = useState("");
  const [video_input, setVideoInput] = useState("");
  const [Article_input, setArticleInput] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
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

    db.collection("posts").add({
      Userid: firebase.auth().currentUser.uid,
      name: user.displayName,
      email: user.email,
      message: {
        message: input,
        photo: photo_input,
        video: video_input,
        article: Article_input,
      },
      photoURL: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comments: [],
    });
    setPhotoInput("");
    setVideoInput("");
    setArticleInput("");
    setInput("");
  };

  const setvisible = (Target) => {
    if (Target === "Photo") {
      let x = document.getElementById("photo_input");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    } else if (Target === "Video") {
      let x = document.getElementById("video_input");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    } else if (Target === "Write article") {
      let x = document.getElementById("article_input");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    } else {
      return;
    }
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <h3>Write a post</h3>
        <br></br>
        <div className="feed__input">
          <Avatar src={user.photoUrl}></Avatar>
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Post something ... Press Enter to Post"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        {/* display board shows to user , how the post is going to look , right now it is going to display the picture and video*/}
        <div className="post_board">
          <div className="feed_input_photo_inboard">
            {photo_input === "" ? (
              <img></img>
            ) : (
              <img src={photo_input} width="100%" height="400"></img>
            )}
          </div>
          <div className="feed_input_video_inboard">
            {video_input === "" ? <img></img> : <h1></h1>}
          </div>
          <div className="feed_input_video_inboard">
            {Article_input === "" ? "" : <div>{Article_input}</div>}
          </div>
        </div>

        <div className="feed_photo_input" id="photo_input">
          <input
            type="text"
            placeholder="Enter the url of the photo You want to post!"
            onChange={(e) => setPhotoInput(e.target.value)}
            value={photo_input}
          ></input>
          <button onClick={() => setvisible("Photo")}> Save </button>
        </div>

        <div className="feed_video_input" id="video_input">
          <input
            type="text"
            placeholder="Enter the url of the Video You want to post!"
            value={video_input}
          ></input>
          <button>Save</button>
        </div>

        <div className="feed_Article_input" id="article_input">
          <textarea
            placeholder="Write a article "
            onChange={(e) => setArticleInput(e.target.value)}
            value={Article_input}
          >
            {" "}
          </textarea>
          <button onClick={() => setvisible("Write article")}> Save </button>
        </div>

        <div className="feed__inputOptions">
          <InputOption
            Icon={ImageIcon}
            title="Photo"
            color="#70B5F9"
            does={setvisible}
          />
          <InputOption
            Icon={SubscriptionsIcon}
            title="Video"
            color="#E7A33E"
            does={setvisible}
          />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
            does={setvisible}
          />
        </div>
      </div>
      <h1>Master Feed</h1>
      {/* Posts */}
      <FlipMove>
        {posts.map(
          ({ id, data: { Userid, name, email, message, photoUrl } }) => (
            <Post
              key={id}
              Postid={id}
              Userid={Userid}
              name={name}
              email={email}
              message={message}
              photoUrl={photoUrl}
            />
          )
        )}
      </FlipMove>
    </div>
  );
}

export default Feed;
