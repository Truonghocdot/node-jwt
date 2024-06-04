import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Menu from "../components/Menu.js";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext.js";

function Single() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const postId = useParams().id;
  const { currentUser } = useContext(AuthContext);
  const access_token = document.cookie.slice(13);
  // Get comments

  const getComments = async (id) => {
    let url = `http://localhost:8800/api/user/comments/${id}`;
    try {
      const res = await axios.get(url);
      console.log(res);
      if (res.status === 300) {
        // Xử lý response 300
        console.log(res.data);
        const choices = res.data; // Giả sử response.data chứa các lựa chọn
        if (choices.length > 0) {
          const chosenUrl = choices[0]; // Chọn một URL từ các lựa chọn (bạn có thể thêm logic chọn lựa phù hợp ở đây)
          const chosenRes = await axios.get(chosenUrl);
          console.log(chosenRes);
          setComments(chosenRes.data); // Cập nhật comments với dữ liệu từ URL đã chọn
        }
      } else {
        // Xử lý response thành công (status khác 300)
        setComments(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/api/post/${postId}`);
      // console.log(res);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    getComments(postId);
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/post/${postId}`, {
        data: {
          access_token,
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  //Put comment
  const handleEnterComment = async (e) => {
    if (currentUser == null) {
      navigate("/login");
    } else {
      let inputComment = document.getElementById("inputComment");
      if (inputComment.value == "") {
      } else {
        if (e.type == "click") {
          try {
            const res = await axios.post(
              `http://localhost:8800/api/user/comment/${postId}`,
              {
                content: inputComment.value,
                uid: currentUser.id,
              }
            );
            console.log(res);
            window.location.reload();
          } catch (err) {
            console.log(err);
          }
        } else if (e.type == "keydown" && e.key == "Enter") {
          try {
            const res = await axios.post(
              `http://localhost:8800/api/user/comment/${postId}`,
              {
                content: inputComment.value,
                uid: currentUser.id,
              }
            );
            console.log(res);
            window.location.reload();
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  };

  const handleDeleteComment = async (e, commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8800/api/user/comment/${commentId}`
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        <div className="single">
          <div className="content">
            <img src={`../upload/posts/${post.img}`} alt="" />
            <h3 className="category-post">{post.cat}</h3>
            <div className="user">
              {post.userImg && <img src={post.userImg} />}
              <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()} </p>
              </div>
              {currentUser != null
                ? post.username === currentUser.username && (
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
                  )
                : ""}
            </div>
            <h1>{post.title}</h1>
            <p>{getText(post.description)}</p>
          </div>
          <Menu cat={post.cat} />
        </div>
        <div className="comment">
          <h2>Comment</h2>
          {currentUser && (
            <div>
              <img src={currentUser.userImg} />
              <h3>{currentUser.username}</h3>
            </div>
          )}
          <div
            className="form-control"
            style={{ flexDirection: "row", gap: "1.6rem" }}
          >
            <input
              onKeyDown={handleEnterComment}
              id="inputComment"
              placeholder="Enter your comment "
            />
            <input
              style={{ cursor: "pointer" }}
              onClick={handleEnterComment}
              type="button"
              value="Enter"
            />
          </div>
          {comments.map((comment) => (
            <div className="block-comment" key={comment.id}>
              <div className="user">
                {comment.userImg && <img src={comment.userImg} alt="User" />}
                <h3>{comment.username}: </h3>
              </div>
              <div className="comment-content">
                <p className="time-comment">{comment.timeCreated}</p>
                {comment.username === currentUser.username ? (
                  <button
                    onClick={(e) => handleDeleteComment(e, comment.commentId)}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Single;
