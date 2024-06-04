import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
function Login() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [type, setType] = useState({
    pass: "password",
    icon: "eye-outline",
  });
  useEffect(() => {}, []);
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeIcon = () => {
    const inputPass = document.getElementById("input-pass");
    if (inputPass.type == "password") {
      setType({
        pass: "text",
        icon: "eye-off-outline",
      });
    } else {
      console.log(inputPass.type);
      setType({
        pass: "password",
        icon: "eye-outline",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="app">
      <div className="container">
        <div className="auth">
          <h1>Login</h1>
          <form name="form-login">
            <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              type={`${type.pass}`}
              onChange={handleChange}
              id="input-pass"
              placeholder="password"
              name="password"
            />
            <div className="icon-eyes" onClick={handleChangeIcon}>
              <ion-icon className="ion-icon" name={`${type.icon}`}></ion-icon>
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Login
            </button>
            {err && <p>{err}</p>}
            <span>
              Don't you have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
