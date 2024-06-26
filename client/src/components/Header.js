import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutOfPage = () => {
    logout();
    navigate("/login");
  };
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=techlonogy">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>
            <Link to={`/own-post`}>{currentUser?.username}</Link>
          </span>
          {currentUser ? (
            <span onClick={logoutOfPage}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          {currentUser ? (
            <span className="write">
              <Link className="link" to="/write">
                Write
              </Link>
            </span>
          ) : (
            <span className="write">
              <Link className="link" to="/login">
                Write
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
