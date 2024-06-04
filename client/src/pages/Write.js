import React, { useState } from "react";
import ReactQill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const access_token = document.cookie.slice(13);
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8800/api/upload/post",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(123);
    const imgUrl = await upload();
    try {
      let res = "";
      if (state) {
        console.log(123);

        res = await axios.patch(`http://localhost:8800/api/post/${state.id}`, {
          title,
          description: value,
          cat,
          img: file ? imgUrl : "",
          access_token,
        });
      } else {
        console.log(123);

        res = await axios.post(`http://localhost:8800/api/post`, {
          title,
          description: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYY--MM-DD HH:mm:ss"),
          access_token,
        });
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };
  return (
    <div className="app">
      <div className="container">
        <Header />
        <div className="add">
          <div className="content">
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editorContainer">
              <ReactQill theme="snow" value={value} onChange={setValue} />
            </div>
          </div>
          <div className="menu">
            <div className="item">
              <h1>Publish:</h1>
              <span>
                <b>Status:</b> Draft
              </span>
              <span>
                <b>Visiblity:</b> Public
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label className="file" htmlFor="file">
                Upload Image
              </label>
              <div className="buttons">
                <button>Save as a draft</button>
                <button onClick={(e) => handleClick(e)}>Publish</button>
              </div>
            </div>
            <div className="item">
              <h1>Category</h1>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "art"}
                  name="cat"
                  value="art"
                  id="art"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="art">Art</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "science"}
                  name="cat"
                  value="science"
                  id="science"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="science">Science</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "techlonogy"}
                  name="cat"
                  value="techlonogy"
                  id="techlonogy"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="techlonogy">Techlonogy</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "cinema"}
                  name="cat"
                  value="cinema"
                  id="cinema"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="cinema">Cinema</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "design"}
                  name="cat"
                  value="design"
                  id="design"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="design">Design</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "food"}
                  name="cat"
                  value="food"
                  id="food"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="food">Food</label>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default Write;
