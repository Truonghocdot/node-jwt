import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext.js";
import axios from "axios";
function EditProfile() {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [userImg, setUserImg] = useState(currentUser.userImg);
  const [file, setFile] = useState(null);
  const handleUploadAvatar = async (inputAvatar) => {
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
  useEffect(() => {
    const inputAvatar = document.getElementById("avatar");
    console.log(inputAvatar);
    const chooseImg = document.getElementById("userImg");
    handleChangeUserImg(chooseImg);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeUserImg = (chooseImg) => {
    if (userImg == null) {
      chooseImg.innerHTML =
        "<label htmlFor='avatar'>Choose you avatar:</label> <input  type='file' id='avatar' />";
    } else {
      chooseImg.innerHTML =
        " <label htmlFor='avatar' >Change your avatar:</label> <img src={`./upload/${userImg}`} /><input type='file' id='avatar' /> ";
    }
  };
  return (
    <div className="app">
      <div className="container">
        <Header />
        <h2>Your info account</h2>
        <form>
          <div className="form-control">
            <label htmlFor="username">Your account name:</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={`${username}`}
              name="username"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Your email:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={`${email}`}
              name="email"
            />
          </div>
          <div className="form-control" id="userImg"></div>
          <button onClick={(e) => handleSubmit(e)}>Update</button>
        </form>
        <Footer />
      </div>
    </div>
  );
}

export default EditProfile;
