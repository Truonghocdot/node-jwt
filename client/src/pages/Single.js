import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Menu from "../components/Menu.js";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext.js";

function Single() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/post/${postId}`);
        console.log(res);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/post/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="app">
      <div className="container">
        <Header />
        <div className="single">
          <div className="content">
            <img src={`../upload/${post.img}`} alt="" />
            <div className="user">
              {post.userImg && <img src={post.userImg} />}
              <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()} </p>
              </div>
              {currentUser.username === post.username && (
                <div className="edit">
                  <Link to={`/write?edit=2`} state={post}>
                    <img src="../upload/edit.png" alt="" />
                  </Link>
                  <img
                    onClick={handleDelete}
                    src="../upload/delete.png"
                    alt=""
                  />
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            <p>{getText(post.description)}</p>
          </div>
          <Menu cat={post.cat} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Single;
