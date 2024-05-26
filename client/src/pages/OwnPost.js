import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
function OwnPost() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getOwnPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/user/own-posts/${user.id}`
        );
        console.log(res.data);
        setPosts(res.data);
        console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };
    getOwnPosts();
  }, [user.id]);
  return (
    <div className="app">
      <div className="container">
        <Header />
        <div className="info-user">
          <Link to={`/edit-profile`}>Update your profile</Link>
          <ul>
            <li className="avatar-user">
              Your avatar :
              {user.userImg != null ? (
                <img src={user.userImg} />
              ) : (
                <h4>You not have your avatar</h4>
              )}
            </li>
            <li>Your name account: {user.username}</li>
            <li>Your email account: {user.email}</li>
          </ul>
        </div>
        <h2 className="title-listPosts"> Your list posts </h2>
        <div className="own-posts">
          <div className="post">
            {posts.length == 0 ? (
              <h3>You not have any post</h3>
            ) : (
              posts.map((post) => (
                <Link to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                  <div className="content">
                    <img className="logo" src={post.img} />
                    <div className="thumb">
                      <p className="main-content">{post.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <Menu cat="art" />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default OwnPost;
